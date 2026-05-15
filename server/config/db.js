/**
 * MongoDB Database Connection
 * Handles connection with retry logic and event monitoring
 */
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined. Please set it in your .env file.');
    }

    console.log('🔌 Connecting to MongoDB Atlas...');
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB Atlas connected successfully: ${conn.connection.host}/${conn.connection.name}`);

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
      console.error('❌ Exiting due to database connection failure.');
      process.exit(1);
    }
    console.warn('⚠️  Falling back: server will start without MongoDB in development.');
    return null;
  }
};

export default connectDB;
