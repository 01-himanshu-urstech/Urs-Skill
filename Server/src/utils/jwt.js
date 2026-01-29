import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';

export const generateToken = (payload) => {
  try {
    console.log(' Generating JWT token');

    if (!config.JWT_ACCESS_SECRET) {
      throw new Error('JWT_ACCESS_SECRET is not defined');
    }

    return jwt.sign(payload, config.JWT_ACCESS_SECRET, {
      expiresIn: config.JWT_ACCESS_EXPIRES_IN || '7d'
    });
  } catch (error) {
    console.error(' Token generation failed:', error.message);
    throw error;
  }
};

export const verifyToken = (token) => {
  try {
    console.log(' Verifying JWT token');

    if (!config.JWT_ACCESS_SECRET) {
      throw new Error('JWT_ACCESS_SECRET is not defined');
    }

    return jwt.verify(token, config.JWT_ACCESS_SECRET);
  } catch (error) {
    console.error(' Token verification failed:', error.message);
    throw error;
  }
};
