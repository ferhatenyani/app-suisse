import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Settings, LogOut, ChevronDown, Search, Bell, ChevronRight } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { SettingsModal } from '../ui/SettingsModal';
import { currentUser } from '../../data/currentUser';

export const TopNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleLogout = () => {
    // Mock logout
    console.log('Logging out...');
    navigate('/login');
  };

  const generateBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: { label: string; path: string }[] = [];

    paths.forEach((segment, index) => {
      const path = '/' + paths.slice(0, index + 1).join('/');
      let label = segment.charAt(0).toUpperCase() + segment.slice(1);

      if (segment === 'app') return;
      if (segment === 'dashboard') label = 'Dashboard';
      if (segment === 'reports') label = 'Reports';

      breadcrumbs.push({ label, path });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <>
      <header className="sticky top-0 z-30 bg-white border-b border-[var(--color-border)] shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between gap-6">
            {/* Left: Breadcrumbs */}
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div className="lg:hidden w-10" />
              {breadcrumbs.length > 0 && (
                <nav className="hidden md:flex items-center gap-2 text-sm">
                  {breadcrumbs.map((crumb, index) => (
                    <React.Fragment key={crumb.path}>
                      {index > 0 && <ChevronRight size={16} className="text-[var(--color-text-muted)]" />}
                      {index === breadcrumbs.length - 1 ? (
                        <span className="text-[var(--color-title)] font-semibold truncate">
                          {crumb.label}
                        </span>
                      ) : (
                        <button
                          onClick={() => navigate(crumb.path)}
                          className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] font-medium transition-colors truncate"
                        >
                          {crumb.label}
                        </button>
                      )}
                    </React.Fragment>
                  ))}
                </nav>
              )}
            </div>

            {/* Right: Search, User */}
            <div className="flex items-center gap-3">
              {/* Search Bar */}
              <div className="hidden lg:flex items-center gap-2.5 px-4 py-2 bg-[var(--color-panel)] border border-[var(--color-border)] rounded-xl w-72 hover:border-[var(--color-primary)] focus-within:border-[var(--color-primary)] transition-colors">
                <Search size={18} className="text-[var(--color-text-muted)]" strokeWidth={2} />
                <input
                  type="text"
                  placeholder="Search..."
                  className="flex-1 bg-transparent text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none font-medium"
                />
              </div>

              {/* User menu */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-[var(--color-surface-hover)] transition-colors"
                >
                  <Avatar
                    src={currentUser.avatar}
                    name={currentUser.name}
                    size="sm"
                  />
                  <ChevronDown
                    size={16}
                    className={`text-[var(--color-text-muted)] transition-transform ${
                      isDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Dropdown menu */}
                {isDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIsDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-3 w-60 bg-white rounded-xl border border-[var(--color-border)] py-2 z-20 shadow-xl animate-scaleIn">
                      <div className="px-4 py-3 border-b border-[var(--color-border)]">
                        <p className="text-sm font-bold text-[var(--color-title)] truncate">
                          {currentUser.name}
                        </p>
                        <p className="text-xs text-[var(--color-text-muted)] truncate font-medium mt-0.5">{currentUser.email}</p>
                      </div>
                      <button
                        onClick={() => {
                          navigate('/app/profile');
                          setIsDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] transition-colors"
                      >
                        <Settings size={16} className="text-[var(--color-text-muted)]" strokeWidth={2} />
                        Settings
                      </button>
                      <div className="border-t border-[var(--color-border)] mt-1 pt-1">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-[var(--color-danger)] hover:bg-[var(--color-danger-light)] transition-colors"
                        >
                          <LogOut size={16} strokeWidth={2} />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </>
  );
};
