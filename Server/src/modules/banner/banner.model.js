import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema(
  {
    title: String,
    subtitle: String,

    image: {
      type: String,
      required: true
    },

    link: String,

    position: {
      type: String,
      enum: ['HOME', 'COURSE'],
      default: 'HOME'
    },

    order: {
      type: Number,
      default: 0
    },

    isActive: {
      type: Boolean,
      default: true
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin'
    }
  },
  { timestamps: true }
);

export const Banner = mongoose.model('Banner', bannerSchema);
