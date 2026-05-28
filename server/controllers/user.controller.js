/**
 * User Controller
 * Profile management, avatar upload, user listing
 */
import User from '../models/User.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../services/cloudinary.service.js';

// ─── Get user profile (Own) ────────────────────────────────────────────
// GET /api/users/profile
export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: { user },
  });
});

// ─── Get public user profile ────────────────────────────────────────────
// GET /api/users/:id/profile
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('name avatar bio location role rank createdAt stats specialization');
  if (!user) throw ApiError.notFound('User not found');
  
  // Also fetch their recent posts
  const mongoose = await import('mongoose');
  const CommunityPost = mongoose.model('CommunityPost');
  const recentPosts = await CommunityPost.find({ author: user._id })
    .sort('-createdAt')
    .limit(5)
    .populate('author', 'name avatar role rank');

  res.status(200).json({
    success: true,
    data: { user, recentPosts },
  });
});

// ─── Update user profile ────────────────────────────────────────
// PUT /api/users/profile
export const updateProfile = asyncHandler(async (req, res) => {
  const allowedFields = ['name', 'bio', 'location', 'phone', 'preferences'];
  const updates = {};

  // Only allow whitelisted fields
  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });

  const user = await User.findByIdAndUpdate(req.user.id, updates, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    data: { user },
  });
});

// ─── Upload/update avatar ────────────────────────────────────────
// PUT /api/users/avatar
export const updateAvatar = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw ApiError.badRequest('Please upload an image');
  }

  const user = await User.findById(req.user.id);

  // Delete old avatar from Cloudinary if exists
  if (user.avatar) {
    // Extract public ID from URL (basic approach)
    const oldPublicId = user.avatar.split('/').slice(-2).join('/').split('.')[0];
    await deleteFromCloudinary(oldPublicId);
  }

  // Upload new avatar
  const result = await uploadToCloudinary(req.file.buffer, 'avatars');

  user.avatar = result.url;
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: 'Avatar updated successfully',
    data: { avatar: result.url },
  });
});

// ─── Change password ─────────────────────────────────────────────
// PUT /api/users/change-password
export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user.id).select('+password');

  // Verify current password
  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    throw ApiError.unauthorized('Current password is incorrect');
  }

  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Password changed successfully',
  });
});

// ─── Get all users (Admin only) ──────────────────────────────────
// GET /api/users
export const getUsers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    User.find().skip(skip).limit(limit).sort('-createdAt'),
    User.countDocuments(),
  ]);

  res.status(200).json({
    success: true,
    data: {
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    },
  });
});
