import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { useNotifications } from '../contexts/NotificationContext';
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
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification, clearAll } = useNotifications();
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  const filteredNotifications = notifications.filter((n) => {
    if (filter === 'unread') return !n.read;
    if (filter === 'read') return n.read;
    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-title)] tracking-tight">
            Notifications
          </h1>
          <p className="text-sm sm:text-base text-[var(--color-text-secondary)] mt-1.5 sm:mt-2 font-medium">
            {unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}` : 'All caught up!'}
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] hover:bg-[var(--color-primary)]/5 rounded-lg transition-all whitespace-nowrap"
            >
              <CheckCheck size={14} className="sm:w-4 sm:h-4" strokeWidth={2} />
              <span className="hidden xs:inline">Mark all as read</span>
              <span className="xs:hidden">Mark all</span>
            </button>
          )}
          {notifications.length > 0 && (
            <button
              onClick={clearAll}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-[var(--color-danger)] hover:text-[var(--color-danger-hover)] hover:bg-[var(--color-danger)]/5 rounded-lg transition-all whitespace-nowrap"
            >
              <Trash2 size={14} className="sm:w-4 sm:h-4" strokeWidth={2} />
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <Card elevated>
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto">
          <Filter size={14} className="text-[var(--color-text-muted)] flex-shrink-0 sm:w-4 sm:h-4" strokeWidth={2} />
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap ${
                filter === 'all'
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-title)] hover:bg-[var(--color-surface-hover)]'
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap ${
                filter === 'unread'
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-title)] hover:bg-[var(--color-surface-hover)]'
              }`}
            >
              Unread ({unreadCount})
            </button>
            <button
              onClick={() => setFilter('read')}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap ${
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
          <div className="text-center py-8 sm:py-12">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[var(--color-surface-hover)] flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Bell size={20} className="text-[var(--color-text-muted)] sm:w-6 sm:h-6" strokeWidth={1.5} />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[var(--color-title)] mb-1.5 sm:mb-2">No notifications</h3>
            <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] font-medium">
              {filter === 'unread' ? "You're all caught up!" : 'No notifications to display'}
            </p>
          </div>
        </Card>
      ) : (
        <div className="space-y-2.5 sm:space-y-3">
          {filteredNotifications.map((notification) => (
            <Card
              key={notification.id}
              elevated
              hover
              className={`transition-all ${!notification.read ? 'border-l-2 sm:border-l-4 border-l-[var(--color-primary)]' : ''}`}
            >
              <div className="flex items-start gap-2.5 sm:gap-4">
                {/* Icon */}
                <div
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: `${getPriorityColor(notification.priority)}15`,
                    color: getPriorityColor(notification.priority),
                  }}
                >
                  <div className="w-4 h-4 sm:w-[18px] sm:h-[18px]">
                    {getNotificationIcon(notification.type)}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 sm:gap-3 mb-1">
                    <h3 className={`text-xs sm:text-sm font-bold leading-snug ${!notification.read ? 'text-[var(--color-title)]' : 'text-[var(--color-text)]'}`}>
                      {notification.title}
                    </h3>
                    <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                      {!notification.read && (
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[var(--color-primary)]"></div>
                      )}
                      <Badge variant={notification.priority === 'high' ? 'danger' : notification.priority === 'medium' ? 'warning' : 'info'} size="sm">
                        {notification.priority}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] font-medium mb-1.5 sm:mb-2 leading-relaxed">
                    {notification.message}
                  </p>
                  <div className="flex items-center gap-1 text-[10px] sm:text-xs text-[var(--color-text-muted)] font-medium">
                    <Clock size={10} className="sm:w-3 sm:h-3" strokeWidth={2} />
                    {formatTimestamp(notification.timestamp)}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="p-1.5 sm:p-2 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 rounded-lg transition-colors"
                      title="Mark as read"
                    >
                      <Check size={16} className="sm:w-[18px] sm:h-[18px]" strokeWidth={2} />
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="p-1.5 sm:p-2 text-[var(--color-danger)] hover:bg-[var(--color-danger)]/10 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={16} className="sm:w-[18px] sm:h-[18px]" strokeWidth={2} />
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
