import { Customer } from '../customer/customer.model.js';
import APIError from '../../utils/apiError.js';
import {activityLogService} from '../logs/activityLog.service.js';
import { hashPassword } from '../../utils/password.js';



class CustomerService {
  /* ---------------- CREATE ---------------- */
async createCustomer(data, performedBy) {
  const { phone, password } = data;

  if (!phone || !password) {
    throw APIError.validation('Phone and password are required');
  }

  const exists = await Customer.findOne({ phone });
  if (exists) {
    throw APIError.conflict('Customer already exists');
  }

  const hashedPassword = await hashPassword(password);

  const customer = await Customer.create({
    ...data,
    password: hashedPassword
  });

  await activityLogService.log({
    action: 'CREATE_CUSTOMER',
    performedBy,
    target: {
      entity: 'CUSTOMER',
      entityId: customer._id
    }
  });

  const customerObj = customer.toObject();
  delete customerObj.password;

  return {
    success: true,
    statusCode: 201,
    message: 'Customer created successfully',
    data: { customer: customerObj }
  };
}

  /* ---------------- LIST ---------------- */
  async getCustomers() {
    console.log('👤 CustomerService: getCustomers');

    const customers = await Customer.find();

    return {
      success: true,
      statusCode: 200,
      data: { customers }
    };
  }

  /* ---------------- GET BY ID ---------------- */
async getCustomerById(customerId) {
  console.log('👤 CustomerService: getCustomerById', customerId);

  if (!customerId) {
    throw APIError.validation('Customer ID is required');
  }

  const customer = await Customer.findById(customerId);
  if (!customer) {
    throw APIError.notFound('Customer not found');
  }

  return {
    success: true,
    statusCode: 200,
    message: 'Customer fetched successfully',
    data: { customer }
  };
}


  /* ---------------- UPDATE ---------------- */
  async updateCustomer(id, data,performedBy) {
    console.log('👤 CustomerService: updateCustomer', id);

    const customer = await Customer.findById(id);
    if (!customer) {
      throw APIError.notFound('Customer not found');
    }

    Object.assign(customer, data);
    await customer.save();

    await activityLogService.log({
      action: 'UPDATE_CUSTOMER',
      performedBy,
      target: {
        entity: 'CUSTOMER',
        entityId: customer._id
      },
      metadata: data
    });

    return {
      success: true,
      statusCode: 200,
      message: 'Customer updated successfully',
      data: { customer }
    };
  }

  /* ---------------- DELETE ---------------- */
  async deleteCustomer(id, performedBy) {
    console.log('👤 CustomerService: deleteCustomer', id);

    const customer = await Customer.findById(id);
    if (!customer) {
      throw APIError.notFound('Customer not found');
    }

    await customer.deleteOne();

    await activityLogService.log({
      action: 'DELETE_CUSTOMER',
      performedBy,
      target: {
        entity: 'CUSTOMER',
        entityId: customer._id
      }
    });

    return {
      success: true,
      statusCode: 200,
      message: 'Customer deleted successfully'
    };
  }
}



export const customerService = new CustomerService();
