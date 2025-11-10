import React from 'react';
import { Search, Bell, Settings } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const routeTitles: Record<string, string> = {
  '/admin/dashboard': 'Dashboard',
  '/admin/pending-accounts': 'Pending Accounts',
  '/admin/clients': 'Clients & Organizations',
  '/admin/data-sources': 'Data Sources',
  '/admin/publishing': 'Dashboard Publishing',
  '/admin/subscriptions': 'Subscription Plans',
  '/admin/analytics': 'Platform Analytics',
  '/admin/notifications': 'Notifications',
  '/admin/profile': 'Profile Settings',
};

export const Topbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pageTitle = routeTitles[location.pathname] || 'Admin Panel';

  return (
    <header className="sticky top-0 z-30 bg-white shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 lg:px-8 border-b border-[var(--color-border)]">
        {/* Left - Page Title */}
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-bold text-[var(--color-title)] tracking-tight truncate">
            {pageTitle}
          </h2>
        </div>

        {/* Right - Search, Notifications, Settings */}
        <div className="flex items-center gap-3">
          

          {/* Notifications */}
          <button
            onClick={() => navigate('/admin/notifications')}
            className="relative p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-title)] hover:bg-[var(--color-surface-hover)] rounded-md transition-colors"
            aria-label="Notifications"
          >
            <Bell size={20} strokeWidth={1.5} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--color-danger)] rounded-full border-2 border-white"></span>
          </button>

          {/* Settings */}
          <button
            onClick={() => navigate('/admin/profile')}
            className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-title)] hover:bg-[var(--color-surface-hover)] rounded-md transition-colors"
            aria-label="Settings"
          >
            <Settings size={20} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </header>
  );
};
