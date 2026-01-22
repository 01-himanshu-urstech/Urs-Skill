import { transactionService } from './transaction.service.js';
import {config} from '../../config/config.js';

/* CREATE TRANSACTION */
export const createTransactionController = async (req, res, next) => {
  try {
    const result = await transactionService.createTransaction({
      customer: req.user,
      ...req.body
    });

    res.status(201).json({
      success: true,
      message: 'Transaction initiated',
      data: result
    });
  } catch (err) {
    next(err);
  }
};

/* CASHFREE RETURN URL */
/* backend/transaction.controller.js */
export const transactionReturnController = async (req, res, next) => {
  try {
    const { order_id } = req.query;
    console.log("Confirming payment for:", order_id); // LOG THIS

    const result = await transactionService.confirmPayment(order_id);

    return res.redirect(
      `${config.FRONTEND_URL}/payment/success?orderId=${order_id}`
    );
  } catch (err) {
    console.error("Payment Confirmation Error:", err.message); // LOG THE ERROR
    return res.redirect(
      `${process.env.FRONTEND_URL}/payment/failed`
    );
  }
};


/* CUSTOMER TRANSACTIONS */
export const getCustomerTransactionsController = async (req, res, next) => {
  try {
    const result = await transactionService.getCustomerTransactions(
      req.user.customerId
    );

    res.json({
      success: true,
      message: 'Transactions fetched',
      data: result
    });
  } catch (err) {
    next(err);
  }
};

/* ADMIN TRANSACTIONS */
export const getAllTransactionsController = async (req, res, next) => {
  try {
    const result = await transactionService.getAllTransactions(req.query);

    res.json({
      success: true,
      message: 'All transactions fetched',
      data: result
    });
  } catch (err) {
    next(err);
  }
};
