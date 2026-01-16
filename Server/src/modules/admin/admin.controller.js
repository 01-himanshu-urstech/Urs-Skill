import { adminService } from './admin.service.js';

export const createAdminController = async (req, res, next) => {
  try {
    const result = await adminService.createAdmin(req.body, {
      userId: req.user.adminId,
      role: req.user.role
    });
    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};

export const getMyProfileController = async (req, res, next) => {
  try {
    // req.user is set by authMiddleware
    const result = await adminService.getMyProfile(req.user.adminId);
    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};


export const getAdminsController = async (req, res, next) => {
  try {
    const result = await adminService.getAdmins();
    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};


export const getAdminByIdController = async (req, res, next) => {
  try {
    const { adminId } = req.params;

    const result = await adminService.getAdminById(adminId);

    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateAdminController = async (req, res, next) => {
  try {
    const result = await adminService.updateAdmin(req.params.id, req.body, {
      userId: req.user.adminId,
      role: req.user.role
    });
    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteAdminController = async (req, res, next) => {
  try {
    const result = await adminService.deleteAdmin(req.params.id,{
      userId: req.user.adminId,
      role: req.user.role
    });
    res.status(result.statusCode).json(result);
  } catch (error) {
    next(error);
  }
};
