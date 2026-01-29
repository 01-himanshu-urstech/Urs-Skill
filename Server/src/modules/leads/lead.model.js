import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      default: null // guest user
    },

    courseId: {
      type: Number, // STATIC_COURSES key
      required: true
    },

    eventType: {
      type: String,
      enum: [
        'COURSE_VIEW',
        'CHECKOUT_VIEW',
        'PAYMENT_INITIATED',
        'PAYMENT_SUCCESS',
        'PAYMENT_FAILED',
        'PAYMENT_EXIT'
      ],
      required: true
    },

    source: {
      type: String
    },

    sessionId: {
      type: String // frontend-generated for guests
    },

    meta: {
      type: Object
    }
  },
  { timestamps: true }
);

export const Lead = mongoose.model('Lead', leadSchema);
