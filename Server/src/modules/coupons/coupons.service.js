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

    // 1. Create the coupon
    let coupon = await Coupon.create({
      ...data,
      validFrom: convertISTToUTC(data.validFrom),
      validTill: convertISTToUTC(data.validTill),
      createdBy: admin.adminId
    });

    // 2. IMPORTANT: Populate the sub-admin details so the frontend receives the Name and Email
    // Replace 'assignedSubAdmins' with the exact field name in your Mongoose Schema
    coupon = await coupon.populate('assignedSubAdmins', 'name email');

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

    console.log('✅ Coupon created and populated:', coupon.code);

    return {
      success: true,
      statusCode: 201,
      message: 'Coupon created successfully',
      data: { coupon } // Now 'coupon' includes full sub-admin objects
    };
}

  /* ---------------- GET COUPON BY ID ---------------- */
async getCouponById(couponId) {
  const coupon = await Coupon.findById(couponId);

  if (!coupon) {
    throw APIError.notFound('Coupon not found');
  }

  return {
    success: true,
    statusCode: 200,
    data: { coupon }
  };
}


/* ---------------- UPDATE COUPON BY ID ---------------- */
async updateCouponById(couponId, updateData, performedBy) {

  const coupon = await Coupon.findById(couponId);
  if (!coupon) {
    throw APIError.notFound('Coupon not found');
  }

  // ❌ Prevent updating coupon code (best practice)
  if (updateData.code) {
    throw APIError.validation('Coupon code cannot be updated');
  }

  // ⏱ Convert dates if present
  if (updateData.validFrom) {
    updateData.validFrom = convertISTToUTC(updateData.validFrom);
  }

  if (updateData.validTill) {
    updateData.validTill = convertISTToUTC(updateData.validTill);
  }

  Object.assign(coupon, updateData);
  await coupon.save();

  // 🧾 Activity Log
  await ActivityLog.create({
    action: 'UPDATE_COUPON',
    performedBy,
    target: {
      entity: 'COUPON',
      entityId: coupon._id
    },
    metadata: {
      updatedFields: Object.keys(updateData)
    }
  });

  return {
    success: true,
    statusCode: 200,
    message: 'Coupon updated successfully',
    data: { coupon }
  };
}

  /* ---------------- LIST COUPONS ---------------- */
async getCoupons(admin) {
    let query = {};
    
    // If the person asking is a SUBADMIN, only show coupons assigned to them
    if (admin.role === 'SUBADMIN') {
        query = { assignedSubAdmins: admin.adminId };
    }

    const coupons = await Coupon.find(query)
        .populate('assignedSubAdmins', 'name email')
        .sort({ createdAt: -1 });

    return {
        success: true,
        statusCode: 200,
        data: { coupons }
    };
}


/* ---------------- DELETE COUPON BY ID ---------------- */
async deleteCouponById(couponId, performedBy) {
  // Use 'couponId' (the argument name), not 'id'
  const coupon = await Coupon.findById(couponId);
  
  if (!coupon) {
    throw APIError.notFound('Coupon not found');
  }

  // Delete the coupon
  await Coupon.findByIdAndDelete(couponId);

  // 🧾 Activity Log
  await ActivityLog.create({
    action: 'DELETE_COUPON',
    performedBy,
    target: {
      entity: 'COUPON',
      entityId: couponId
    },
    metadata: {
      code: coupon.code,
      deletedAt: new Date()
    }
  });

  return {
    success: true,
    statusCode: 200,
    message: `Coupon '${coupon.code}' deleted successfully`
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

   // 💰 Corrected Discount calculation
let discount = 0;

if (coupon.discountType === '1' || coupon.discountType === 'PERCENTAGE') {
    // PERCENTAGE Logic
    discount = (Number(cartAmount) * Number(coupon.discountValue)) / 100;
    if (coupon.maxDiscountAmount && coupon.maxDiscountAmount > 0) {
        discount = Math.min(discount, coupon.maxDiscountAmount);
    }
} else if (coupon.discountType === '2' || coupon.discountType === 'FLAT') {
    // FLAT Logic (This matches your DB where discountType is "2")
    discount = Number(coupon.discountValue);
}

// Ensure discount doesn't exceed the cart amount
discount = Math.min(discount, Number(cartAmount));
discount = Math.round(discount);

const finalAmount = Math.max(cartAmount - discount, 0);

    // ✅ SAVE COUPON USAGE (THIS FIXES YOUR ERROR)
    // await CouponUsage.create({
    //   couponId: coupon._id,
    //   couponCode: coupon.code,
    //   customerId: customer.customerId,
    //   customerEmail: customer.email,
    //   relatedSubAdmin: subAdminId || null,
    //   cartAmount,
    //   discountAmount: discount,
    //   finalAmount
    // });

    // // ✅ increment usage count
    // coupon.usedCount += 1;
    // await coupon.save();
    
    return {
      success: true,
    statusCode: 200,
      data: {
          discount,
          finalAmount,
          couponCode: coupon.code,
          discountType: coupon.discountType // Send this back for UI
      }
    };


  }

}

export const couponService = new CouponService();
