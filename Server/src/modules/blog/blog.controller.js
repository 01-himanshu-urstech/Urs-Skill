import { blogService } from './blog.service.js';

/* ===================== ADMIN CONTROLLERS ===================== */

/**
 * CREATE BLOG (ADMIN / SUBADMIN)
 * POST /api/v1/blogs/create
 */
export const createBlogController = async (req, res, next) => {
  try {
    const result = await blogService.createBlog(
      req.body,
      {
        userId: req.user.adminId,
        role: req.user.role
      },
      req.file
    );

    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * GET BLOG BY ID (ADMIN / SUBADMIN)
 * GET /api/v1/blogs/by-id/:id
 */
export const getBlogByIdController = async (req, res, next) => {
  try {
    const result = await blogService.getBlogById(req.params.id);
    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};


/**
 * UPDATE BLOG (ADMIN / SUBADMIN)
 * PATCH /api/v1/blogs/update/:id
 */
export const updateBlogController = async (req, res, next) => {
  try {
    const result = await blogService.updateBlog(
      req.params.id,
      req.body,
      {
        userId: req.user.adminId,
        role: req.user.role
      },
      req.file
    );

    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE BLOG (SUPERADMIN)
 * DELETE /api/v1/blogs/delete/:id
 */
export const deleteBlogController = async (req, res, next) => {
  try {
    const result = await blogService.deleteBlog(
      req.params.id,
      {
        userId: req.user.adminId,
        role: req.user.role
      }
    );

    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * GET ALL BLOGS (ADMIN PANEL)
 * GET /api/v1/blogs/admin
 */
export const getAllBlogsAdminController = async (req, res, next) => {
  try {
    const result = await blogService.getAllBlogsAdmin(req.query);
    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};

/* ===================== PUBLIC CONTROLLERS ===================== */

/**
 * GET PUBLISHED BLOGS (WEBSITE)
 * GET /api/v1/blogs/public
 */
export const getPublicBlogsController = async (req, res, next) => {
  try {
    const result = await blogService.getPublicBlogs(req.query);
    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * GET SINGLE BLOG BY SLUG (WEBSITE)
 * GET /api/v1/blogs/public/:slug
 */
export const getBlogBySlugController = async (req, res, next) => {
  try {
    const result = await blogService.getBlogBySlug(req.params.slug);
    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};
