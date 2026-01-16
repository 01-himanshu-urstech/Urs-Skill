import express from 'express';
import {
  createAdminController,
  getAdminsController,
  updateAdminController,
  deleteAdminController,
  getAdminByIdController,
  getMyProfileController
} from './admin.controller.js';

import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { roleMiddleware } from '../../middlewares/role.middleware.js';
import { errorMiddleware } from '../../middlewares/error.middleware.js';

const router = express.Router();

export default (app) => {

  router.get(
  '/me',
  authMiddleware,
  roleMiddleware(['SUPERADMIN', 'SUBADMIN']),
  getMyProfileController
);


  // Only SUPERADMIN can manage admins
  router.get(
    '/getall-admins',
    authMiddleware,
    roleMiddleware(['SUPERADMIN']),
    getAdminsController
  );

  router.post(
    '/create',
    authMiddleware,
    roleMiddleware(['SUPERADMIN']),
    createAdminController
  );

router.get(
  '/get-admin/:adminId',
  authMiddleware,
  roleMiddleware(['SUPERADMIN']),
  getAdminByIdController
);


  router.patch(
    '/update/:id',
    authMiddleware,
    roleMiddleware(['SUPERADMIN']),
    updateAdminController
  );

  router.delete(
    '/delete/:id',
    authMiddleware,
    roleMiddleware(['SUPERADMIN']),
    deleteAdminController
  );

  app.use('/api/v1/admins', router);
  app.use(errorMiddleware);
};
