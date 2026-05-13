/**
 * Server Entry Point
 * Loads environment, connects to DB, starts Express server
 */
import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import connectDB from './config/db.js';
import validateEnv from './config/env.js';
import configureCloudinary from './config/cloudinary.js';

// Validate environment variables
validateEnv();

// Configure Cloudinary
configureCloudinary();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start Express server
    app.listen(PORT, () => {
      console.log(`\n🌱 AgroCare AI Server running on port ${PORT}`);
      console.log(`📡 API: http://localhost:${PORT}/api/health`);
      console.log(`🔧 Environment: ${process.env.NODE_ENV}\n`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    // Start server without DB in development for frontend testing
    if (process.env.NODE_ENV !== 'production') {
      console.log('⚠️  Starting server without database connection...');
      app.listen(PORT, () => {
        console.log(`\n🌱 AgroCare AI Server running on port ${PORT} (No DB)`);
      });
    }
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`❌ Unhandled Rejection: ${err.message}`);
});

startServer();
