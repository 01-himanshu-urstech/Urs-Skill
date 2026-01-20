import express from 'express';
import {
  createBannerController,
  getBannersController,
  updateBannerController,
  deleteBannerController,
  getBannerByIdController
} from './banner.controller.js';

import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { roleMiddleware } from '../../middlewares/role.middleware.js';
import { upload } from '../../middlewares/upload.middleware.js';

const router = express.Router();

export default (app) => {

  /* PUBLIC */
  router.get('/', getBannersController);

  /* ADMIN */
  router.post(
    '/',
    authMiddleware,
    roleMiddleware(['SUPERADMIN', 'SUBADMIN']),
    upload.single('image'),
    createBannerController
  );

  router.get(
    '/:id',
    authMiddleware,
    roleMiddleware(['SUPERADMIN', 'SUBADMIN']),
    getBannerByIdController
  );

  router.patch(
    '/:id',
    authMiddleware,
    roleMiddleware(['SUPERADMIN', 'SUBADMIN']),
    upload.single('image'),
    updateBannerController
  );

  router.delete(
    '/:id',
    authMiddleware,
    roleMiddleware(['SUPERADMIN','SUBADMIN']),
    deleteBannerController
  );

  app.use('/api/v1/banners', router);
};
