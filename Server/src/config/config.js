import { config as loadEnv } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env once from project root
loadEnv({
  path: path.resolve(__dirname, '../../.env'),
  quiet: true
});

const _config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: Number(process.env.PORT) || 5000,
  SERVER_URL: process.env.SERVER_URL || 'http://localhost:5000',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
  DB_URI:
    process.env.DB_URI ||
    `mongodb://127.0.0.1:27017/${process.env.DB_NAME || 'ursskill'}`,

  JWT_ACCESS_SECRET:
    process.env.JWT_ACCESS_SECRET,
  JWT_ACCESS_EXPIRES_IN:
    process.env.JWT_ACCESS_EXPIRES_IN || '7d',
  ENABLE_LOGS: process.env.ENABLE_LOGS !== 'false',

  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || '',
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || '',
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || ''
};

console.log('🔐 JWT SECRET LOADED:', _config.JWT_ACCESS_SECRET);

export const config = Object.freeze(_config);
