import { Banner } from './banner.model.js';
import APIError from '../../utils/apiError.js';

class BannerService {
  /* ---------- CREATE ---------- */
  async createBanner(data, adminId) {
    console.log('🖼️ BannerService: createBanner');

    if (!data.image) {
      throw APIError.validation('Banner image is required');
    }

    const banner = await Banner.create({
      ...data,
      createdBy: adminId
    });

    console.log(' Banner created:', banner._id);

    return {
      success: true,
      statusCode: 201,
      message: 'Banner created successfully',
      data: { banner }
    };
  }

  /* ---------- LIST ---------- */
  async getBanners({ position, isActive }) {
    console.log(' BannerService: getBanners');

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
  console.log(' BannerService: getBannerById', id);

  const banner = await Banner.findById(id);
  if (!banner) {
    throw APIError.notFound('Banner not found');
  }

  return {
    success: true,
    statusCode: 200,
    data: { banner }
  };
}


  /* ---------- UPDATE ---------- */
  async updateBanner(id, data) {
    console.log(' BannerService: updateBanner', id);

    const banner = await Banner.findById(id);
    if (!banner) {
      throw APIError.notFound('Banner not found');
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
    console.log(' BannerService: deleteBanner', id);

    const banner = await Banner.findById(id);
    if (!banner) {
      throw APIError.notFound('Banner not found');
    }

    await banner.deleteOne();

    return {
      success: true,
      statusCode: 200,
      message: 'Banner deleted successfully'
    };
  }
}

export const bannerService = new BannerService();
