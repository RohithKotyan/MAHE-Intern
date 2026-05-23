import React from 'react';

export default function NotificationCard({ notification }) {
  const { priority, type, category, title, message, time, actionText, actionLink, read } = notification;

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
    case 'important':
      priorityStyles = 'border-warning/50 bg-warning/5';
      iconColor = 'text-warning bg-warning/10';
      glowEffect = 'shadow-[0_0_15px_rgba(245,158,11,0.1)]';
      break;
    case 'informational':
    default:
      priorityStyles = 'border-primary/20 bg-surface-container/50';
      iconColor = 'text-primary bg-primary/10';
      glowEffect = '';
      break;
  }

  // Determine icon based on Category
  let iconName = 'notifications';
  switch (category) {
    case 'disease': iconName = 'coronavirus'; break;
    case 'weather': iconName = 'severe_cold'; break;
    case 'scan': iconName = 'qr_code_scanner'; break;
    case 'expert': iconName = 'verified'; break;
    case 'community': iconName = 'forum'; break;
    case 'treatment': iconName = 'medication'; break;
    case 'achievement': iconName = 'emoji_events'; break;
    case 'ai': iconName = 'auto_awesome'; break;
    default: iconName = 'notifications';
  }

  return (
    <div className={`glass-panel p-5 rounded-2xl border ${read ? 'opacity-70 border-outline-variant/30 bg-surface-container/30' : priorityStyles} ${!read && glowEffect} transition-all duration-300 relative overflow-hidden group`}>
      
      {!read && (
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-current to-transparent opacity-50" style={{ color: priority === 'critical' ? '#ef4444' : priority === 'important' ? '#f59e0b' : '#10b981' }}></div>
      )}

      <div className="flex items-start md:items-center gap-4 flex-col md:flex-row">
        
        {/* Icon */}
        <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${read ? 'bg-surface-variant text-on-surface-variant' : iconColor}`}>
          <span className="material-symbols-outlined text-[24px]">{iconName}</span>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className={`font-body-md text-base font-semibold ${read ? 'text-on-surface-variant' : 'text-on-surface'}`}>
              {title}
            </h3>
            <span className="font-label-sm text-xs text-outline whitespace-nowrap ml-4">{time}</span>
          </div>
          <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
            {message}
          </p>
        </div>

        {/* Action Button */}
        {actionText && (
          <a 
            href={actionLink || '#'} 
            className={`shrink-0 mt-2 md:mt-0 px-5 py-2 rounded-lg font-label-sm text-sm uppercase tracking-wider font-semibold transition-colors
              ${priority === 'critical' && !read ? 'bg-error text-white hover:bg-error/90' : 
                priority === 'important' && !read ? 'border border-warning text-warning hover:bg-warning/10' : 
                'border border-outline-variant text-on-surface hover:border-primary hover:text-primary'}
            `}
          >
            {actionText}
          </a>
        )}

      </div>
    </div>
  );
}
