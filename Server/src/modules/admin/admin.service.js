import { Admin } from './admin.model.js';
import APIError from '../../utils/apiError.js';
import { hashPassword } from '../../utils/password.js';
import { activityLogService } from '../logs/activityLog.service.js';

class AdminService {
  /* ---------------- CREATE ---------------- */
async createAdmin(data,performedBy) {
  console.log('👑 AdminService: createAdmin');

  const { name, email, password, role, permissions } = data;

  if (!email || !password) {
    throw APIError.validation('Email and password required');
  }

  const exists = await Admin.findOne({ email });
  if (exists) {
    throw APIError.conflict('Admin already exists');
  }

  const hashedPassword = await hashPassword(password);

  const admin = await Admin.create({
    name,
    email,
    password: hashedPassword,
    role,
    permissions
  });

  await activityLogService.log({
    action: 'CREATE_ADMIN',
    performedBy: {
      userId: performedBy.userId,
      role: performedBy.role
    },
    target: {
      entity: 'ADMIN',
      entityId: admin._id
    },
    metadata: {
      email: admin.email,
      role: admin.role
    }
  });

  // ✅ REMOVE PASSWORD BEFORE RETURNING
  const adminObj = admin.toObject();
  delete adminObj.password;

  console.log('✅ Admin created:', admin._id);

  return {
    success: true,
    statusCode: 201,
    message: 'Admin created successfully',
    data: { admin: adminObj }
  };
}

async getMyProfile(adminId) {
  const admin = await Admin.findById(adminId).select('-password');

  if (!admin) {
    throw APIError.notFound('Admin not found');
  }

  return {
    success: true,
    statusCode: 200,
    data: { admin }
  };
}


  /* ---------------- LIST ---------------- */
  async getAdmins() {
    console.log('👑 AdminService: getAdmins');

    const admins = await Admin.find().select('-password');

    return {
      success: true,
      statusCode: 200,
      data: { admins }
    };
  }

  //----------get admin by id----------
  async getAdminById(adminId) {
  console.log('👑 AdminService: getAdminById', adminId);

  if (!adminId) {
    throw APIError.validation('Admin ID is required');
  }

  const admin = await Admin.findById(adminId).select('-password');

  if (!admin) {
    throw APIError.notFound('Admin not found');
  }

  return {
    success: true,
    statusCode: 200,
    message: 'Admin fetched successfully',
    data: { admin }
  };
}

  /* ---------------- UPDATE ---------------- */
  async updateAdmin(id, data,performedBy) {
    console.log('👑 AdminService: updateAdmin', id);

    const admin = await Admin.findById(id);
    if (!admin) {
      throw APIError.notFound('Admin not found');
    }

    Object.assign(admin, data);
    await admin.save();

    await activityLogService.log({
      action: 'UPDATE_ADMIN',
      performedBy,
      target: {
        entity: 'ADMIN',
        entityId: admin._id
      },
      metadata: data
    });

    return {
      success: true,
      statusCode: 200,
      message: 'Admin updated successfully',
      data: { admin }
    };
  }

  /* ---------------- DELETE ---------------- */
  async deleteAdmin(id,performedBy) {
    console.log('👑 AdminService: deleteAdmin', id);

    const admin = await Admin.findById(id);
    if (!admin) {
      throw APIError.notFound('Admin not found');
    }

    await admin.deleteOne();

    await activityLogService.log({
      action: 'DELETE_ADMIN',
      performedBy,
      target: {
        entity: 'ADMIN',
        entityId: admin._id
      }
    });

    return {
      success: true,
      statusCode: 200,
      message: 'Admin deleted successfully'
    };
  }
}

export const adminService = new AdminService();
