import mongoose from 'mongoose';
import { config } from '../config/config.js';
import { Admin } from '../modules/admin/admin.model.js';
import { hashPassword } from '../utils/password.js';

const createSuperAdmin = async () => {
  try {
    console.log('🚀 Starting SuperAdmin creation script...');

    // 1️⃣ Connect DB
    await mongoose.connect(config.DB_URI);
    console.log('✅ MongoDB connected');

    const email = 'Superadmin@ursskill.com';
    const password = 'Admin@123'; // change after first login

    // 2️⃣ Check if superadmin exists
    const existing = await Admin.findOne({ email });
    if (existing) {
      console.log('⚠️ SuperAdmin already exists:', existing.email);
      process.exit(0);
    }

    // 3️⃣ Hash password
    const hashedPassword = await hashPassword(password);

    // 4️⃣ Create SuperAdmin
    const admin = await Admin.create({
      name: 'Super Admin',
      email:'Superadmin@ursskill.com',
      password: hashedPassword,
      role: 'SUPERADMIN',
      permissions: ['ALL']
    });

    console.log('✅ SuperAdmin created successfully');
    console.log({
      id: admin._id.toString(),
      email: admin.email,
      role: admin.role  
    });

    console.log('⚠️ IMPORTANT: Change password after first login');

    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to create SuperAdmin:', error.message);
    process.exit(1);
  }
};

createSuperAdmin();
