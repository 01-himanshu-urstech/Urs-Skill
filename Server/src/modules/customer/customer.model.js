import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      required: true
    },
    phone: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },

    //  Email verification
    isEmailVerified: {
      type: Boolean,
      default: false
    },
    emailOTP: String,
    emailOTPExpires: Date,

    forgotPasswordOTP: {
      type: String,
    },
    forgotPasswordOTPExpires: {
      type: Date,
    },

    //  IMPORTANT
    createdBy: {
      type: String,
      enum: ['SELF', 'ADMIN'],
      default: 'SELF'
    }
  },
  { timestamps: true }
);

export const Customer = mongoose.model('Customer', customerSchema);
