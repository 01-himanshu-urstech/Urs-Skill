import dotenv from 'dotenv';
import app from './src/app.js';
import connectDB from './src/config/db.js';

dotenv.config();

const startServer = async () => {
  try {
    console.log(' Starting server...');

    await connectDB();
    console.log(' Database connected successfully');

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error(' Server startup failed:', error.message);
    process.exit(1);
  }
};

startServer();
