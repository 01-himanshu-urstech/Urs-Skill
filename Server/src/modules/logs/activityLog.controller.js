import { activityLogService } from './activityLog.service.js';

export const getAllLogsController = async (req, res, next) => {
  try {
    const result = await activityLogService.getAllLogs(req.query);
    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};

export const getAdminLogsController = async (req, res, next) => {
  try {
    const result = await activityLogService.getAdminLogs(req.query);
    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};

export const getCustomerLogsController = async (req, res, next) => {
  try {
    const result = await activityLogService.getCustomerLogs(req.query);
    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};
