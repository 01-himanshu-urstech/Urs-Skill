import express from 'express';
import { getLeadsController, trackLeadController } from './lead.controller.js';

import { optionalAuthMiddleware } from '../../middlewares/optionalauth.middleware.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { roleMiddleware } from '../../middlewares/role.middleware.js';

const router = express.Router();

export default (app) => {

  /**
   * PUBLIC / CUSTOMER / GUEST
   */
  router.post(
    '/track',
    optionalAuthMiddleware,
    trackLeadController
  );

  /**
   * ADMIN
   */
  router.get(
    '/',
    authMiddleware,
    roleMiddleware(['SUPERADMIN', 'SUBADMIN']),
    getLeadsController
  );

  app.use('/api/v1/leads', router);
};
