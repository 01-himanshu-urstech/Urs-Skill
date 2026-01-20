import express from 'express';
import {
  createBacklinkController,
  getAllBacklinksController,
  updateBacklinkController,
  deleteBacklinkController,
  getActiveBacklinksController
} from './backlink.controller.js';

import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { roleMiddleware } from '../../middlewares/role.middleware.js';

const router = express.Router();

export default (app) => {

  /* ================= ADMIN ROUTES ================= */

  /**
   * SUPERADMIN
   * CREATE BACKLINK
   * POST /api/v1/backlinks/create
   */
  router.post(
    '/create',
    authMiddleware,
    roleMiddleware(['SUPERADMIN','SUBADMIN']),
    createBacklinkController
  );

  /**
   * SUPERADMIN
   * GET ALL BACKLINKS (ADMIN PANEL)
   * GET /api/v1/backlinks/admin
   */
  router.get(
    '/getallbacklinks',
    authMiddleware,
    roleMiddleware(['SUPERADMIN','SUBADMIN']),
    getAllBacklinksController
  );

  /**
   * SUPERADMIN
   * UPDATE BACKLINK
   * PATCH /api/v1/backlinks/update/:id
   */
  router.patch(
    '/update/:id',
    authMiddleware,
    roleMiddleware(['SUPERADMIN','SUBADMIN']),
    updateBacklinkController
  );

  /**
   * SUPERADMIN
   * DELETE BACKLINK
   * DELETE /api/v1/backlinks/delete/:id
   */
  router.delete(
    '/delete/:id',
    authMiddleware,
    roleMiddleware(['SUPERADMIN','SUBADMIN']),
    deleteBacklinkController
  );

  /* ================= PUBLIC ROUTE ================= */

  /**
   * PUBLIC (NO AUTH)
   * GET ACTIVE BACKLINKS (WEBSITE)
   * GET /api/v1/backlinks/public
   */
  router.get(
    '/public',
    getActiveBacklinksController
  );

  // mount
  app.use('/api/v1/backlinks', router);
};
