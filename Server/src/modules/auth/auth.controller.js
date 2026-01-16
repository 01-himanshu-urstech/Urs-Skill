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

export const customerLoginController = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};
