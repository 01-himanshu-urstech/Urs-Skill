import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    transactionId: {
      type: String,
      required: true,
      unique: true
    },

    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true
    },

    courseId: {
      type: Number,
      required: true
    },

    amount: {
      type: Number,
      required: true
    },

    couponCode: {
      type: String
    },

    discountAmount: {
      type: Number,
      default: 0
    },

    finalAmount: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      enum: ['PENDING', 'SUCCESS', 'FAILED'],
      default: 'PENDING'
    },

    paymentGateway: {
      type: String,
      default: 'CASHFREE'
    },

    paymentSessionId: {
      type: String
    },

    transactionValidity: {
      type: Date
    }
    ,
    // Add this inside transactionSchema
    referredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
      default: null
    }
  },
  { timestamps: true }
);

export const Transaction = mongoose.model('Transaction', transactionSchema);
