import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Notification {
  id: string;
  type: 'dashboard' | 'system' | 'analytics' | 'team' | 'settings';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
}

interface NotificationContextType {
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'dashboard',
    title: 'New Dashboard Available',
    message: 'Q4 Sales Analytics dashboard has been published',
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 mins ago
    read: false,
    priority: 'high',
  },
  {
    id: '2',
    type: 'analytics',
    title: 'Report Generated',
    message: 'Your monthly analytics report is ready to view',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
    read: false,
    priority: 'medium',
  },
  {
    id: '3',
    type: 'system',
    title: 'System Maintenance Scheduled',
    message: 'Scheduled maintenance on Jan 15, 2025 at 2:00 AM UTC',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: true,
    priority: 'medium',
  },
  {
    id: '4',
    type: 'team',
    title: 'New Team Member Added',
    message: 'John Doe has been added to your team',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    read: true,
    priority: 'low',
  },
  {
    id: '5',
    type: 'dashboard',
    title: 'Dashboard Updated',
    message: 'Marketing Metrics dashboard has been updated with new data',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true,
    priority: 'low',
  },
  {
    id: '6',
    type: 'settings',
    title: 'Security Update',
    message: 'Two-factor authentication has been enabled for your account',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    read: true,
    priority: 'medium',
  },
];

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        setNotifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAll,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
