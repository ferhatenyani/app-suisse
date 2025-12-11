import React, { useState } from 'react';
import { Bell, User, Languages } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const routeTitles: Record<string, string> = {
  '/app/dashboard': 'Dashboard',
  '/app/dashboards': 'Dashboards',
  '/app/team': 'Team',
  '/app/profile': 'Profile Settings',
  '/app/notifications': 'Notifications',
};

export const TopNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [language, setLanguage] = useState<'en' | 'fr'>('en');
  const pageTitle = routeTitles[location.pathname] || 'Dashboard';

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'fr' : 'en');
  };

  return (
    <header className="sticky top-0 z-30 bg-white shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 lg:px-8 border-b border-[var(--color-border)]">
        {/* Left - Page Title */}
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-bold text-[var(--color-title)] tracking-tight truncate">
            {pageTitle}
          </h2>
        </div>

        {/* Right - Language, Notifications, Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="group relative flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-[var(--color-text-secondary)] hover:text-[var(--color-title)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)] hover:border-blue-400 rounded-lg shadow-sm hover:shadow transition-all duration-200 ease-in-out active:scale-95 overflow-hidden"
            aria-label={`Switch to ${language === 'en' ? 'French' : 'English'}`}
          >
            <Languages
              size={18}
              strokeWidth={1.5}
              className="transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:rotate-12"
            />
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-wide transition-all duration-200 ease-in-out group-hover:tracking-wider">
              {language}
            </span>
            {/* Animated accent line */}
          </button>

          {/* Notifications */}
          <button
            onClick={() => navigate('/app/notifications')}
            className="relative p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-title)] hover:bg-[var(--color-surface-hover)] rounded-md transition-colors"
            aria-label="Notifications"
          >
            <Bell size={20} strokeWidth={1.5} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--color-danger)] rounded-full border-2 border-white"></span>
          </button>

          {/* Profile */}
          <button
            onClick={() => navigate('/app/profile')}
            className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-title)] hover:bg-[var(--color-surface-hover)] rounded-md transition-colors"
            aria-label="Profile"
          >
            <User size={20} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </header>
  );
};
