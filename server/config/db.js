/**
 * MongoDB Database Connection
 * Handles connection with retry logic and event monitoring
 */
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // Modern Mongoose 8.x doesn't need most options — they're defaults now
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    // Connection event listeners for monitoring
    mongoose.connection.on('error', (err) => {
      console.error(`❌ MongoDB connection error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB disconnected. Attempting reconnection...');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('✅ MongoDB reconnected successfully');
    });

    return conn;
  } catch (error) {
    console.error(`❌ MongoDB connection failed: ${error.message}`);
    // Exit process with failure in production, continue in development
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
    // In development, don't throw — allow server to start without DB
    console.warn('⚠️  Continuing without database connection...');
    return null;
  }
};

export default connectDB;
