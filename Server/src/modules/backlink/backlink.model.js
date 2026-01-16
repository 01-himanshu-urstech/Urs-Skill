// src/modules/backlink/backlink.model.js
import mongoose from 'mongoose';

const backlinkSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
    type: {
      type: String,
      enum: ['DOFOLLOW', 'NOFOLLOW'],
      default: 'DOFOLLOW'
    },
    position: {
      type: String,
      enum: ['FOOTER', 'BLOG', 'PARTNER'],
      default: 'FOOTER'
    },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Backlink = mongoose.model('Backlink', backlinkSchema);
