import { verifyToken } from '../utils/jwt.js';

export const authMiddleware = (req, res, next) => {
  try {
    console.log('🛡️ Auth middleware triggered');

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('⚠️ Authorization header missing');
      return res.status(401).json({
        success: false,
        message: 'Authorization token required'
      });
    }

    const token = authHeader.split(' ')[1];

    const decoded = verifyToken(token);

    req.user = decoded;
    console.log(' Authenticated user:', decoded.email || decoded.id);

    next();
  } catch (error) {
    console.error(' Authentication failed:', error.message);
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};
