// src/modules/blog/blog.routes.js
import express from 'express';
import {
  createBlogController,
  updateBlogController,
  deleteBlogController,
  getAllBlogsAdminController,
  getPublicBlogsController,
  getBlogBySlugController
} from './blog.controller.js';

import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { roleMiddleware } from '../../middlewares/role.middleware.js';

const router = express.Router();

export default (app) => {

  /* ===== ADMIN ===== */
  router.post(
    '/create',
    authMiddleware,
    roleMiddleware(['SUPERADMIN', 'SUBADMIN']),
    createBlogController
  );

  router.patch(
    '/update/:id',
    authMiddleware,
    roleMiddleware(['SUPERADMIN', 'SUBADMIN']),
    updateBlogController
  );

  router.delete(
    '/delete/:id',
    authMiddleware,
    roleMiddleware(['SUPERADMIN']),
    deleteBlogController
  );

  router.get(
    '/getallblogs',
    authMiddleware,
    roleMiddleware(['SUPERADMIN', 'SUBADMIN']),
    getAllBlogsAdminController
  );

  /* ===== PUBLIC ===== */
  router.get('/public', getPublicBlogsController);
  router.get('/public/:slug', getBlogBySlugController);

  app.use('/api/v1/blogs', router);
};
