  // src/modules/enquiry/enquiry.service.js
  import { optionalAuthMiddleware } from '../../middlewares/optionalauth.middleware.js';
  import { HelpEnquiry } from './enquiry.model.js';
  import APIError from '../../utils/apiError.js';
  class EnquiryService {

    /* ================= CREATE ================= */
    async createEnquiry(data, customerId = null) {
      const { background, courseType, domain } = data;

      if (!background || !courseType || !domain) {
        throw APIError.validation('All fields are required');
      }

      const enquiry = await HelpEnquiry.create({
        background,
        courseType,
        domain,
        customerId
      });

      return {
        success: true,
        statusCode: 201,
        data: { enquiry }
      };
    }

    /* ================= ADMIN LIST ================= */
async getAllEnquiries() {
  const enquiries = await HelpEnquiry.find()
    .populate('customerId', 'name email phone')
    .sort({ createdAt: -1 })
    .lean(); // 🔥 important

  // 🔒 Strip userId defensively
  const sanitized = enquiries.map(({ userId, ...rest }) => rest);

  return {
    success: true,
    statusCode: 200,
    data: { enquiries: sanitized }
  };
}


    /* ================= UPDATE STATUS ================= */
    async updateStatus(id, status) {
      const enquiry = await HelpEnquiry.findById(id);

      if (!enquiry) {
        throw APIError.notFound('Enquiry not found');
      }

      enquiry.status = status;
      await enquiry.save();

      return {
        success: true,
        statusCode: 200,
        message: 'Enquiry status updated',
        data: { enquiry }
      };
    }
  }

  export const enquiryService = new EnquiryService();
