// src/modules/enquiry/enquiry.routes.js

import express from 'express';

import {
  submitHelpEnquiryController,
  getAllEnquiriesController,
  updateEnquiryStatusController
} from './enquiry.controller.js';

import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { roleMiddleware } from '../../middlewares/role.middleware.js';
import { optionalAuthMiddleware } from '../../middlewares/optionalauth.middleware.js';
const router = express.Router();

export default (app) => {

  /* ===== PUBLIC ===== */
router.post(
  '/help',
  optionalAuthMiddleware,
  submitHelpEnquiryController
);
  /* ===== ADMIN ===== */
  router.get(
    '/admin',
    authMiddleware,
    roleMiddleware(['SUPERADMIN', 'SUBADMIN']),
    getAllEnquiriesController
  );

  router.patch(
    '/status/:id',
    authMiddleware,
    roleMiddleware(['SUPERADMIN', 'SUBADMIN']),
    updateEnquiryStatusController
  );

  app.use('/api/v1/enquiries', router);
};
