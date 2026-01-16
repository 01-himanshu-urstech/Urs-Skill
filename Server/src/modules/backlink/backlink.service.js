// src/modules/backlink/backlink.service.js
import { Backlink } from './backlink.model.js';
import APIError from '../../utils/apiError.js';
import { activityLogService } from '../logs/activityLog.service.js';

class BacklinkService {

  /* ================= CREATE ================= */
  async createBacklink(data, performedBy) {
    const { name, url, type, position } = data;

    if (!name || !url) {
      throw APIError.validation('Name and URL are required');
    }

    const backlink = await Backlink.create({
      name,
      url,
      type,
      position
    });

    await activityLogService.log({
      action: 'CREATE_BACKLINK',
      performedBy,
      target: {
        entity: 'BACKLINK',
        entityId: backlink._id
      },
      metadata: { name, url }
    });

    return {
      success: true,
      statusCode: 201,
      message: 'Backlink created successfully',
      data: { backlink }
    };
  }

  /* ================= GET ALL (ADMIN) ================= */
  async getAllBacklinks() {
    const backlinks = await Backlink.find().sort({ createdAt: -1 });

    return {
      success: true,
      statusCode: 200,
      data: { backlinks }
    };
  }

  /* ================= GET ACTIVE (PUBLIC) ================= */
  async getActiveBacklinks() {
    const backlinks = await Backlink.find({ isActive: true })
      .sort({ createdAt: -1 });

    return {
      success: true,
      statusCode: 200,
      data: { backlinks }
    };
  }

  /* ================= UPDATE ================= */
  async updateBacklink(id, data, performedBy) {
    const backlink = await Backlink.findById(id);
    if (!backlink) {
      throw APIError.notFound('Backlink not found');
    }

    Object.assign(backlink, data);
    await backlink.save();

    await activityLogService.log({
      action: 'UPDATE_BACKLINK',
      performedBy,
      target: {
        entity: 'BACKLINK',
        entityId: backlink._id
      },
      metadata: data
    });

    return {
      success: true,
      statusCode: 200,
      message: 'Backlink updated successfully',
      data: { backlink }
    };
  }

  /* ================= DELETE ================= */
  async deleteBacklink(id, performedBy) {
    const backlink = await Backlink.findById(id);
    if (!backlink) {
      throw APIError.notFound('Backlink not found');
    }

    await backlink.deleteOne();

    await activityLogService.log({
      action: 'DELETE_BACKLINK',
      performedBy,
      target: {
        entity: 'BACKLINK',
        entityId: backlink._id
      }
    });

    return {
      success: true,
      statusCode: 200,
      message: 'Backlink deleted successfully'
    };
  }
}

export const backlinkService = new BacklinkService();
