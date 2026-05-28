import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { notificationService } from '../services/services';
import { useAuth } from './AuthContext';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, pages: 1 });

  // Fetch Notifications
  const fetchNotifications = useCallback(async (page = 1, limit = 20) => {
    if (!user) return;
    try {
      if (page === 1) setLoading(true); // Only show loading on initial fetch
      const res = await notificationService.getNotifications(page, limit);
      if (res.data?.data) {
        if (page === 1) {
          setNotifications(res.data.data.notifications || []);
        } else {
          setNotifications(prev => [...prev, ...(res.data.data.notifications || [])]);
        }
        setUnreadCount(res.data.data.unreadCount || 0);
        if (res.data.data.pagination) {
          setPagination(res.data.data.pagination);
        }
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Initial Fetch & Visibility-based Polling (Hybrid)
  useEffect(() => {
    if (user) {
      fetchNotifications(1, 20);

      // Poll every 60 seconds ONLY when tab is visible
      const interval = setInterval(() => {
        if (document.visibilityState === 'visible') {
          fetchNotifications(1, 20);
        }
      }, 60000);

      // Re-fetch instantly when user returns to the tab
      const handleVisibilityChange = () => {
        if (document.visibilityState === 'visible') {
          fetchNotifications(1, 20);
        }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);

      return () => {
        clearInterval(interval);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    } else {
      setNotifications([]);
      setUnreadCount(0);
    }
  }, [user, fetchNotifications]);

  const markAsRead = async (id) => {
    try {
      // Optimistic Update
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, read: true } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
      
      await notificationService.markAsRead(id);
    } catch (error) {
      console.error('Failed to mark read', error);
      // Revert if failed (optional, keeping it simple here)
      fetchNotifications(1, pagination.limit);
    }
  };

  const markAllRead = async () => {
    try {
      // Optimistic Update
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
      
      await notificationService.markAllRead();
    } catch (error) {
      console.error('Failed to mark all read', error);
      fetchNotifications(1, pagination.limit);
    }
  };

  const deleteNotification = async (id) => {
    try {
      // Optimistic Update
      setNotifications(prev => {
        const notif = prev.find(n => n._id === id);
        if (notif && !notif.read) setUnreadCount(count => Math.max(0, count - 1));
        return prev.filter(n => n._id !== id);
      });
      
      await notificationService.deleteNotification(id);
    } catch (error) {
      console.error('Failed to delete', error);
      fetchNotifications(1, pagination.limit);
    }
  };

  const refreshNotifications = () => {
    fetchNotifications(1, pagination.limit);
  };

  const loadMore = () => {
    if (pagination.page < pagination.pages) {
      fetchNotifications(pagination.page + 1, pagination.limit);
    }
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      loading,
      pagination,
      fetchNotifications: refreshNotifications,
      loadMore,
      markAsRead,
      markAllRead,
      deleteNotification
    }}>
      {children}
    </NotificationContext.Provider>
  );
};
