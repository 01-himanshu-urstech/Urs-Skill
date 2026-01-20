import express from 'express';
import {
  createCustomerController,
  getCustomersController,
  getCustomerByIdController,
  updateCustomerController,
  deleteCustomerController,
  updateOwnProfileController
} from './customer.controller.js';

import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { roleMiddleware } from '../../middlewares/role.middleware.js';

const router = express.Router();

export default (app) => {


/**
 * CUSTOMER
 * GET OWN PROFILE
 */
  router.get(
    '/me',
    authMiddleware,
    (req, res, next) => {
      // ✅ Only check customerId from JWT
      if (!req.user.customerId) {
        return next(APIError.unauthorized('Customer not authenticated'));
      }
      // Map JWT → controller param
      req.params.customerId = req.user.customerId;
      next();
    },
    getCustomerByIdController
  );

/**
 * CUSTOMER: Update Own Profile
 * PATCH /api/v1/customers/update-me
 */
router.patch(
  '/update-me',
  authMiddleware, // Ensures user is logged in
  updateOwnProfileController
);

  /**
   * ADMIN / SUBADMIN
   * GET ALL CUSTOMERS
   */
  router.get(
    '/',
    authMiddleware,
    roleMiddleware(['SUPERADMIN', 'SUBADMIN']),
    getCustomersController
  );

  /**
   * ADMIN / SUBADMIN
   * GET CUSTOMER BY ID
   */
  router.get(
    '/by-id/:customerId',
    authMiddleware,
    roleMiddleware(['SUPERADMIN', 'SUBADMIN']),
    getCustomerByIdController
  );

  /**
   * SUPERADMIN ONLY
   * CREATE CUSTOMER
   */
  router.post(
    '/create',
    authMiddleware,
    roleMiddleware(['SUPERADMIN','SUBADMIN']),
    createCustomerController
  );

  /**
   * SUPERADMIN ONLY
   * UPDATE CUSTOMER
   */
  router.patch(
    '/update/:customerId',
    authMiddleware,
    roleMiddleware(['SUPERADMIN','SUBADMIN']),
    updateCustomerController
  );

  /**
   * SUPERADMIN ONLY
   * DELETE CUSTOMER
   */
  router.delete(
    '/delete/:customerId',
    authMiddleware,
    roleMiddleware(['SUPERADMIN','SUBADMIN']),
    deleteCustomerController
  );

  app.use('/api/v1/customers', router);
};
