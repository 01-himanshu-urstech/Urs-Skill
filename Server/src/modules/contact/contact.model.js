import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },

  phone: {
    type: String,
    required: true
  },

  message: {
    type: String,
    trim: true
  },

  status: {
    type: String,
    enum: ['NEW', 'CONTACTED', 'CLOSED'],
    default: 'NEW'
  }
}, {
  timestamps: true
});

export const Contact = mongoose.model('Contact', contactSchema);
