import { Admin } from '../admin/admin.model.js';
import { Customer } from '../customer/customer.model.js';
import APIError from '../../utils/apiError.js';
import { hashPassword, comparePassword } from '../../utils/password.js';
import { generateToken } from '../../utils/jwt.js';

class AuthService {
  /* ================= ADMIN LOGIN ================= */

  async adminLogin({ email, password }) {
    console.log('🔐 Admin login attempt:', email);

    if (!email || !password) {
      throw APIError.validation('Email and password required');
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      throw APIError.unauthorized('Invalid credentials');
    }

    const isMatch = await comparePassword(password, admin.password);
    if (!isMatch) {
      throw APIError.unauthorized('Invalid credentials');
    }

    const token = generateToken({
      adminId: admin._id,
      role: admin.role,
      email: admin.email
    });

    console.log('✅ Admin logged in:', admin._id);

    return {
        success: true,
        statusCode: 200,
        message: 'Admin login successful',
        data: { 
            token,
            user: {
                _id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
                permissions: admin.permissions // Crucial for your Sidebar filter
            }
          }
        }
  }

  /* ================= CUSTOMER SIGNUP ================= */

  async signup({ name, email, phone, password }) {
    console.log('👤 Customer signup attempt:', phone);

    if (!phone || !password) {
      throw APIError.validation('Phone and password are required');
    }

    const existingCustomer = await Customer.findOne({ phone });
    if (existingCustomer) {
      throw APIError.conflict('Customer already exists');
    }

    const hashedPassword = await hashPassword(password);

    const customer = await Customer.create({
      name,
      email,
      phone,
      password: hashedPassword
    });

    console.log('✅ Customer registered:', customer._id);

    return {
      success: true,
      statusCode: 201,
      message: 'Customer registered successfully'
    };
  }

  /* ================= CUSTOMER LOGIN ================= */

async login({ email, password }) {
  console.log('👤 Customer login attempt:', email);

  if (!email || !password) {
    throw APIError.validation('Email and password are required');
  }

  const customer = await Customer.findOne({ email });
  if (!customer) {
    throw APIError.unauthorized('Invalid credentials');
  }

  const isMatch = await comparePassword(password, customer.password);
  if (!isMatch) {
    throw APIError.unauthorized('Invalid credentials');
  }

  const token = generateToken({
    customerId: customer._id,
    role: 'CUSTOMER',
    email: customer.email
  });

  console.log('✅ Customer logged in:', customer._id);

  return {
    success: true,
    statusCode: 200,
    message: 'Customer login successful',
    data: { token }
  };
}

}

export const authService = new AuthService();
