import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';

export const optionalAuthMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 🟢 Guest user
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    req.user = null;
    return next();
  }

  try {
    const token = authHeader.split(' ')[1];

    // ✅ USE SAME SECRET AS TOKEN GENERATION
    const decoded = jwt.verify(token, config.JWT_ACCESS_SECRET);

    // console.log('✅ Decoded JWT:', decoded);

    req.user = {
      ...(req.user || {}),
      ...decoded,
      customerId: decoded.customerId || null,
    };

    next();
  } catch (err) {
    console.log('❌ Optional auth failed:', err.message);
    req.user = null;
    next(); // allow guest flow
  }
};
