import React, { useState } from 'react';
import NotificationCard from './NotificationCard';

// --- MOCK DATA ---
const mockNotifications = [
  {
    id: 1,
    priority: 'critical',
    category: 'disease',
    type: 'disease_alert',
    title: 'Early Blight Risk Detected',
    message: 'High humidity detected. Tomato plants in Sector B may be at risk of Early Blight.',
    time: '10 mins ago',
    read: false,
    actionText: 'View Details',
    actionLink: '/dashboard/crops/1/treatment'
  },
  {
    id: 2,
    priority: 'important',
    category: 'treatment',
    type: 'treatment_reminder',
    title: 'Follow-up Scan Due',
    message: 'Re-scan Tomato Plant #4 to verify fungicide treatment effectiveness.',
    time: '2 hours ago',
    read: false,
    actionText: 'Start Scan',
    actionLink: '#'
  },
  {
    id: 3,
    priority: 'informational',
    category: 'expert',
    type: 'expert_reply',
    title: 'Expert Replied to You',
    message: '👨‍🌾 Dr. Sharma replied to your question regarding hydroponic nutrient burn.',
    time: '5 hours ago',
    read: false,
    actionText: 'Open Discussion',
    actionLink: '/dashboard/community'
  },
  {
    id: 4,
    priority: 'informational',
    category: 'scan',
    type: 'scan_complete',
    title: 'Scan Completed',
    message: 'Tomato Plant #12 analyzed successfully. No new anomalies detected.',
    time: 'Yesterday',
    read: true,
    actionText: 'View Result',
    actionLink: '#'
  },
  {
    id: 5,
    priority: 'important',
    category: 'weather',
    type: 'weather_alert',
    title: 'Heavy Rain Expected',
    message: 'Rain expected tomorrow morning. Delay planned pesticide applications.',
    time: 'Yesterday',
    read: true,
    actionText: 'Check Forecast',
    actionLink: '#'
  },
  {
    id: 6,
    priority: 'informational',
    category: 'ai',
    type: 'ai_insight',
    title: 'Farm Health Update',
    message: '🤖 Overall farm health score increased to 89 this week. Great job!',
    time: 'May 20',
    read: true,
    actionText: 'View Analytics',
    actionLink: '/dashboard/reports'
  },
  {
    id: 7,
    priority: 'informational',
    category: 'achievement',
    type: 'achievement',
    title: 'Milestone Reached',
    message: '🏅 You have completed 100 AI Scans! You are a growing expert.',
    time: 'May 18',
    read: true,
    actionText: 'View Profile',
    actionLink: '/dashboard/profile'
  },
  {
    id: 8,
    priority: 'important',
    category: 'treatment',
    type: 'fertilizer_reminder',
    title: 'Nutrient Application Due',
    message: 'Scheduled nitrogen boost for Sector A is due tomorrow.',
    time: 'May 15',
    read: true,
    actionText: 'View Schedule',
    actionLink: '#'
  }
];

export default function NotificationsContent() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Urgent', 'Scans', 'Community', 'Experts', 'Reminders', 'AI Insights'];

  // Derived Stats
  const unreadCount = mockNotifications.filter(n => !n.read).length;
  const criticalCount = mockNotifications.filter(n => n.priority === 'critical' && !n.read).length;
  const remindersCount = mockNotifications.filter(n => n.category === 'treatment' && !n.read).length;

  // Filter Logic
  const filteredNotifications = mockNotifications.filter(n => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Urgent') return n.priority === 'critical';
    if (activeFilter === 'Scans') return n.category === 'scan';
    if (activeFilter === 'Community') return n.category === 'community';
    if (activeFilter === 'Experts') return n.category === 'expert';
    if (activeFilter === 'Reminders') return n.category === 'treatment';
    if (activeFilter === 'AI Insights') return n.category === 'ai';
    return true;
  });

  return (
    <div className="pt-6 pb-24 px-container-margin max-w-3xl mx-auto flex flex-col gap-6 h-full relative animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      
      {/* Page Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mb-2">Notification Center</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Everything important that needs your attention.</p>
        </div>
        <button className="text-primary hover:text-primary-fixed font-label-sm text-sm uppercase tracking-wider font-semibold transition-colors">
          Mark all as read
        </button>
      </header>

      {/* Top Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass-panel p-4 rounded-xl border border-outline-variant/30 flex flex-col items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors"></div>
          <span className="font-display-md text-3xl font-bold text-on-surface">{unreadCount}</span>
          <span className="font-label-sm text-xs text-on-surface-variant uppercase tracking-widest mt-1">Unread</span>
        </div>
        <div className="glass-panel p-4 rounded-xl border border-error/20 bg-error/5 flex flex-col items-center justify-center relative overflow-hidden group shadow-[0_0_15px_rgba(239,68,68,0.05)]">
          <div className="absolute inset-0 bg-error/5 group-hover:bg-error/10 transition-colors"></div>
          <span className="font-display-md text-3xl font-bold text-error">{criticalCount}</span>
          <span className="font-label-sm text-xs text-error uppercase tracking-widest mt-1">Critical</span>
        </div>
        <div className="glass-panel p-4 rounded-xl border border-warning/20 bg-warning/5 flex flex-col items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-warning/5 group-hover:bg-warning/10 transition-colors"></div>
          <span className="font-display-md text-3xl font-bold text-warning">{remindersCount}</span>
          <span className="font-label-sm text-xs text-warning uppercase tracking-widest mt-1">Reminders</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex overflow-x-auto hide-scrollbar gap-2 py-2 sticky top-[64px] z-30 bg-surface/80 backdrop-blur-md -mx-container-margin px-container-margin md:mx-0 md:px-0">
        {filters.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`shrink-0 px-5 py-2 rounded-full font-label-sm text-sm font-semibold transition-all duration-300 border ${
              activeFilter === filter 
                ? 'bg-primary text-on-primary-fixed border-primary glow-primary' 
                : 'bg-surface-container border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Feed */}
      <div className="flex flex-col gap-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map(notification => (
            <NotificationCard key={notification.id} notification={notification} />
          ))
        ) : (
          <div className="py-12 flex flex-col items-center justify-center text-on-surface-variant bg-surface-container/20 rounded-2xl border border-outline-variant/20 border-dashed">
            <span className="material-symbols-outlined text-[48px] mb-4 opacity-50">notifications_off</span>
            <p className="font-body-md text-center">No notifications found for this filter.</p>
          </div>
        )}
      </div>

    </div>
  );
}
