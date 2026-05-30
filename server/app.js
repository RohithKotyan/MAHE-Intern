/**
 * Express Application Setup
 * Configures middleware, routes, and error handling
 */
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

// Route imports
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import scanRoutes from './routes/scan.routes.js';
import communityRoutes from './routes/community.routes.js';
import notificationRoutes from './routes/notification.routes.js';
import cropRoutes from './routes/crop.routes.js';

// Middleware imports
import errorHandler from './middleware/error.middleware.js';
import ApiError from './utils/ApiError.js';

const app = express();

// ─── Security & Parsing Middleware ───────────────────────────────
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ─── Logging (dev only) ──────────────────────────────────────────
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ─── Health Check ────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'AgroCare AI API is running',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// ─── API Routes ──────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/scans', scanRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/crops', cropRoutes);

// ─── 404 Handler ─────────────────────────────────────────────────
app.use((req, res, next) => {
  next(new ApiError(404, `Route ${req.originalUrl} not found`));
});

// ─── Global Error Handler ────────────────────────────────────────
app.use(errorHandler);

export default app;
