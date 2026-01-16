import express from 'express';
import {
  adminLoginController,
  customerSignupController,
  customerLoginController
} from './auth.controller.js';

const router = express.Router();

export default (app) => {
  // AUTH ROUTES
  router.post('/admin/login', adminLoginController);
  router.post('/customer/signup', customerSignupController);
  router.post('/customer/login', customerLoginController);

  // 🔥 FIX IS HERE
  app.use('/api/v1/auth', router);
};
