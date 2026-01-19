// src/modules/blog/blog.model.js
import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true, index: true },
    excerpt: String,
    content: { type: String, required: true }, // HTML / Markdown
    coverImage: {
      url: String,
      publicId: String,
    },

    seo: {
      metaTitle: String,
      metaDescription: String,
      keywords: [String]
    },

    status: {
      type: String,
      enum: ['DRAFT', 'PUBLISHED'],
      default: 'DRAFT'
    },

    createdBy: {
      adminId: mongoose.Schema.Types.ObjectId,
      role: String
    }
  },
  { timestamps: true }
);

export const Blog = mongoose.model('Blog', blogSchema);
