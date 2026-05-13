/**
 * Scan Controller
 * Plant disease scan CRUD operations
 */
import PlantScan from '../models/PlantScan.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../services/cloudinary.service.js';

// ─── Create new scan ─────────────────────────────────────────────
// POST /api/scans
export const createScan = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw ApiError.badRequest('Please upload a plant image');
  }

  // Upload image to Cloudinary
  const result = await uploadToCloudinary(req.file.buffer, 'scans');

  const scan = await PlantScan.create({
    user: req.user.id,
    imageUrl: result.url,
    imagePublicId: result.publicId,
    plantName: req.body.plantName || 'Unknown',
    notes: req.body.notes || '',
    location: req.body.location || '',
    status: 'pending',
    // AI analysis will be triggered here in the future
    disease: {
      name: 'Pending Analysis',
      confidence: 0,
      description: 'Your scan is queued for AI analysis. Results will appear shortly.',
    },
  });

  // TODO: Trigger AI analysis service here
  // await aiService.analyzePlantImage(scan._id, result.url);

  res.status(201).json({
    success: true,
    message: 'Scan uploaded successfully. Analysis pending.',
    data: { scan },
  });
});

// ─── Get all scans for current user ──────────────────────────────
// GET /api/scans
export const getMyScans = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const status = req.query.status; // Optional filter

  const filter = { user: req.user.id };
  if (status) filter.status = status;

  const [scans, total] = await Promise.all([
    PlantScan.find(filter).skip(skip).limit(limit).sort('-createdAt'),
    PlantScan.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    data: {
      scans,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    },
  });
});

// ─── Get single scan by ID ───────────────────────────────────────
// GET /api/scans/:id
export const getScanById = asyncHandler(async (req, res) => {
  const scan = await PlantScan.findById(req.params.id).populate('user', 'name avatar');

  if (!scan) {
    throw ApiError.notFound('Scan not found');
  }

  // Ensure user owns the scan (or is admin)
  if (scan.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
    throw ApiError.forbidden('Not authorized to view this scan');
  }

  res.status(200).json({
    success: true,
    data: { scan },
  });
});

// ─── Delete scan ─────────────────────────────────────────────────
// DELETE /api/scans/:id
export const deleteScan = asyncHandler(async (req, res) => {
  const scan = await PlantScan.findById(req.params.id);

  if (!scan) {
    throw ApiError.notFound('Scan not found');
  }

  if (scan.user.toString() !== req.user.id && req.user.role !== 'admin') {
    throw ApiError.forbidden('Not authorized to delete this scan');
  }

  // Delete image from Cloudinary
  if (scan.imagePublicId) {
    await deleteFromCloudinary(scan.imagePublicId);
  }

  await scan.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Scan deleted successfully',
    data: null,
  });
});
