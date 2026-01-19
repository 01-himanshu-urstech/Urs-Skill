import mongoose from 'mongoose';

const couponUsageSchema = new mongoose.Schema(
  {
    couponId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Coupon',
      required: true
    },

    couponCode: {
      type: String,
      required: true
    },

    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true
    },

    customerEmail: {
      type: String,
      required: true
    },

    relatedSubAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin' // SUBADMIN
    },

    courseId: {
      type: Number
    },


    cartAmount: {
      type: Number,
      required: true
    },

    discountAmount: {
      type: Number,
      required: true
    },

    finalAmount: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

export const CouponUsage = mongoose.model(
  'CouponUsage',
  couponUsageSchema
);
