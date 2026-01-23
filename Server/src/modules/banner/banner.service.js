import { Banner } from './banner.model.js';
import APIError from '../../utils/apiError.js';
import {
  uploadToCloudinary,
  deleteFromCloudinary
} from '../../utils/cloudinary.js';

class BannerService {

  /* ---------- CREATE ---------- */
  async createBanner(data, adminId, file) {
    console.log('🖼 Creating banner');

    if (!file) {
      throw APIError.validation('Banner image is required');
    }

    // NEW: Check if a banner with the same order exists in this position
    const existingOrder = await Banner.findOne({ 
        order: data.order, 
        position: data.position 
    });
    
    if (existingOrder) {
        throw APIError.validation(`Order number ${data.order} is already taken for the ${data.position} position.`);
    }

    const uploaded = await uploadToCloudinary(file.buffer, 'banners');
    if (data.title && data.title.length > 18) {
      throw APIError.validation('Title must be at most 18 characters');
    }

    if (data.subtitle && data.subtitle.length > 26) {
      throw APIError.validation('Subtitle must be at most 26 characters');
    }


    const banner = await Banner.create({
      ...data,
      image: {
        url: uploaded.secure_url,
        publicId: uploaded.public_id
      },
      createdBy: adminId
    });

    return {
      success: true,
      statusCode: 201,
      message: 'Banner created successfully',
      data: { banner }
    };
  }

  /* ---------- LIST ---------- */
  async getBanners({ position, isActive }) {
    const query = {};
    if (position) query.position = position;
    if (isActive !== undefined) query.isActive = isActive;

    const banners = await Banner.find(query).sort({ order: 1 });

    return {
      success: true,
      statusCode: 200,
      data: { banners }
    };
  }

  /* ---------- GET BY ID ---------- */
  async getBannerById(id) {
    const banner = await Banner.findById(id);
    if (!banner) throw APIError.notFound('Banner not found');

    return {
      success: true,
      statusCode: 200,
      data: { banner }
    };
  }

  /* ---------- UPDATE ---------- */
  async updateBanner(id, data, file) {
    const banner = await Banner.findById(id);
    if (!banner) throw APIError.notFound('Banner not found');

    // NEW: Check if the new order is taken by ANOTHER banner
    if (data.order || data.position) {
        const orderToCheck = data.order || banner.order;
        const positionToCheck = data.position || banner.position;

        const existingOrder = await Banner.findOne({
            _id: { $ne: id }, // Exclude current banner
            order: orderToCheck,
            position: positionToCheck
        });

        if (existingOrder) {
            throw APIError.validation(`Cannot update: Order ${orderToCheck} is already assigned to another banner in ${positionToCheck}.`);
        }
    }

    if (data.title && data.title.length > 18) {
      throw APIError.validation('Title must be at most 18 characters');
    }

    if (data.subtitle && data.subtitle.length > 26) {
      throw APIError.validation('Subtitle must be at most 26 characters');
    }

    if (file) {
      await deleteFromCloudinary(banner.image.publicId);

      const uploaded = await uploadToCloudinary(file.buffer, 'banners');
      banner.image = {
        url: uploaded.secure_url,
        publicId: uploaded.public_id
      };
    }

    Object.assign(banner, data);
    await banner.save();

    return {
      success: true,
      statusCode: 200,
      message: 'Banner updated successfully',
      data: { banner }
    };
  }

  /* ---------- DELETE ---------- */
  async deleteBanner(id) {
    const banner = await Banner.findById(id);
    if (!banner) throw APIError.notFound('Banner not found');

    await deleteFromCloudinary(banner.image.publicId);
    await banner.deleteOne();

    return {
      success: true,
      statusCode: 200,
      message: 'Banner deleted successfully'
    };
  }
}

export const bannerService = new BannerService();
