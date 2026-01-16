import { Coupon } from './coupons.model.js';
import APIError from '../../utils/apiError.js';
import { ActivityLog } from '../logs/activityLog.model.js';
import { convertISTToUTC, getISTDate } from '../../utils/time.js';
import {CouponUsage} from './couponUsage.model.js';
import { DISCOUNT_TYPES } from '../../constants/discountTypes.js';


class CouponService {

  /* ---------------- CREATE COUPON ---------------- */
  async createCoupon(data, admin) {
    console.log(' Creating coupon:', data.code);

    const existing = await Coupon.findOne({ code: data.code });
    if (existing) {
      throw APIError.conflict('Coupon code already exists');
    }

    const coupon = await Coupon.create({
      ...data,
    validFrom: convertISTToUTC(data.validFrom),
    validTill: convertISTToUTC(data.validTill),
      createdBy: admin.adminId
    });

    // Activity log
    await ActivityLog.create({
      action: 'CREATE_COUPON',
      performedBy: {
        userId: admin.adminId,
        role: admin.role
      },
      target: {
        entity: 'COUPON',
        entityId: coupon._id
      },
      metadata: {
        code: coupon.code
      }
    });

    console.log('✅ Coupon created:', coupon.code);

    return {
      success: true,
      statusCode: 201,
      message: 'Coupon created successfully',
      data: { coupon }
    };
  }

  /* ---------------- LIST COUPONS ---------------- */
  async getCoupons() {
    console.log(' Fetching coupons');

    const coupons = await Coupon.find().sort({ createdAt: -1 });

    return {
      success: true,
      statusCode: 200,
      data: { coupons }
    };
  }

  /* ---------------- APPLY COUPON ---------------- */
  async applyCoupon({ code, customer, cartAmount, subAdminId = null }) {
    console.log(' Applying coupon:', code);

    const coupon = await Coupon.findOne({ code, status: 'ACTIVE' });
    if (!coupon) {
      throw APIError.notFound('Invalid or inactive coupon');
    }

    const now = getISTDate();
    if (now < coupon.validFrom || now > coupon.validTill) {
      throw APIError.validation('Coupon expired or not active yet');
    }

    if (cartAmount < coupon.minCartAmount) {
      throw APIError.validation(
        `Minimum cart amount is ₹${coupon.minCartAmount}`
      );
    }

    if (coupon.totalUsageLimit <= coupon.usedCount) {
      throw APIError.validation('Coupon usage limit reached');
    }

    if (
      coupon.allowedCustomers.length &&
      !coupon.allowedCustomers.includes(customer.email)
    ) {
      throw APIError.forbidden('Coupon not allowed for this customer');
    }

    // 💰 Discount calculation
    let discount = 0;
    if (coupon.discountType === '2') {
      // PERCENT
      discount = (cartAmount * coupon.discountValue) / 100;
      if (coupon.maxDiscountAmount) {
        discount = Math.min(discount, coupon.maxDiscountAmount);
      }
    } else {
      // FLAT
      discount = coupon.discountValue;
    }

    const finalAmount = Math.max(cartAmount - discount, 0);

    // ✅ SAVE COUPON USAGE (THIS FIXES YOUR ERROR)
    await CouponUsage.create({
      couponId: coupon._id,
      couponCode: coupon.code,
      customerId: customer.customerId,
      customerEmail: customer.email,
      relatedSubAdmin: subAdminId || null,
      cartAmount,
      discountAmount: discount,
      finalAmount
    });

    // ✅ increment usage count
    coupon.usedCount += 1;
    await coupon.save();

    return {
      success: true,
      statusCode: 200,
      message: 'Coupon applied successfully',
      data: {
        discount,
        finalAmount,
        couponCode: coupon.code
      }
    };
  }

}

export const couponService = new CouponService();
