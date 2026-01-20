import { customerService } from './customer.service.js';

export const createCustomerController = async (req, res, next) => {
  try {
    // Change createCustomer to createCustomerByAdmin
    const result = await customerService.createCustomerByAdmin(req.body, {
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

export const updateOwnProfileController = async (req, res, next) => {
  try {
    // req.user.customerId comes from your authMiddleware
    const result = await customerService.updateOwnProfile(
      req.user.customerId, 
      req.body
    );
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
