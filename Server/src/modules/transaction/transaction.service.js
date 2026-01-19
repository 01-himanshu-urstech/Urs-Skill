import { Transaction } from './transaction.model.js';
import { cashfreeService } from './cashfree.service.js';
import { Coupon } from '../coupons/coupons.model.js';
import { activityLogService } from '../logs/activityLog.service.js';
import { STATIC_COURSES } from '../../constants/courses.js';
import { Customer } from '../customer/customer.model.js';


class TransactionService {

  async createTransaction({ customer, courseId, couponCode }) {

    const course = STATIC_COURSES[courseId];
    // 🔥 Fetch full customer record
    const customerDoc = await Customer.findById(customer.customerId);

    if (!customerDoc || !customerDoc.phone) {
      throw APIError.validation('Customer phone number not found');
    }

    if (!course || !course.isActive) {
      throw APIError.notFound('Course not found');
    }

    const courseAmount = course.price;
    let discountAmount = 0;
    let finalAmount = courseAmount;
    let appliedCoupon = null;

    if (couponCode) {
      const coupon = await Coupon.findOne({
        code: couponCode,
        status: 'ACTIVE'
      });

      if (!coupon) {
        throw new Error('Invalid coupon');
      }

      discountAmount = coupon.discountValue;
      finalAmount = Math.max(courseAmount - discountAmount, 0);
      appliedCoupon = coupon.code;
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
      transactionValidity: new Date(Date.now() + 15 * 60 * 1000)
    });

    const cashfreeOrder = await cashfreeService.createOrder({
      orderId: transactionId,
      orderAmount: finalAmount,
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

    const transaction = await Transaction.findOne({ transactionId: orderId });
    if (!transaction) {
      throw new Error('Transaction not found');
    }

    const orderStatus = await cashfreeService.getOrderStatus(orderId);

    transaction.status = orderStatus === 'PAID' ? 'SUCCESS' : 'FAILED';
    await transaction.save();

    if (transaction.couponCode) {
      const coupon = await Coupon.findOne({
        code: transaction.couponCode,
        status: 'ACTIVE'
      });

      if (coupon) {
        // create coupon usage
        await CouponUsage.create({
          couponId: coupon._id,
          couponCode: coupon.code,
          customerId: transaction.customerId,
          cartAmount: transaction.amount,
          discountAmount: transaction.discountAmount,
          finalAmount: transaction.finalAmount,
          courseId: transaction.courseId
        });

        // increment usage
        coupon.usedCount += 1;
        await coupon.save();
      }
    }


    await activityLogService.log({
      action: `TRANSACTION_${transaction.status}`,
      performedBy: {
        userId: transaction.customerId,
        role: 'CUSTOMER'
      },
      target: {
        entity: 'TRANSACTION',
        entityId: transaction._id
      },
      metadata: { orderId }
    });

    return {
      transactionId: transaction.transactionId,
      status: transaction.status
    };
  }

  async getCustomerTransactions(customerId) {
    const transactions = await Transaction.find({ customerId })
      .sort({ createdAt: -1 });

    return { transactions };
  }

  async getAllTransactions({ page = 1, limit = 20 }) {
    const transactions = await Transaction.find()
      .skip((page - 1) * limit)
      .limit(Number(limit));

    return { transactions };
  }
}

export const transactionService = new TransactionService();
