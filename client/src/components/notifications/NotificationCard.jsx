import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useNotification } from '../../context/NotificationContext';

const formatTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export default function NotificationCard({ notification }) {
  const { _id, type, entityType, entityId, sender, priority, read, createdAt, metadata } = notification;
  const { markAsRead, deleteNotification } = useNotification();
  const navigate = useNavigate();

  // Define dynamic properties based on type
  let iconName = 'notifications';
  let title = 'New Notification';
  let message = '';
  let actionText = '';
  let actionLink = '#';

  const senderName = sender?.name || 'Someone';

  switch (type) {
    case 'like':
      iconName = 'favorite';
      title = 'New Like';
      message = `${senderName} liked your ${entityType}.`;
      actionText = 'View';
      actionLink = entityType === 'post' ? `/dashboard/community?post=${entityId}` : '#';
      break;
    case 'comment':
    case 'reply':
      iconName = 'forum';
      title = type === 'reply' ? 'New Reply' : 'New Comment';
      message = `${senderName} commented: "${metadata?.snippet || 'View comment...'}"`;
      actionText = 'Reply';
      actionLink = entityType === 'post' ? `/dashboard/community?post=${entityId}` : '#';
      break;
    case 'mention':
      iconName = 'alternate_email';
      title = 'You were mentioned';
      message = `${senderName} mentioned you in a ${entityType}.`;
      actionText = 'View';
      actionLink = `/dashboard/community?post=${entityId}`;
      break;
    case 'follow':
      iconName = 'person_add';
      title = 'New Follower';
      message = `${senderName} started following you.`;
      actionText = 'View Profile';
      actionLink = `/dashboard/user/${sender?._id}`;
      break;
    case 'system':
      iconName = 'info';
      title = metadata?.title || 'System Update';
      message = metadata?.message || 'Important system notification.';
      actionText = 'Learn More';
      actionLink = '#';
      break;
    case 'weather_alert':
      iconName = 'severe_cold';
      title = metadata?.title || 'Weather Alert';
      message = metadata?.message || 'Check your farm location for updates.';
      actionText = 'Check Forecast';
      actionLink = '#';
      break;
    case 'disease_alert':
    case 'crop_warning':
      iconName = 'coronavirus';
      title = metadata?.title || 'Crop Warning';
      message = metadata?.message || 'Attention required for your crops.';
      actionText = 'View Details';
      actionLink = `/dashboard/crops/${entityId}/treatment`;
      break;
    case 'ai_report':
      iconName = 'auto_awesome';
      title = metadata?.title || 'AI Insights Ready';
      message = metadata?.message || 'Your latest AI report has been generated.';
      actionText = 'View Report';
      actionLink = '/dashboard/reports';
      break;
    default:
      iconName = 'notifications';
      title = metadata?.title || 'Notification';
      message = metadata?.message || 'You have a new notification.';
  }

  // Determine styling based on Priority
  let priorityStyles = '';
  let iconColor = '';
  let glowEffect = '';

  switch (priority) {
    case 'critical':
      priorityStyles = 'border-error/50 bg-error/5';
      iconColor = 'text-error bg-error/10';
      glowEffect = 'shadow-[0_0_15px_rgba(239,68,68,0.15)]';
      break;
    case 'high':
      priorityStyles = 'border-warning/50 bg-warning/5';
      iconColor = 'text-warning bg-warning/10';
      glowEffect = 'shadow-[0_0_15px_rgba(245,158,11,0.1)]';
      break;
    case 'medium':
    case 'low':
    default:
      priorityStyles = 'border-primary/20 bg-surface-container/50';
      iconColor = 'text-primary bg-primary/10';
      glowEffect = '';
      break;
  }

  const handleCardClick = (e) => {
    // Ignore clicks on buttons
    if (e.target.closest('button') || e.target.closest('a')) return;
    
    if (!read) {
      markAsRead(_id);
    }
    if (actionLink && actionLink !== '#') {
      navigate(actionLink);
    }
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50 }}
      whileHover={{ scale: 1.01 }}
      onClick={handleCardClick}
      className={`glass-panel p-4 md:p-5 rounded-2xl border cursor-pointer ${read ? 'opacity-70 border-outline-variant/30 bg-surface-container/30' : priorityStyles} ${!read && glowEffect} transition-all duration-300 relative overflow-hidden group`}
    >
      
      {!read && (
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-current to-transparent opacity-50" style={{ color: priority === 'critical' ? '#ef4444' : priority === 'high' ? '#f59e0b' : '#10b981' }}></div>
      )}

      <div className="flex items-start gap-4">
        
        {/* Sender Avatar or Icon */}
        <div className="shrink-0 relative">
          {sender?.avatar ? (
            <img src={sender.avatar} alt={senderName} className="w-12 h-12 rounded-xl object-cover border border-outline-variant/30" />
          ) : (
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${read ? 'bg-surface-variant text-on-surface-variant' : iconColor}`}>
              <span className={`material-symbols-outlined text-[24px] ${type === 'like' && !read ? 'icon-fill' : ''}`}>{iconName}</span>
            </div>
          )}
          {/* Small badge icon if avatar is present */}
          {sender?.avatar && (
            <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center border-2 border-surface ${iconColor}`}>
               <span className={`material-symbols-outlined text-[12px] ${type === 'like' ? 'icon-fill' : ''}`}>{iconName}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className={`font-body-md text-sm md:text-base font-semibold truncate ${read ? 'text-on-surface-variant' : 'text-on-surface'}`}>
              {title}
            </h3>
            <span className="shrink-0 font-label-sm text-[11px] md:text-xs text-outline">{formatTimeAgo(createdAt)}</span>
          </div>
          <p className="font-body-md text-xs md:text-sm text-on-surface-variant leading-relaxed line-clamp-2">
            {message}
          </p>
          
          <div className="flex items-center gap-3 mt-3">
            {actionText && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  if (!read) markAsRead(_id);
                  if (actionLink !== '#') navigate(actionLink);
                }}
                className={`px-4 py-1.5 rounded-lg font-label-sm text-xs uppercase tracking-wider font-semibold transition-colors
                  ${priority === 'critical' && !read ? 'bg-error text-white hover:bg-error/90' : 
                    priority === 'high' && !read ? 'border border-warning text-warning hover:bg-warning/10' : 
                    'border border-outline-variant text-on-surface hover:border-primary hover:text-primary'}
                `}
              >
                {actionText}
              </button>
            )}

            {!read && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  markAsRead(_id);
                }}
                className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-variant/50 hover:text-on-surface transition-colors"
                title="Mark as Read"
              >
                <span className="material-symbols-outlined text-[18px]">done</span>
              </button>
            )}

            <button 
              onClick={(e) => {
                e.stopPropagation();
                deleteNotification(_id);
              }}
              className="p-1.5 rounded-lg text-outline hover:bg-error/10 hover:text-error transition-colors ml-auto"
              title="Delete Notification"
            >
              <span className="material-symbols-outlined text-[18px]">delete</span>
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
