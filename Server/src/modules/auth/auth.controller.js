import { authService } from './auth.service.js';

export const adminLoginController = async (req, res, next) => {
  try {
    const result = await authService.adminLogin(req.body);
    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};

export const customerSignupController = async (req, res, next) => {
  try {
    const result = await authService.signup(req.body);
    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};

export const verifyEmailOTPController = async (req, res, next) => {
  try {
    const result = await authService.verifyEmailOTP(req.body);
    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};


export const resendEmailOTPController = async (req, res, next) => {
  try {
    const result = await authService.resendEmailOTP(req.body);
    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};

export const customerLoginController = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};

export const forgotPasswordRequestController = async (req, res, next) => {
  try {
    const result = await authService.forgotPasswordRequest(req.body);
    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};

export const resetPasswordController = async (req, res, next) => {
  try {
    const result = await authService.resetPassword(req.body);
    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};

export const logoutController = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
};
