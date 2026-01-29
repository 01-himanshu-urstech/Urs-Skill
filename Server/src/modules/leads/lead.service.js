import { Lead } from './lead.model.js';
import APIError from '../../utils/apiError.js';
import { STATIC_COURSES } from '../../constants/courses.js';

class LeadService {
  async trackLeadEvent(data, user) {
    const {
      courseId,
      eventType,
      source,
      sessionId,
      meta
    } = data;

    // ✅ Validate static course
    if (!STATIC_COURSES[courseId]) {
      throw APIError.validation('Invalid courseId');
    }

    await Lead.create({
      customerId: user?.customerId || null,
      courseId,
      eventType,
      source,
      sessionId,
      meta
    });

    return {
      success: true,
      statusCode: 201,
      message: 'Lead event tracked successfully'
    };
  }

  /* ---------- ADMIN: LIST LEADS ---------- */
  async getLeads(filters = {}) {
    const leads = await Lead.find(filters)
      .populate('customerId', 'name email phone')
      .sort({ createdAt: -1 });

    return {
      success: true,
      statusCode: 200,
      data: { leads }
    };
  }
}

export const leadService = new LeadService();
