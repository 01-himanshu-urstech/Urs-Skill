// src/modules/enquiry/enquiry.controller.js

import { enquiryService } from './enquiry.service.js';

/* ================= PUBLIC ================= */

/**
 * SUBMIT HELP ENQUIRY
 * POST /api/v1/enquiries/help
 */
export const submitHelpEnquiryController = async (req, res, next) => {
  try {
    // ✅ use customerId only
    const customerId = req.user?.customerId || null;

    const result = await enquiryService.createEnquiry(
      req.body,
      customerId
    );

    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};


/* ================= ADMIN ================= */

/**
 * GET ALL ENQUIRIES
 * GET /api/v1/enquiries/admin
 */
export const getAllEnquiriesController = async (req, res, next) => {
  try {
    const result = await enquiryService.getAllEnquiries();
    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * UPDATE ENQUIRY STATUS
 * PATCH /api/v1/enquiries/status/:id
 */
export const updateEnquiryStatusController = async (req, res, next) => {
  try {
    const result = await enquiryService.updateStatus(
      req.params.id,
      req.body.status
    );

    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};
