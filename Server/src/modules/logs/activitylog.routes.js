import express from 'express';
import {
  getAllLogsController,
  getAdminLogsController,
  getCustomerLogsController
} from './activityLog.controller.js';

import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { roleMiddleware } from '../../middlewares/role.middleware.js';

const router = express.Router();

export default (app) => {

  /**
   * SUPERADMIN ONLY
   * GET ALL LOGS
   */
  router.get(
    '/',
    authMiddleware,
    roleMiddleware(['SUPERADMIN']),
    getAllLogsController
  );

  /**
   * SUPERADMIN ONLY
   * GET ADMIN LOGS
   */
  router.get(
    '/admin',
    authMiddleware,
    roleMiddleware(['SUPERADMIN']),
    getAdminLogsController
  );

  /**
   * SUPERADMIN ONLY
   * GET CUSTOMER LOGS
   */
  router.get(
    '/customers',
    authMiddleware,
    roleMiddleware(['SUPERADMIN']),
    getCustomerLogsController
  );

  app.use('/api/v1/logs', router);
};
