import { leadService } from './lead.service.js';

export const trackLeadController = async (req, res, next) => {
  try {
    const result = await leadService.trackLeadEvent(
      req.body,
      req.user // comes from optionalAuthMiddleware
    );

    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};

/* ADMIN */
export const getLeadsController = async (req, res, next) => {
  try {
    const result = await leadService.getLeads(req.query);
    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};
