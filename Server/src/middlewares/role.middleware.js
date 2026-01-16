export const roleMiddleware = (allowedRoles = []) => {
  return (req, res, next) => {
    try {
      console.log('🔑 Role middleware triggered');

      if (!req.user) {
        console.log('⚠️ User not found in request');
        return res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
      }

      const { role } = req.user;

      if (!allowedRoles.includes(role)) {
        console.log(` Access denied for role: ${role}`);
        return res.status(403).json({
          success: false,
          message: 'Forbidden: insufficient permissions'
        });
      }

      console.log(` Role authorized: ${role}`);
      next();

    } catch (error) {
      console.error(' Role middleware error:', error.message);
      return res.status(500).json({
        success: false,
        message: 'Role verification failed'
      });
    }
  };
};
