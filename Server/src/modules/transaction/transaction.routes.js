import express from 'express';
import {
  createTransactionController,
  transactionReturnController,
  getCustomerTransactionsController,
  getAllTransactionsController
} from './transaction.controller.js';

import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { roleMiddleware } from '../../middlewares/role.middleware.js';

const router = express.Router();

export default (app) => {

  /* CUSTOMER */
  router.post(
    '/create',
    authMiddleware,
    roleMiddleware(['CUSTOMER']),
    createTransactionController
  );

  router.get(
    '/return',
    transactionReturnController
  );

  router.get(
    '/my',
    authMiddleware,
    roleMiddleware(['CUSTOMER']),
    getCustomerTransactionsController
  );

  /* ADMIN */
  router.get(
    '/',
    authMiddleware,
    roleMiddleware(['SUPERADMIN']),
    getAllTransactionsController
  );

  app.use('/api/v1/transactions', router);
};
