import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import NotificationCard from './NotificationCard';
import { useNotification } from '../../context/NotificationContext';

export default function NotificationsContent() {
  const { notifications, unreadCount, loading, markAllRead, loadMore, pagination } = useNotification();
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Unread', 'Comments', 'Likes', 'Alerts', 'System'];

  // Derived Stats from real data
  const criticalCount = notifications.filter(n => n.priority === 'critical' && !n.read).length;
  const alertsCount = notifications.filter(n => (n.type === 'disease_alert' || n.type === 'weather_alert' || n.type === 'crop_warning') && !n.read).length;

  // Filter Logic
  const filteredNotifications = notifications.filter(n => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Unread') return !n.read;
    if (activeFilter === 'Comments') return n.type === 'comment' || n.type === 'reply';
    if (activeFilter === 'Likes') return n.type === 'like';
    if (activeFilter === 'Alerts') return ['disease_alert', 'weather_alert', 'crop_warning'].includes(n.type);
    if (activeFilter === 'System') return n.type === 'system' || n.type === 'ai_report';
    return true;
  });

  return (
    <div className="w-full h-full min-h-full bg-surface">
      
      {/* 
        =========================================
        MOBILE LAYOUT (visible below md breakpoint)
        =========================================
      */}
      <div className="md:hidden flex flex-col gap-6 pt-6 pb-28 px-4 w-full animate-in fade-in duration-500">
        <header className="flex flex-col gap-2">
          <h1 className="font-headline-lg text-2xl font-bold text-on-surface tracking-tight">Notification Center</h1>
          <p className="font-body-md text-sm text-on-surface-variant">Stay updated with your farm's activity.</p>
          {unreadCount > 0 && (
            <button 
              onClick={markAllRead}
              className="mt-2 self-start text-primary font-label-sm text-xs uppercase tracking-widest font-bold bg-primary/10 px-4 py-2 rounded-full hover:bg-primary/20 transition-colors"
            >
              Mark all as read
            </button>
          )}
        </header>

        {/* Mobile Stats - 2x2 Grid (No horizontal scroll clipping issues!) */}
        <div className="grid grid-cols-2 gap-3">
          <div className="glass-panel p-4 rounded-2xl border border-outline-variant/30 flex flex-col items-start justify-center relative overflow-hidden">
            <span className="material-symbols-outlined absolute right-2 top-2 text-on-surface/10 text-4xl">mark_email_unread</span>
            <span className="font-display-md text-3xl font-bold text-on-surface">{unreadCount}</span>
            <span className="font-label-sm text-xs text-on-surface-variant uppercase tracking-widest mt-1">Unread</span>
          </div>
          <div className="glass-panel p-4 rounded-2xl border border-error/20 bg-error/5 flex flex-col items-start justify-center relative overflow-hidden">
            <span className="material-symbols-outlined absolute right-2 top-2 text-error/10 text-4xl">warning</span>
            <span className="font-display-md text-3xl font-bold text-error">{criticalCount}</span>
            <span className="font-label-sm text-xs text-error uppercase tracking-widest mt-1">Critical</span>
          </div>
          <div className="col-span-2 glass-panel p-4 rounded-2xl border border-warning/20 bg-warning/5 flex items-center justify-between relative overflow-hidden">
             <div>
                <span className="font-display-md text-3xl font-bold text-warning">{alertsCount}</span>
                <span className="font-label-sm text-xs text-warning uppercase tracking-widest mt-1 block">Active Alerts</span>
             </div>
             <span className="material-symbols-outlined text-warning/20 text-5xl mr-2">notifications_active</span>
          </div>
        </div>

        {/* Mobile Filters */}
        <div className="flex overflow-x-auto no-scrollbar gap-2 py-2 sticky top-[60px] z-30 bg-surface/90 backdrop-blur-md -mx-4 px-4 border-y border-outline-variant/10">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`shrink-0 px-5 py-2 rounded-full font-label-sm text-sm font-semibold transition-all duration-300 border ${
                activeFilter === filter 
                  ? 'bg-primary text-on-primary-fixed border-primary shadow-[0_0_15px_rgba(16,185,129,0.3)]' 
                  : 'bg-surface-container-low border-outline-variant/30 text-on-surface-variant'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Mobile Feed */}
        <div className="flex flex-col gap-3">
          {loading && notifications.length === 0 ? (
            [...Array(3)].map((_, i) => (
              <div key={i} className="glass-panel p-4 rounded-2xl border border-outline-variant/30 animate-pulse flex gap-4 h-24"></div>
            ))
          ) : filteredNotifications.length > 0 ? (
            <>
              <AnimatePresence mode='popLayout'>
                {filteredNotifications.map(notification => (
                  <NotificationCard key={notification._id} notification={notification} />
                ))}
              </AnimatePresence>
              {pagination.page < pagination.pages && (
                <button onClick={loadMore} className="mt-2 py-3 w-full border border-outline-variant/30 rounded-xl font-label-sm font-semibold text-on-surface-variant hover:text-primary transition-colors">
                  Load More
                </button>
              )}
            </>
          ) : (
            <div className="py-12 px-6 flex flex-col items-center justify-center text-center bg-surface-container/10 rounded-3xl border border-outline-variant/20 border-dashed mt-4">
              <span className="material-symbols-outlined text-[48px] text-primary/40 mb-4">done_all</span>
              <h3 className="font-headline-sm text-lg text-on-surface font-semibold mb-2">You're all caught up!</h3>
              <p className="font-body-md text-sm text-on-surface-variant">No notifications found for this filter.</p>
            </div>
          )}
        </div>
      </div>


      {/* 
        =========================================
        DESKTOP LAYOUT (visible md and up)
        =========================================
      */}
      <div className="hidden md:flex flex-col w-full max-w-[1400px] mx-auto px-8 lg:px-12 pt-10 pb-16 animate-in fade-in duration-700">
        
        {/* Desktop Header */}
        <header className="flex justify-between items-end mb-10">
          <div>
            <h1 className="font-headline-lg text-4xl lg:text-5xl font-bold tracking-tight mb-3 text-transparent bg-clip-text bg-gradient-to-r from-on-surface to-on-surface-variant">
              Notification Center
            </h1>
            <p className="font-body-md text-lg text-on-surface-variant max-w-xl">
              Monitor critical farm alerts, community interactions, and system updates in one place.
            </p>
          </div>
          {unreadCount > 0 && (
            <button 
              onClick={markAllRead}
              className="group flex items-center gap-2 px-6 py-3 rounded-full bg-surface-container-high hover:bg-primary/10 border border-outline-variant/30 hover:border-primary/50 transition-all duration-300"
            >
              <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">checklist</span>
              <span className="font-label-sm text-sm uppercase tracking-widest font-bold text-on-surface group-hover:text-primary transition-colors">Mark all as read</span>
            </button>
          )}
        </header>

        {/* Desktop Stats (3 wide cards) */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          <div className="glass-card p-6 rounded-3xl border border-outline-variant/30 flex items-center justify-between group cursor-default">
            <div>
              <p className="font-label-sm text-sm text-on-surface-variant uppercase tracking-widest mb-1">Total Unread</p>
              <p className="font-display-md text-5xl font-bold text-on-surface">{unreadCount}</p>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <span className="material-symbols-outlined text-3xl text-primary">mark_email_unread</span>
            </div>
          </div>
          
          <div className="glass-card p-6 rounded-3xl border border-error/20 bg-error/5 flex items-center justify-between group cursor-default">
            <div>
              <p className="font-label-sm text-sm text-error uppercase tracking-widest mb-1">Critical Action Needed</p>
              <p className="font-display-md text-5xl font-bold text-error">{criticalCount}</p>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-error/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <span className="material-symbols-outlined text-3xl text-error">warning</span>
            </div>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-warning/20 bg-warning/5 flex items-center justify-between group cursor-default">
            <div>
              <p className="font-label-sm text-sm text-warning uppercase tracking-widest mb-1">Active Alerts</p>
              <p className="font-display-md text-5xl font-bold text-warning">{alertsCount}</p>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-warning/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <span className="material-symbols-outlined text-3xl text-warning">notifications_active</span>
            </div>
          </div>
        </div>

        {/* Desktop 2-Column Content Layout */}
        <div className="flex gap-10 items-start">
          
          {/* Left Sidebar: Filters */}
          <div className="w-64 shrink-0 flex flex-col gap-2 sticky top-[100px]">
            <h3 className="font-label-sm text-xs text-outline uppercase tracking-widest pl-4 mb-2">Filter By</h3>
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`w-full text-left px-5 py-3 rounded-2xl font-label-sm text-sm font-semibold transition-all duration-300 flex items-center justify-between ${
                  activeFilter === filter 
                    ? 'bg-primary text-on-primary-fixed shadow-[0_4px_20px_rgba(16,185,129,0.2)]' 
                    : 'bg-transparent text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                }`}
              >
                {filter}
                {activeFilter === filter && <span className="material-symbols-outlined text-[18px]">check</span>}
              </button>
            ))}
          </div>

          {/* Right Area: Feed */}
          <div className="flex-1 flex flex-col gap-4 min-w-0">
            {loading && notifications.length === 0 ? (
              [...Array(4)].map((_, i) => (
                <div key={i} className="glass-panel p-6 rounded-3xl border border-outline-variant/30 animate-pulse flex gap-6 h-32"></div>
              ))
            ) : filteredNotifications.length > 0 ? (
              <>
                <AnimatePresence mode='popLayout'>
                  {filteredNotifications.map(notification => (
                    <NotificationCard key={notification._id} notification={notification} />
                  ))}
                </AnimatePresence>
                {pagination.page < pagination.pages && (
                  <button onClick={loadMore} className="mt-4 py-4 w-full border border-outline-variant/30 rounded-2xl font-label-sm font-semibold text-on-surface-variant hover:text-primary hover:bg-surface-container transition-all">
                    Load More Notifications
                  </button>
                )}
              </>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-24 px-10 flex flex-col items-center justify-center text-center bg-surface-container/5 rounded-[2rem] border border-outline-variant/20 border-dashed"
              >
                <div className="w-32 h-32 mb-8 rounded-full bg-primary/5 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping opacity-20" style={{ animationDuration: '3s' }}></div>
                  <span className="material-symbols-outlined text-[64px] text-primary/40">done_all</span>
                </div>
                <h3 className="font-headline-sm text-2xl text-on-surface font-semibold mb-3">You're completely caught up!</h3>
                <p className="font-body-md text-lg text-on-surface-variant max-w-md">
                  There are no notifications matching the "{activeFilter}" filter right now. New activity will appear here automatically.
                </p>
              </motion.div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
