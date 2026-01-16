import express from 'express';
import {
  createCouponController,
  getCouponsController,
  applyCouponController
} from './coupons.controller.js';

import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { roleMiddleware } from '../../middlewares/role.middleware.js';

const router = express.Router();

export default (app) => {

  /* ================= ADMIN COUPON MANAGEMENT ================= */

  /**
   * CREATE COUPON
   * SUPERADMIN / SUBADMIN
   */
  router.post(
    '/create-coupons',
    authMiddleware,
    roleMiddleware(['SUPERADMIN', 'SUBADMIN']),
    createCouponController
  );

  /**
   * LIST ALL COUPONS
   * SUPERADMIN / SUBADMIN
   */
  router.get(
    '/get-coupons',
    authMiddleware,
    roleMiddleware(['SUPERADMIN', 'SUBADMIN']),
    getCouponsController
  );

  /* ================= CUSTOMER COUPON APPLY ================= */

  /**
   * APPLY COUPON
   * CUSTOMER
   */
  router.post(
    '/apply',
    authMiddleware,
    roleMiddleware(['CUSTOMER']),
    applyCouponController
  );

  app.use('/api/v1/coupons', router);
};
