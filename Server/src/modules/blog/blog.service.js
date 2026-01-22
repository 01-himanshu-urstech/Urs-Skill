// src/modules/blog/blog.service.js
import { Blog } from './blog.model.js';
import APIError from '../../utils/apiError.js';
import { activityLogService } from '../logs/activityLog.service.js';
import slugify from 'slugify';
import {
  uploadToCloudinary,
  deleteFromCloudinary
} from '../../utils/cloudinary.js';


/* ---------- helper for unique slug ---------- */
const generateUniqueSlug = async (title, blogId = null) => {
  let baseSlug = slugify(title, { lower: true });
  let slug = baseSlug;
  let counter = 1;

  while (
    await Blog.findOne({
      slug,
      ...(blogId && { _id: { $ne: blogId } })
    })
  ) {
    slug = `${baseSlug}-${counter++}`;
  }

  return slug;
};

class BlogService {

  /* ================= CREATE ================= */
async createBlog(data, performedBy, file) {
  if (!data.title || !data.content) {
    throw APIError.validation('Title and content are required');
  }

  const slug = await generateUniqueSlug(data.title);

  let coverImage = null;

  if (file) {
    const uploaded = await uploadToCloudinary(
      file.buffer,
      'blogs'
    );

    coverImage = {
      url: uploaded.secure_url,
      publicId: uploaded.public_id
    };
  }

  const blog = await Blog.create({
    ...data,
    slug,
    coverImage,
    createdBy: performedBy
  });

  await activityLogService.log({
    action: 'CREATE_BLOG',
    performedBy,
    target: { entity: 'BLOG', entityId: blog._id }
  });

  return {
    success: true,
    statusCode: 201,
    data: { blog }
  };
}

/* ================= GET BY ID ================= */
async getBlogById(id) {
  if (!id) {
    throw APIError.validation('Blog ID is required');
  }

  const blog = await Blog.findById(id);
  if (!blog) {
    throw APIError.notFound('Blog not found');
  }

  return {
    success: true,
    statusCode: 200,
    data: { blog }
  };
}



  /* ================= UPDATE ================= */
async updateBlog(id, data, performedBy, file) {
    const blog = await Blog.findById(id);
    if (!blog) {
      throw APIError.notFound('Blog not found');
    }

    // 1. Handle Slug Generation if title changes
    if (data.title && data.title !== blog.title) {
      blog.slug = await generateUniqueSlug(data.title, blog._id);
    }

    // 2. Replace cover image if new file uploaded
    if (file) {
      if (blog.coverImage?.publicId) {
        await deleteFromCloudinary(blog.coverImage.publicId);
      }

      const uploaded = await uploadToCloudinary(
        file.buffer,
        'blogs'
      );

      blog.coverImage = {
        url: uploaded.secure_url,
        publicId: uploaded.public_id
      };
    }

    // ✅ FIX 1: Explicitly handle the 'status' field
    // Mongoose enums are case-sensitive. Ensure 'data.status' is exactly 'DRAFT' or 'PUBLISHED'
    if (data.status) {
      blog.status = data.status;
    }

    // ✅ FIX 2: Handle nested SEO data from FormData
    // Since FormData sends objects as [object Object] or stringified JSON, 
    // we need to parse it if it arrives as a string.
    if (data.seo && typeof data.seo === 'string') {
      try {
        data.seo = JSON.parse(data.seo);
      } catch (error) {
        console.error("SEO parsing error:", error);
      }
    }

    // 3. Merge remaining standard fields
    Object.assign(blog, data);

    // Save the changes
    await blog.save();

    // 4. Activity Logging
    await activityLogService.log({
      action: 'UPDATE_BLOG',
      performedBy,
      target: { entity: 'BLOG', entityId: blog._id },
      metadata: data
    });

    return {
      success: true,
      statusCode: 200,
      message: 'Blog updated successfully',
      data: { blog }
    };
  }

  /* ================= DELETE ================= */
  async deleteBlog(id, performedBy) {
    const blog = await Blog.findById(id);
    if (!blog) {
      throw APIError.notFound('Blog not found');
    }

    await blog.deleteOne();

    await activityLogService.log({
      action: 'DELETE_BLOG',
      performedBy,
      target: { entity: 'BLOG', entityId: blog._id }
    });

    return {
      success: true,
      statusCode: 200,
      message: 'Blog deleted successfully'
    };
  }

  /* ================= ADMIN LIST ================= */
  async getAllBlogsAdmin() {
    const blogs = await Blog.find().sort({ createdAt: -1 });

    return {
      success: true,
      statusCode: 200,
      data: { blogs }
    };
  }

  /* ================= PUBLIC LIST ================= */
  async getPublicBlogs() {
    const blogs = await Blog.find({ status: 'PUBLISHED' })
      .select('-createdBy')
      .sort({ createdAt: -1 });

    return {
      success: true,
      statusCode: 200,
      data: { blogs }
    };
  }

  /* ================= PUBLIC SINGLE ================= */
  async getBlogBySlug(slug) {
    const blog = await Blog.findOne({ slug, status: 'PUBLISHED' });
    if (!blog) {
      throw APIError.notFound('Blog not found');
    }

    return {
      success: true,
      statusCode: 200,
      data: { blog }
    };
  }
}

/* ✅ NAMED EXPORT (IMPORTANT) */
export const blogService = new BlogService();
