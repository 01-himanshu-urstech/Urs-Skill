import { couponService } from './coupons.service.js';
import { updateCouponSchema } from './coupons.validation.js';

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

/* ---------------- GET COUPON BY ID ---------------- */
export const getCouponByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await couponService.getCouponById(id);

    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};


/* ---------------- UPDATE COUPON ---------------- */
export const updateCouponController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const admin = req.user;

    // ✅ VALIDATION HAPPENS HERE
    const { error, value } = updateCouponSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    const result = await couponService.updateCouponById(
      id,
      value, // ✅ use validated data
      {
        userId: admin.adminId,
        role: admin.role
      }
    );

    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};

/* ---------------- DELETE COUPON ---------------- */
export const deleteCouponController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const admin = req.user;

    const result = await couponService.deleteCouponById(
      id,
      {
        userId: admin.adminId,
        role: admin.role
      }
    );

    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};


/* ---------------- LIST COUPONS ---------------- */
/* ---------------- LIST COUPONS ---------------- */
export const getCouponsController = async (req, res, next) => {
  try {
    // Pass req.user (which contains adminId and role from your authMiddleware)
    const result = await couponService.getCoupons(req.user); 
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
