// src/modules/enquiry/enquiry.model.js
import '../customer/customer.model.js'; // Ensure Customer model is imported

import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema(
  {
    background: {
      type: String,
      required: true,
      trim: true
    },

    courseType: {
      type: String,
      required: true,
      trim: true
    },

    domain: {
      type: String,
      required: true,
      trim: true
    },

    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      default: null
    },

    status: {
      type: String,
      enum: ['PENDING', 'CONTACTED', 'RESOLVED'],
      default: 'PENDING'
    }
  },
  { timestamps: true }
);

export const HelpEnquiry = mongoose.model('HelpEnquiry', enquirySchema);
