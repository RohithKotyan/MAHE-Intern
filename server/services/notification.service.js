import Notification from '../models/Notification.js';

/**
 * Creates a structured notification, applying deduplication logic if necessary.
 */
export const createNotification = async ({
  recipient,
  sender,
  type,
  entityType,
  entityId,
  groupKey = '',
  priority = 'low',
  metadata = {}
}) => {
  try {
    // Prevent self-notifications
    if (recipient.toString() === sender?.toString()) {
      return null;
    }

    // Deduplication Logic
    // If a notification with the same groupKey exists and is unread, we might skip creating a new one,
    // or update the existing one's updated_at timestamp.
    if (groupKey) {
      const existing = await Notification.findOne({
        recipient,
        groupKey,
        read: false,
        hidden: false
      });

      if (existing) {
        // If it's a 'like' from the same sender, prevent duplicate spam entirely
        if (existing.sender?.toString() === sender?.toString() && existing.type === type) {
          return existing;
        }

        // Otherwise, it might be a different sender in the same group (e.g., another person liked).
        // For now, we will create a new notification, but grouping logic on the frontend 
        // can aggregate notifications by groupKey.
      }
    }

    const notification = await Notification.create({
      recipient,
      sender,
      type,
      entityType,
      entityId,
      groupKey,
      priority,
      metadata,
    });

    return notification;
  } catch (error) {
    console.error('Error creating notification:', error);
    return null;
  }
};
