import mongoose from 'mongoose';
import { DISCOUNT_TYPES } from '../../constants/discountTypes.js';

const couponSchema = new mongoose.Schema(
  {
    /* -------- INFORMATION TAB -------- */
    name: {
      type: String,
      required: true
    },

    description: {
      type: String,
      maxlength: 120
    },

    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true
    },

    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE', 'EXPIRED'],
      default: 'ACTIVE'
    },

    /* -------- CONDITIONS TAB -------- */
    allowedCustomers: [
      {
        type: String, // email
      }
    ],

    validFrom: {
      type: Date,
      required: true
    },

    validTill: {
      type: Date,
      required: true
    },

    minCartAmount: {
      type: Number,
      default: 0
    },

    totalUsageLimit: {
      type: Number, // total coupons allowed
      required: true
    },

    perUserUsageLimit: {
      type: Number, // per customer
      default: 1
    },

    usedCount: {
      type: Number,
      default: 0
    },
    
    assignedSubAdmins: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Admin',
          default: []
        }
      ],

    /* -------- ACTIONS TAB -------- */
    discountType: {
      type: String,
      enum: Object.values(DISCOUNT_TYPES),
      required: true
    },

    discountValue: {
      type: Number,
      required: true
    },

    maxDiscountAmount: {
      type: Number // useful for percent
    },

    /* -------- META -------- */
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
      required: true
    }
  },
  { timestamps: true }
);

export const Coupon = mongoose.model('Coupon', couponSchema);
