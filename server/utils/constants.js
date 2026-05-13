/**
 * Application Constants
 * Centralized constants used throughout the backend
 */

export const USER_ROLES = {
  FARMER: 'farmer',
  EXPERT: 'expert',
  ADMIN: 'admin',
};

export const SCAN_STATUS = {
  PENDING: 'pending',
  ANALYZING: 'analyzing',
  COMPLETED: 'completed',
  FAILED: 'failed',
};

export const POST_CATEGORIES = {
  QUESTION: 'question',
  DISCUSSION: 'discussion',
  TIP: 'tip',
  SHOWCASE: 'showcase',
  ALERT: 'alert',
};

export const NOTIFICATION_TYPES = {
  SCAN_COMPLETE: 'scan_complete',
  COMMENT: 'comment',
  LIKE: 'like',
  FOLLOW: 'follow',
  SYSTEM: 'system',
  ALERT: 'alert',
};

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 50,
};
