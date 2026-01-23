import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      maxlength: [18, 'Title cannot exceed 18 characters']
    },

    subtitle: {
      type: String,
      trim: true,
      maxlength: [26, 'Subtitle cannot exceed 26 characters']
    },

    image: {
      url: {
        type: String,
        required: true
      },
      publicId: {
        type: String,
        required: true
      }
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
