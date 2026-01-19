// src/modules/blog/blog.routes.js
import express from 'express';
import {
  createBlogController,
  updateBlogController,
  deleteBlogController,
  getAllBlogsAdminController,
  getPublicBlogsController,
  getBlogByIdController,
  getBlogBySlugController
} from './blog.controller.js';

import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { roleMiddleware } from '../../middlewares/role.middleware.js';
import {upload} from '../../middlewares/upload.middleware.js';

const router = express.Router();

export default (app) => {

  /* ===== ADMIN ===== */
  router.post(
    '/create',
    authMiddleware,
    roleMiddleware(['SUPERADMIN', 'SUBADMIN']),
    upload.single('coverImage'),
    createBlogController
  );

  /**
 * ADMIN / SUBADMIN
 * GET BLOG BY ID
 */
router.get(
  '/by-id/:id',
  authMiddleware,
  roleMiddleware(['SUPERADMIN', 'SUBADMIN']),
  getBlogByIdController
);


  router.patch(
    '/update/:id',
    authMiddleware,
    roleMiddleware(['SUPERADMIN', 'SUBADMIN']),
    upload.single('coverImage'),
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
