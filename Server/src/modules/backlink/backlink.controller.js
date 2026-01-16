import { backlinkService } from './backlink.service.js';

/* ================= ADMIN CONTROLLERS ================= */

/**
 * CREATE BACKLINK
 * POST /api/v1/backlinks/create
 */
export const createBacklinkController = async (req, res, next) => {
  try {
    const result = await backlinkService.createBacklink(
      req.body,
      {
        userId: req.user.adminId,
        role: req.user.role
      }
    );

    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * GET ALL BACKLINKS (ADMIN)
 * GET /api/v1/backlinks/admin
 */
export const getAllBacklinksController = async (req, res, next) => {
  try {
    const result = await backlinkService.getAllBacklinks();
    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * UPDATE BACKLINK
 * PATCH /api/v1/backlinks/update/:id
 */
export const updateBacklinkController = async (req, res, next) => {
  try {
    const result = await backlinkService.updateBacklink(
      req.params.id,
      req.body,
      {
        userId: req.user.adminId,
        role: req.user.role
      }
    );

    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE BACKLINK
 * DELETE /api/v1/backlinks/delete/:id
 */
export const deleteBacklinkController = async (req, res, next) => {
  try {
    const result = await backlinkService.deleteBacklink(
      req.params.id,
      {
        userId: req.user.adminId,
        role: req.user.role
      }
    );

    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};

/* ================= PUBLIC CONTROLLER ================= */

/**
 * GET ACTIVE BACKLINKS (WEBSITE)
 * GET /api/v1/backlinks/public
 */
export const getActiveBacklinksController = async (req, res, next) => {
  try {
    const result = await backlinkService.getActiveBacklinks();
    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};
