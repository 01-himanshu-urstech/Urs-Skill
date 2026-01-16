import { ActivityLog } from './activityLog.model.js';

class ActivityLogService {

  /* ---------- WRITE LOG (USED BY SERVICES) ---------- */
  async log({ action, performedBy, target, metadata = {} }) {
    await ActivityLog.create({
      action,
      performedBy,
      target,
      metadata
    });
  }

  /* ---------- READ LOGS (USED BY ADMIN PANEL) ---------- */
  async getAllLogs({ page = 1, limit = 20 }) {
    const logs = await ActivityLog.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await ActivityLog.countDocuments();

    return {
      success: true,
      statusCode: 200,
      data: { total, page: Number(page), logs }
    };
  }

  async getAdminLogs({ page = 1, limit = 20 }) {
    const logs = await ActivityLog.find({
      'performedBy.role': { $in: ['SUPERADMIN', 'ADMIN', 'SUBADMIN'] }
    })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    return {
      success: true,
      statusCode: 200,
      data: { logs }
    };
  }

  async getCustomerLogs({ page = 1, limit = 20 }) {
    const logs = await ActivityLog.find({
      'target.entity': 'CUSTOMER'
    })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    return {
      success: true,
      statusCode: 200,
      data: { logs }
    };
  }
}

export const activityLogService = new ActivityLogService();
