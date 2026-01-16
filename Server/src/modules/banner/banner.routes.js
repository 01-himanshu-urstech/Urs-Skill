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

const router = express.Router();

export default (app) => {
  /* PUBLIC (Frontend) */
  router.get('/', getBannersController);

  /* ADMIN ONLY */
  
  router.post(
    '/',
    authMiddleware,
    roleMiddleware(['SUPERADMIN', 'SUBADMIN']),
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
    updateBannerController
  );

  router.delete(
    '/:id',
    authMiddleware,
    roleMiddleware(['SUPERADMIN']),
    deleteBannerController
  );

  app.use('/api/v1/banners', router);
};
