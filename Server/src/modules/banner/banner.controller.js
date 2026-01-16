import { bannerService } from './banner.service.js';

/* CREATE */
export const createBannerController = async (req, res, next) => {
  try {
    const result = await bannerService.createBanner(
      req.body,
      req.user.adminId
    );
    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};

/* LIST */
export const getBannersController = async (req, res, next) => {
  try {
    const result = await bannerService.getBanners(req.query);
    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};

export const getBannerByIdController = async (req, res, next) => {
  try {
    const result = await bannerService.getBannerById(req.params.id);
    res.status(result.statusCode).json(result);
  } catch (err) {
    next(err);
  }
};



/* UPDATE */
export const updateBannerController = async (req, res, next) => {
  try {
    const result = await bannerService.updateBanner(
      req.params.id,
      req.body
    );
    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};

/* DELETE */
export const deleteBannerController = async (req, res, next) => {
  try {
    const result = await bannerService.deleteBanner(req.params.id);
    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};
