import jwt from 'jsonwebtoken';

export const optionalAuthMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    req.user = null;
    return next();
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔑 IMPORTANT: match your JWT payload
    req.user = {
      customerId: decoded.customerId,
      email: decoded.email,
    };

    next();
  } catch (err) {
    req.user = null;
    next(); // ❗ allow guest flow
  }
};
