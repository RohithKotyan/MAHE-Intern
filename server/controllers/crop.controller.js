import mongoose from 'mongoose';
import Crop from '../models/Crop.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';

/**
 * @desc    Create a new crop
 * @route   POST /api/crops
 * @access  Private
 */
export const createCrop = asyncHandler(async (req, res) => {
  const cropData = {
    ...req.body,
    owner: req.user.id,
  };

  const crop = await Crop.create(cropData);

  res.status(201).json({
    success: true,
    data: crop,
  });
});

/**
 * @desc    Get all crops for logged-in user
 * @route   GET /api/crops
 * @access  Private
 */
export const getCrops = asyncHandler(async (req, res) => {
  const { 
    page = 1, 
    limit = 10, 
    q, 
    status, 
    location,
    isArchived = 'false',
    sortBy = '-createdAt'
  } = req.query;

  const query = { owner: req.user.id };

  // Filtering
  if (isArchived === 'true') {
    query.isArchived = true;
  } else {
    query.isArchived = false;
  }

  if (status) query.status = status;
  if (location) query.location = location;

  // Regex Search on name and species
  if (q) {
    query.$or = [
      { name: { $regex: q, $options: 'i' } },
      { species: { $regex: q, $options: 'i' } }
    ];
  }

  // Pagination
  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const skip = (pageNum - 1) * limitNum;

  // Sorting mapping
  const sortOptions = {};
  if (sortBy.startsWith('-')) {
    sortOptions[sortBy.substring(1)] = -1;
  } else {
    sortOptions[sortBy] = 1;
  }

  const crops = await Crop.find(query)
    .sort(sortOptions)
    .skip(skip)
    .limit(limitNum);

  const total = await Crop.countDocuments(query);

  res.status(200).json({
    success: true,
    count: crops.length,
    pagination: {
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
    },
    data: crops,
  });
});

/**
 * @desc    Get dashboard statistics for user's crops
 * @route   GET /api/crops/stats
 * @access  Private
 */
export const getCropStats = asyncHandler(async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.user.id);
  const now = new Date();

  const stats = await Crop.aggregate([
    { $match: { owner: userId, isArchived: false } },
    {
      $group: {
        _id: null,
        totalCrops: { $sum: 1 },
        healthy: { 
          $sum: { $cond: [{ $eq: ["$healthStatus", "Excellent"] }, 1, { $cond: [{ $eq: ["$healthStatus", "Good"] }, 1, 0] }] } 
        },
        warning: { 
          $sum: { $cond: [{ $eq: ["$healthStatus", "Warning"] }, 1, 0] } 
        },
        critical: { 
          $sum: { $cond: [{ $eq: ["$healthStatus", "Critical"] }, 1, 0] } 
        },
        needsWater: { 
          $sum: { $cond: [{ $lte: ["$nextWateringAt", now] }, 1, 0] } 
        },
        totalHealthScore: { $sum: "$healthScore" }
      }
    }
  ]);

  const result = stats.length > 0 ? {
    totalCrops: stats[0].totalCrops,
    healthy: stats[0].healthy,
    warning: stats[0].warning,
    critical: stats[0].critical,
    needsWater: stats[0].needsWater,
    averageHealth: Math.round(stats[0].totalHealthScore / stats[0].totalCrops),
  } : {
    totalCrops: 0,
    healthy: 0,
    warning: 0,
    critical: 0,
    needsWater: 0,
    averageHealth: 0,
  };

  res.status(200).json({
    success: true,
    data: result,
  });
});

/**
 * @desc    Get single crop by ID
 * @route   GET /api/crops/:id
 * @access  Private
 */
export const getCropById = asyncHandler(async (req, res) => {
  const crop = await Crop.findOne({ _id: req.params.id, owner: req.user.id });

  if (!crop) {
    throw new ApiError(404, 'Crop not found or unauthorized');
  }

  res.status(200).json({
    success: true,
    data: crop,
  });
});

/**
 * @desc    Update crop
 * @route   PUT /api/crops/:id
 * @access  Private
 */
export const updateCrop = asyncHandler(async (req, res) => {
  let crop = await Crop.findOne({ _id: req.params.id, owner: req.user.id });

  if (!crop) {
    throw new ApiError(404, 'Crop not found or unauthorized');
  }

  const { healthScore, diseaseDetected } = req.body;

  // Check for notification triggers before saving
  if (healthScore !== undefined && healthScore < 40 && crop.healthScore >= 40) {
    // TODO: triggerCropAlert('CRITICAL_HEALTH', crop._id)
  }

  if (diseaseDetected === true && !crop.diseaseDetected) {
    // TODO: triggerCropAlert('DISEASE_DETECTED', crop._id)
  }

  // Whitelist allowed update fields to prevent owner/id hijacking
  const allowedFields = [
    'name', 'species', 'location', 'healthScore', 'healthStatus',
    'status', 'growthStage', 'diseaseDetected', 'currentDisease',
    'diseaseSeverity', 'wateringFrequency', 'imageUrl', 'notes',
    'plantedAt', 'lastScanAt', 'scanCount',
  ];
  const sanitized = {};
  allowedFields.forEach(field => {
    if (req.body[field] !== undefined) sanitized[field] = req.body[field];
  });
  Object.assign(crop, sanitized);
  await crop.save();

  res.status(200).json({
    success: true,
    data: crop,
  });
});

/**
 * @desc    Log watering for a crop
 * @route   POST /api/crops/:id/water
 * @access  Private
 */
export const logWater = asyncHandler(async (req, res) => {
  const crop = await Crop.findOne({ _id: req.params.id, owner: req.user.id });

  if (!crop) {
    throw new ApiError(404, 'Crop not found or unauthorized');
  }

  const now = new Date();
  
  // Check if watering was overdue
  if (crop.nextWateringAt && crop.nextWateringAt < now) {
    // TODO: triggerCropAlert('WATERING_OVERDUE', crop._id)
  }

  crop.lastWateredAt = now;
  // nextWateringAt will be auto-calculated by the pre-save hook
  
  await crop.save();

  res.status(200).json({
    success: true,
    message: 'Watering logged successfully',
    data: crop,
  });
});

/**
 * @desc    Archive a crop
 * @route   POST /api/crops/:id/archive
 * @access  Private
 */
export const archiveCrop = asyncHandler(async (req, res) => {
  const crop = await Crop.findOne({ _id: req.params.id, owner: req.user.id });

  if (!crop) {
    throw new ApiError(404, 'Crop not found or unauthorized');
  }

  crop.isArchived = true;
  await crop.save();

  res.status(200).json({
    success: true,
    message: 'Crop archived successfully',
    data: crop,
  });
});

/**
 * @desc    Restore an archived crop
 * @route   POST /api/crops/:id/restore
 * @access  Private
 */
export const restoreCrop = asyncHandler(async (req, res) => {
  const crop = await Crop.findOne({ _id: req.params.id, owner: req.user.id });

  if (!crop) {
    throw new ApiError(404, 'Crop not found or unauthorized');
  }

  crop.isArchived = false;
  await crop.save();

  res.status(200).json({
    success: true,
    message: 'Crop restored successfully',
    data: crop,
  });
});

/**
 * @desc    Delete crop completely (Hard delete)
 * @route   DELETE /api/crops/:id
 * @access  Private
 */
export const deleteCrop = asyncHandler(async (req, res) => {
  const crop = await Crop.findOneAndDelete({ _id: req.params.id, owner: req.user.id });

  if (!crop) {
    throw new ApiError(404, 'Crop not found or unauthorized');
  }

  res.status(200).json({
    success: true,
    message: 'Crop deleted permanently',
  });
});
