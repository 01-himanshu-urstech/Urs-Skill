import express from 'express';
import cors from 'cors';
import { logger } from './utils/logger.js';
import { loadRoutes } from './utils/loadRoutes.js';
import { errorMiddleware as errorMiddleware } from './middlewares/error.middleware.js';


const app = express();

try {
  console.log('⚙️ Initializing app middlewares...');

  // CORS
  app.use(
    cors({
      origin: process.env.FRONTEND_URL || true,
      credentials: true
    })
  );

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));

  // Custom logger
  app.use(logger);

  console.log(' Middlewares initialized');

  // // Load routes dynamically
  // const loadDynamicRoutes = async () => {
  //   try {
  //     console.log('📦 Loading routes dynamically...');
  //     await loadRoutes(app);
  //     console.log(' Routes loaded successfully');
  //   } catch (error) {
  //     console.error(' Error loading routes:', error.message);
  //   }
  // };

  //  loadDynamicRoutes();

  await loadRoutes(app);


} catch (error) {
  console.error(' App initialization failed:', error.message);
}

// Health check
app.get('/api/v1', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Urs Skill server' });
});

app.use(errorMiddleware);


export default app;