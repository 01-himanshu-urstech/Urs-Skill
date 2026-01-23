import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    slug: { type: String, unique: true, index: true },

    excerpt: String,

    content: { type: String, required: true },

    coverImage: {
      url: String,
      publicId: String,
    },

   seo: {
  metaTitle: {
    type: String,
    maxlength: [70, 'Meta title cannot exceed 70 characters']
  },

  metaDescription: {
    type: String,
    maxlength: [325, 'Meta description cannot exceed 325 characters']
  },

  keywords: {
    type: [String],
    validate: {
      validator: (arr) => arr.every(k => k.length <= 50),
      message: 'Each keyword must be under 50 characters'
    }
  }
}
,

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
