import { couponService } from './coupons.service.js';

/* ---------------- CREATE COUPON ---------------- */
export const createCouponController = async (req, res, next) => {
  try {
    const admin = req.user; // from authMiddleware
    console.log(req.user)
    const result = await couponService.createCoupon(req.body, admin,{
        userId: req.user.adminId,
        role: req.user.role
    });
    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};

/* ---------------- LIST COUPONS ---------------- */
export const getCouponsController = async (req, res, next) => {
  try {
    const result = await couponService.getCoupons();
    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};

/* ---------------- APPLY COUPON ---------------- */
export const applyCouponController = async (req, res, next) => {
  try {
    const customer =  {
        customerId: req.user.customerId,
        email: req.user.email
    }; // from authMiddleware
    const { code, cartAmount  } = req.body;

    const result = await couponService.applyCoupon({
      code,
      customer,
      cartAmount,
        subAdminId: req.user.role === 'SUBADMIN' ? req.user.adminId : null
    });

    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};
