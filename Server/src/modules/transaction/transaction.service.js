import { Transaction } from './transaction.model.js';
import { cashfreeService } from './cashfree.service.js';
import { CouponUsage } from '../coupons/couponUsage.model.js';    
import { Coupon } from '../coupons/coupons.model.js';
import { activityLogService } from '../logs/activityLog.service.js';
import { STATIC_COURSES } from '../../constants/courses.js';
import { Customer } from '../customer/customer.model.js';
import { couponService } from '../coupons/coupons.service.js'; 
// import { Coupon } from '../coupons/coupons.model.js';
import APIError from '../../utils/apiError.js'; // Ensure this is imported too


class TransactionService {

  async createTransaction({ customer, courseId, couponCode }) {
    const course = STATIC_COURSES[courseId];
    const customerDoc = await Customer.findById(customer.customerId);
    
    if (!customerDoc) throw APIError.notFound('Customer not found');
    if (!course) throw APIError.notFound('Course not found');

    const courseAmount = course.price;
    let finalAmount = courseAmount;
    let discountAmount = 0;
    let appliedCoupon = null;
    let referredBy = null; // Default to null

    if (couponCode) {
        const couponResult = await couponService.applyCoupon({
            code: couponCode,
            customer: customerDoc,
            cartAmount: courseAmount
        });

        if (couponResult.success) {
            discountAmount = couponResult.data.discount;
            finalAmount = couponResult.data.finalAmount;
            appliedCoupon = couponResult.data.couponCode;

            // NEW LOGIC: Check if this coupon belongs to a Sub-Admin
            const couponDoc = await Coupon.findOne({ code: couponCode });
            
            // If the coupon has assigned sub-admins, we pick the first one 
            // (or you can implement logic to match a specific sub-admin context)
            if (couponDoc && couponDoc.assignedSubAdmins && couponDoc.assignedSubAdmins.length > 0) {
                referredBy = couponDoc.assignedSubAdmins[0]; 
            }
        }
    }

    const transactionId = `TXN_${Date.now()}`;

    const transaction = await Transaction.create({
        transactionId,
        customerId: customer.customerId,
        courseId,
        amount: courseAmount,
        couponCode: appliedCoupon,
        discountAmount,
        finalAmount,
        status: 'PENDING',
        referredBy: referredBy // Tag the transaction here
    });

    const cashfreeOrder = await cashfreeService.createOrder({
        orderId: transactionId,
        orderAmount: finalAmount, // Verified: sending discounted amount
        customer: {
            customerId: customerDoc._id,
            email: customerDoc.email,
            phone: customerDoc.phone
        }
    });

    transaction.paymentSessionId = cashfreeOrder.payment_session_id;
    await transaction.save();

    await activityLogService.log({
      action: 'CREATE_TRANSACTION',
      performedBy: {
        userId: customer.customerId,
        role: 'CUSTOMER'
      },
      target: {
        entity: 'TRANSACTION',
        entityId: transaction._id
      },
      metadata: { transactionId }
    });

    return {
      transactionId,
      paymentSessionId: cashfreeOrder.payment_session_id
    };
  }

async confirmPayment(orderId) {
    const transaction = await Transaction.findOne({ transactionId: orderId }).populate('customerId');
    if (!transaction) throw new Error('Transaction not found');

    const orderStatus = await cashfreeService.getOrderStatus(orderId);

    if (orderStatus === 'PAID') {
        transaction.status = 'SUCCESS';
        
        // Handle Coupon Usage only on successful payment
        if (transaction.couponCode) {
            const coupon = await Coupon.findOne({ code: transaction.couponCode });
            if (coupon) {
                await CouponUsage.create({
                    couponId: coupon._id,
                    couponCode: coupon.code,
                    customerId: transaction.customerId._id,
                    customerEmail: transaction.customerId.email, // Added this!
                    cartAmount: transaction.amount,
                    discountAmount: transaction.discountAmount,
                    finalAmount: transaction.finalAmount,
                    courseId: transaction.courseId
                });

                coupon.usedCount += 1;
                await coupon.save();
            }
        }
    } else {
        transaction.status = 'FAILED';
    }

    await transaction.save();
    return { transactionId: transaction.transactionId, status: transaction.status };
}

async getCustomerTransactions(customerId) {
  const transactions = await Transaction.find({ 
    customerId, 
    status: 'SUCCESS' // Only fetch successful purchases for "My Courses"
  }).sort({ createdAt: -1 });

  // Enrich the data with STATIC_COURSES info
  const enrichedTransactions = transactions.map(txn => {
    const courseInfo = STATIC_COURSES[txn.courseId] || {};
    return {
      ...txn._doc,
      courseDetails: {
        name: courseInfo.name,
        // thumbnail: courseInfo.thumbnail,
        // duration: courseInfo.duration
      }
    };
  });

  return { transactions: enrichedTransactions };
}

async getAllTransactions({ page = 1, limit = 20 }) {
    const transactions = await Transaction.find()
      .populate('customerId', 'name email') // See customer details
      .populate('referredBy', 'name email')  // See sub-admin details
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    return { transactions };
}
}

export const transactionService = new TransactionService();
