import { Customer } from '../customer/customer.model.js';
import APIError from '../../utils/apiError.js';
import {activityLogService} from '../logs/activityLog.service.js';
import { hashPassword, comparePassword } from '../../utils/password.js';



class CustomerService {
/* ---------------- CREATE BY ADMIN (Manual Password) ---------------- */

async createCustomerByAdmin(data, performedBy) {
  // 1. Destructure password from data
  const { name, email, phone, password } = data;

  // 2. Validation: Ensure Admin provided a password
  if (!password) {
    throw APIError.validation('Password is required for account creation');
  }

  // 3. Check if customer already exists
  const existingCustomer = await Customer.findOne({
    $or: [{ email }, { phone }]
  });

  if (existingCustomer) {
    throw APIError.conflict('Customer already exists');
  }

  // 4. Hash the password provided by the Admin
  const hashedPassword = await hashPassword(password);

  // 5. Create the customer record
  const customer = await Customer.create({
    name,
    email,
    phone,
    password: hashedPassword,
    createdBy: 'ADMIN',
    isEmailVerified: true // Set to true so user can login immediately
  });

  // 6. Log the activity
  await activityLogService.log({
    action: 'CREATE_CUSTOMER_BY_ADMIN',
    performedBy,
    target: { entity: 'CUSTOMER', entityId: customer._id }
  });

  return {
    success: true,
    statusCode: 201, // Fixes the undefined error
    message: 'Customer created successfully',
    data: { 
      customer: { 
        id: customer._id,
        name, 
        email, 
        phone 
      } 
    }
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

  // Add .select('+password') here so the frontend receives the hash
  const customer = await Customer.findById(customerId).select('+password');
  
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
/* ---------------- SELF UPDATE (For Customer) ---------------- */
async updateOwnProfile(customerId, data) {
  console.log('👤 CustomerService: updateOwnProfile', customerId);
// 1. Find the customer (Include password for comparison)
  const customer = await Customer.findById(customerId).select('+password');
  if (!customer) {
    throw APIError.notFound('Customer not found');
  }
  // 2. Destructure fields including passwords
  const { name, email, phone, oldPassword, newPassword } = data;
  // 3. Duplicate Checks (Keep existing logic)
  if (email || phone) {
    const existing = await Customer.findOne({
      _id: { $ne: customerId },
      $or: [
        ...(email ? [{ email }] : []),
        ...(phone ? [{ phone }] : [])
      ]
    });
    if (existing) {
      throw APIError.conflict('Email or Phone already in use');
    }
  }
  // 4. Update basic fields
  if (name) customer.name = name;
  if (email) customer.email = email;
  if (phone) customer.phone = phone;
  // 5. SECURE PASSWORD CHANGE LOGIC
  if (newPassword) {
    if (!oldPassword) {
      throw APIError.validation('Current password is required to set a new password');
    }

    // Verify old password matches hashed database password
    const isMatch = await comparePassword(oldPassword, customer.password);
    if (!isMatch) {
      throw APIError.unauthorized('Current password is incorrect');
    }

    customer.password = await hashPassword(newPassword);
  }
  // 6. Save and Log
  await customer.save();
  // 7. Log Activity
  await activityLogService.log({
    action: 'CUSTOMER_SELF_UPDATE',
    performedBy: { userId: customerId, role: 'CUSTOMER' },
    target: { entity: 'CUSTOMER', entityId: customerId },
    metadata: { fieldsUpdated: Object.keys(data).filter(k => k !== 'password') }
  });
  return {
    success: true,
    statusCode: 200,
    message: 'Profile updated successfully',
    data: {
      customer: {
        id: customer._id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone
      }
    }
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
