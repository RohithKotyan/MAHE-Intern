import express from 'express';
import {
  createCrop,
  getCrops,
  getCropStats,
  getCropById,
  updateCrop,
  deleteCrop,
  logWater,
  archiveCrop,
  restoreCrop,
} from '../controllers/crop.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// Apply auth middleware to all routes
router.use(protect);

// Aggregation route must be before /:id routes to avoid being treated as an ID
router.route('/stats').get(getCropStats);

// Standard REST routes
router.route('/')
  .post(createCrop)
  .get(getCrops);

router.route('/:id')
  .get(getCropById)
  .put(updateCrop)
  .delete(deleteCrop);

// Custom action routes
router.post('/:id/water', logWater);
router.post('/:id/archive', archiveCrop);
router.post('/:id/restore', restoreCrop);

export default router;
