import mongoose from 'mongoose';
import { config } from './config.js';

const connectDB = async () => {
  try {
    console.log(' Connecting to MongoDB...');

    const conn = await mongoose.connect(config.DB_URI, {
      autoIndex: true
    });

    console.log(
      ` MongoDB connected: ${conn.connection.host}/${conn.connection.name}`
    );

  } catch (error) {
    console.error(' MongoDB connection failed:', error.message);
    process.exit(1); // stop app if DB fails
  }
};

export default connectDB;
