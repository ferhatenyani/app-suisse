import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  Filter,
  UserPlus,
  AlertCircle,
  TrendingUp,
  FileText,
  Settings,
  Clock,
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'dashboard' | 'system' | 'analytics' | 'team' | 'settings';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
}

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

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'team':
      return <UserPlus size={18} strokeWidth={1.5} />;
    case 'system':
      return <AlertCircle size={18} strokeWidth={1.5} />;
    case 'analytics':
      return <TrendingUp size={18} strokeWidth={1.5} />;
    case 'dashboard':
      return <FileText size={18} strokeWidth={1.5} />;
    case 'settings':
      return <Settings size={18} strokeWidth={1.5} />;
    default:
      return <Bell size={18} strokeWidth={1.5} />;
  }
};

const getPriorityColor = (priority: Notification['priority']) => {
  switch (priority) {
    case 'high':
      return 'var(--color-danger)';
    case 'medium':
      return 'var(--color-warning)';
    case 'low':
      return 'var(--color-info)';
  }
};

const formatTimestamp = (date: Date) => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications = notifications.filter((n) => {
    if (filter === 'unread') return !n.read;
    if (filter === 'read') return n.read;
    return true;
  });

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
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-title)] tracking-tight">
            Notifications
          </h1>
          <p className="text-base text-[var(--color-text-secondary)] mt-2 font-medium">
            {unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}` : 'All caught up!'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] hover:bg-[var(--color-primary)]/5 rounded-lg transition-all"
            >
              <CheckCheck size={16} strokeWidth={2} />
              Mark all as read
            </button>
          )}
          {notifications.length > 0 && (
            <button
              onClick={clearAll}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[var(--color-danger)] hover:text-[var(--color-danger-hover)] hover:bg-[var(--color-danger)]/5 rounded-lg transition-all"
            >
              <Trash2 size={16} strokeWidth={2} />
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <Card elevated>
        <div className="flex items-center gap-3">
          <Filter size={16} className="text-[var(--color-text-muted)]" strokeWidth={2} />
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                filter === 'all'
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-title)] hover:bg-[var(--color-surface-hover)]'
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                filter === 'unread'
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-title)] hover:bg-[var(--color-surface-hover)]'
              }`}
            >
              Unread ({unreadCount})
            </button>
            <button
              onClick={() => setFilter('read')}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                filter === 'read'
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-title)] hover:bg-[var(--color-surface-hover)]'
              }`}
            >
              Read ({notifications.length - unreadCount})
            </button>
          </div>
        </div>
      </Card>

      {/* Notifications List */}
      {filteredNotifications.length === 0 ? (
        <Card elevated>
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-[var(--color-surface-hover)] flex items-center justify-center mx-auto mb-4">
              <Bell size={24} className="text-[var(--color-text-muted)]" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-bold text-[var(--color-title)] mb-2">No notifications</h3>
            <p className="text-sm text-[var(--color-text-secondary)] font-medium">
              {filter === 'unread' ? "You're all caught up!" : 'No notifications to display'}
            </p>
          </div>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredNotifications.map((notification) => (
            <Card
              key={notification.id}
              elevated
              hover
              className={`transition-all ${!notification.read ? 'border-l-4 border-l-[var(--color-primary)]' : ''}`}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: `${getPriorityColor(notification.priority)}15`,
                    color: getPriorityColor(notification.priority),
                  }}
                >
                  {getNotificationIcon(notification.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <h3 className={`text-sm font-bold ${!notification.read ? 'text-[var(--color-title)]' : 'text-[var(--color-text)]'}`}>
                      {notification.title}
                    </h3>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {!notification.read && (
                        <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]"></div>
                      )}
                      <Badge variant={notification.priority === 'high' ? 'danger' : notification.priority === 'medium' ? 'warning' : 'info'} size="sm">
                        {notification.priority}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)] font-medium mb-2">
                    {notification.message}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-[var(--color-text-muted)] font-medium">
                    <Clock size={12} strokeWidth={2} />
                    {formatTimestamp(notification.timestamp)}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="p-2 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 rounded-lg transition-colors"
                      title="Mark as read"
                    >
                      <Check size={18} strokeWidth={2} />
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="p-2 text-[var(--color-danger)] hover:bg-[var(--color-danger)]/10 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={18} strokeWidth={2} />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
