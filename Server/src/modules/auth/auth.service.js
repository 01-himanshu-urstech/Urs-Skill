import { Admin } from '../admin/admin.model.js';
import { Customer } from '../customer/customer.model.js';
import APIError from '../../utils/apiError.js';
import { hashPassword, comparePassword } from '../../utils/password.js';
import { generateToken } from '../../utils/jwt.js';
import { generateOTP } from '../../utils/otp.js';
import { sendEmail } from '../../utils/mailer.js';


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
    if (!email || !phone || !password) {
      throw APIError.validation('All fields are required');
    }

    const existingCustomer = await Customer.findOne({
      $or: [{ email }, { phone }]
    });

    if (existingCustomer) {
      throw APIError.conflict('Customer already exists');
    }

    const hashedPassword = await hashPassword(password);
    const { otp, expires } = generateOTP();

    const customer = await Customer.create({
      name,
      email,
      phone,
      password: hashedPassword,
      createdBy: 'SELF',
      isEmailVerified: false,
      emailOTP: otp,
      emailOTPExpires: expires
    });

    try {
await sendEmail({
  to: email,
  subject: 'Your Urs Skill Email Verification Code',
      html: `
        <div style="max-width: 520px; margin: 0 auto; font-family: Arial, sans-serif; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #eaeaea;">
          
          <!-- Header -->
          <div style="background: #6d28d9; padding: 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 22px;">
              Urs Skill
            </h1>
          </div>

          <!-- Body -->
          <div style="padding: 24px; color: #333333;">
            <p style="font-size: 16px; margin-bottom: 12px;">
              Hello 👋,
            </p>

            <p style="font-size: 15px; margin-bottom: 20px;">
              Use the following One-Time Password (OTP) to verify your email address.
            </p>

            <!-- OTP Box -->
            <div style="background: #f3f4f6; padding: 16px; text-align: center; border-radius: 6px; margin-bottom: 20px;">
              <span style="font-size: 32px; letter-spacing: 6px; font-weight: bold; color: #111827;">
                ${otp}
              </span>
            </div>

            <p style="font-size: 14px; color: #555555;">
              This OTP is valid for <strong>5 minutes</strong>.
            </p>

            <p style="font-size: 14px; color: #555555;">
              If you didn’t request this, you can safely ignore this email.
            </p>

            <p style="margin-top: 30px; font-size: 14px;">
              Regards,<br/>
              <strong>Urs Skill Team</strong>
            </p>
          </div>

          <!-- Footer -->
          <div style="background: #f9fafb; padding: 12px; text-align: center; font-size: 12px; color: #6b7280;">
            © ${new Date().getFullYear()} Urs Skill. All rights reserved.
          </div>
        </div>
      `
    });

    } catch (mailError) {
      await Customer.findByIdAndDelete(customer._id);
      throw APIError.internal('Account could not be created because the verification email failed to send.');
    }

    return {
      success: true,
      statusCode: 201,
      message: 'OTP sent to your email'
    };
  }

  async verifyEmailOTP({ email, otp }) {
    if (!email || !otp) {
      throw APIError.validation('Email and OTP are required');
    }

    const customer = await Customer.findOne({
      email,
      createdBy: 'SELF',
      emailOTP: otp,
      emailOTPExpires: { $gt: Date.now() }
    });

    if (!customer) {
      throw APIError.badRequest('Invalid or expired OTP');
    }

    customer.isEmailVerified = true;
    customer.emailOTP = undefined;
    customer.emailOTPExpires = undefined;

    await customer.save();

    return {
      success: true,
      statusCode: 200,
      message: 'Email verified successfully'
    };
  }

  async resendEmailOTP({ email }) {
  if (!email) {
    throw APIError.validation('Email is required');
  }

  const customer = await Customer.findOne({
    email,
    createdBy: 'SELF',
    isEmailVerified: false
  });

  if (!customer) {
    throw APIError.notFound('Customer not found or already verified');
  }

  const { otp, expires } = generateOTP();

  customer.emailOTP = otp;
  customer.emailOTPExpires = expires;
  await customer.save();

  await sendEmail({
    to: email,
    subject: 'Your Urs Skill OTP (Resend)',
    html: `
      <h2>Email Verification</h2>
      <p>Your new OTP:</p>
      <h1>${otp}</h1>
      <p>Valid for 5 minutes</p>
    `
  });

  return {
    success: true,
    statusCode: 200,
    message: 'OTP resent successfully'
  };
}

/* ================= FORGOT PASSWORD ================= */

async forgotPasswordRequest({ email }) {
  if (!email) throw APIError.validation('Email is required');

  const customer = await Customer.findOne({ email });
  // For security, don't confirm if user exists, but here we'll assume standard flow
  if (!customer) throw APIError.notFound('Customer not found');

  const { otp, expires } = generateOTP();
  
  customer.forgotPasswordOTP = otp;
  customer.forgotPasswordOTPExpires = expires;
  await customer.save();

  await sendEmail({
    to: email,
    subject: 'Password Reset OTP - Urs Skill',
    html: `
      <div style="font-family: Arial; padding: 20px; border: 1px solid #eee;">
        <h2>Password Reset Request</h2>
        <p>Use the OTP below to reset your password. This is valid for 5 minutes.</p>
        <h1 style="color: #6d28d9;">${otp}</h1>
      </div>
    `
  });

  return {
    success: true,
    statusCode: 200,
    message: 'Password reset OTP sent to email'
  };
}

async resetPassword({ email, otp, newPassword }) {
  if (!email || !otp || !newPassword) {
    throw APIError.validation('Email, OTP, and new password are required');
  }

  const customer = await Customer.findOne({
    email,
    forgotPasswordOTP: otp,
    forgotPasswordOTPExpires: { $gt: Date.now() }
  });

  if (!customer) {
    throw APIError.badRequest('Invalid or expired OTP');
  }

  // Hash new password and clear OTP fields
  customer.password = await hashPassword(newPassword);
  customer.forgotPasswordOTP = undefined;
  customer.forgotPasswordOTPExpires = undefined;
  
  await customer.save();

  return {
    success: true,
    statusCode: 200,
    message: 'Password has been reset successfully'
  };
}


  /* ================= CUSTOMER LOGIN ================= */

  async login({ email, password }) {
    console.log(' Customer login attempt:', email);

    if (!email || !password) {
      throw APIError.validation('Email and password are required');
    }

    const customer = await Customer.findOne({ email });
    if (!customer) {
      throw APIError.unauthorized('Invalid credentials');
    }
    if (
      customer.createdBy === 'SELF' &&
      !customer.isEmailVerified
    ) {
      throw APIError.forbidden('Please verify your email using OTP');
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

    console.log(' Customer logged in:', customer._id);

    return {
      success: true,
      statusCode: 200,
      message: 'Customer login successful',
      data: { token }
    };
  }

}

export const authService = new AuthService();
