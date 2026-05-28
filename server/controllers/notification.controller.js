/**
 * Notification Controller
 */
import Notification from '../models/Notification.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getNotifications = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const query = { recipient: req.user.id, hidden: false };

  const [notifications, total, unreadCount] = await Promise.all([
    Notification.find(query)
      .sort('-createdAt')
      .skip(skip)
      .limit(limit)
      .populate('sender', 'name avatar role'),
    Notification.countDocuments(query),
    Notification.countDocuments({ recipient: req.user.id, hidden: false, read: false })
  ]);

  res.status(200).json({ 
    success: true, 
    data: { 
      notifications, 
      unreadCount,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    } 
  });
});

export const markAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);
  if (!notification) throw ApiError.notFound('Notification not found');
  if (notification.recipient.toString() !== req.user.id) throw ApiError.forbidden('Not authorized');

  notification.read = true;
  notification.seenAt = new Date();
  await notification.save();

  res.status(200).json({ success: true, message: 'Marked as read' });
});

export const markAllRead = asyncHandler(async (req, res) => {
  await Notification.updateMany(
    { recipient: req.user.id, read: false, hidden: false }, 
    { read: true, seenAt: new Date() }
  );
  res.status(200).json({ success: true, message: 'All notifications marked as read' });
});

export const deleteNotification = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);
  if (!notification) throw ApiError.notFound('Notification not found');
  if (notification.recipient.toString() !== req.user.id) throw ApiError.forbidden('Not authorized');

  // Soft delete for analytics and recovery
  notification.hidden = true;
  await notification.save();

  res.status(200).json({ success: true, message: 'Notification deleted' });
});
