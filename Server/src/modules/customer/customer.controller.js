import { customerService } from './customer.service.js';

export const createCustomerController = async (req, res, next) => {
  try {
    const result = await customerService.createCustomer(req.body,  
    {
    userId: req.user.adminId,
    role: req.user.role
    });
    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};

export const getCustomersController = async (req, res, next) => {
  try {
    const result = await customerService.getCustomers();
    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};

export const getCustomerByIdController = async (req, res, next) => {
  try {
    const result = await customerService.getCustomerById(
      req.params.customerId
    );
    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};


export const updateCustomerController = async (req, res, next) => {
  try {
    const result = await customerService.updateCustomer(
      req.params.customerId,
      req.body,{
        userId: req.user.adminId,
        role: req.user.role
      }
    );
    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteCustomerController = async (req, res, next) => {
  try {
    const result = await customerService.deleteCustomer(req.params.customerId, {
      userId: req.user.adminId,
      role: req.user.role
    });
    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};
