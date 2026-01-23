import express from 'express';
import {
  adminLoginController,
  customerSignupController,
  customerLoginController,
  logoutController,
  resendEmailOTPController,
  verifyEmailOTPController,
  forgotPasswordRequestController,
  resetPasswordController
} from './auth.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';

const router = express.Router();

export default (app) => {
  // AUTH ROUTES
  router.post('/admin/login', adminLoginController);
  router.post('/customer/signup', customerSignupController);
  router.post('/customer/login', customerLoginController);
  router.post('/verify-email-otp', verifyEmailOTPController);
  router.post('/resend-email-otp', resendEmailOTPController);

  router.post('/forgot-password-request', forgotPasswordRequestController);
  router.post('/reset-password', resetPasswordController);
    
  router.post(
    '/logout',
    authMiddleware,
    logoutController
  );

  // 🔥 FIX IS HERE
  app.use('/api/v1/auth', router);
};
