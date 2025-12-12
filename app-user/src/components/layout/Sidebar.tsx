import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, Users, User, LifeBuoy, Menu, X, Bell } from 'lucide-react';
import { currentUser } from '../../data/currentUser';

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  roles?: ('individual' | 'organization')[];
}

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);

  // Minimalist corporate navigation
  const navItems: NavItem[] = [
    {
      path: '/app/dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard size={20} strokeWidth={1.5} />,
    },
    {
      path: '/app/reports',
      label: 'Reports',
      icon: <FolderKanban size={20} strokeWidth={1.5} />,
    },
    {
      path: '/app/team',
      label: 'Team',
      icon: <Users size={20} strokeWidth={1.5} />,
      roles: ['organization'],
    },
    {
      path: '/app/support',
      label: 'Support',
      icon: <LifeBuoy size={20} strokeWidth={1.5} />,
    },
    {
      path: '/app/notifications',
      label: 'Notifications',
      icon: <Bell size={20} strokeWidth={1.5} />,
    },
    {
      path: '/app/profile',
      label: 'Profile',
      icon: <User size={20} strokeWidth={1.5} />,
    },
  ];

  const filteredNavItems = navItems.filter(
    (item) => !item.roles || item.roles.includes(currentUser.role)
  );

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  // Handle indicator fade animation during expand/collapse
  useEffect(() => {
    if (isHovered) {
      // When expanding, fade out immediately
      setIsExpanding(true);

      // After sidebar expansion completes (500ms), fade indicator back in
      const timer = setTimeout(() => {
        setIsExpanding(false);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      // When collapsing, keep indicator visible
      setIsExpanding(false);
    }
  }, [isHovered]);

  const NavContent = ({ isCollapsed, isMobile }: { isCollapsed: boolean; isMobile?: boolean }) => (
    <>
      {/* Logo Area */}
      <div className="relative h-16 border-b border-[var(--color-border)] overflow-hidden">
        {/* Fixed position logo icon */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center shadow-sm transition-all duration-300 ease-out hover:shadow-md hover:scale-[1.02]">
          <div className="w-[18px] h-[18px] border-2 border-white rounded-[3px]" />
        </div>

        {/* Text content with clip reveal */}
        <div
          className="absolute left-16 top-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out overflow-hidden"
          style={{
            maxWidth: isCollapsed ? '0px' : '180px',
            opacity: isCollapsed ? 0 : 1,
          }}
        >
          <h1 className="text-[15px] font-bold text-[var(--color-title)] tracking-[-0.01em] leading-tight whitespace-nowrap">
            ReportHub
          </h1>
          {currentUser.role === 'organization' && (
            <p className="text-[11px] text-[var(--color-text-muted)] font-medium mt-0.5 leading-tight whitespace-nowrap">
              {currentUser.companyName}
            </p>
          )}
        </div>

        {/* Close button for mobile - aligned to the right */}
        {isMobile && (
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-title)] hover:bg-[var(--color-surface-hover)] rounded-md transition-colors"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6">
        <div className="space-y-1.5 px-3">
          {filteredNavItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`group relative flex items-center h-11 rounded-lg transition-all duration-500 ease-in-out overflow-hidden ${
                  active
                    ? 'bg-[var(--color-primary)] text-white shadow-sm pr-3'
                    : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-title)]'
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                {/* Fixed position icon */}
                <div className="absolute left-3 flex-shrink-0 transition-colors duration-300 ease-out">
                  {item.icon}
                </div>

                {/* Text with clip reveal */}
                <span
                  className="absolute left-11 text-[13px] font-semibold tracking-[-0.01em] whitespace-nowrap transition-all duration-500 ease-in-out overflow-hidden"
                  style={{
                    maxWidth: isCollapsed ? '0px' : '150px',
                    opacity: isCollapsed ? 0 : 1,
                  }}
                >
                  {item.label}
                </span>

                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-4 px-3 py-1.5 bg-[var(--color-primary)] text-white text-[11px] font-semibold rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 ease-out whitespace-nowrap z-50 shadow-lg">
                    {item.label}
                  </div>
                )}

                {/* Active indicator - always present, opacity controlled */}
                {active && (
                  <div
                    className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white/80 transition-opacity duration-300 ease-in-out"
                    style={{
                      opacity: isExpanding ? 0 : 1,
                    }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User Info at Bottom */}
      <div className="border-t border-[var(--color-border)] p-3">
        <Link
          to="/app/profile"
          onClick={() => setIsMobileMenuOpen(false)}
          className="relative flex items-center h-11 rounded-lg bg-[var(--color-panel)] hover:bg-[var(--color-surface-hover)] transition-colors duration-300 overflow-hidden"
          title={isCollapsed ? 'Profile Settings' : undefined}
        >
          {/* Fixed position avatar */}
          <div className="absolute left-1 w-9 h-9 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white text-[13px] font-bold shadow-sm ring-2 ring-white/5">
            {currentUser.name.charAt(0)}
          </div>

          {/* Text content with clip reveal */}
          <div
            className="absolute left-12 transition-all duration-500 ease-in-out overflow-hidden"
            style={{
              maxWidth: isCollapsed ? '0px' : '180px',
              opacity: isCollapsed ? 0 : 1,
            }}
          >
            <p className="text-[13px] font-semibold text-[var(--color-title)] whitespace-nowrap leading-tight">
              {currentUser.name}
            </p>
            <p className="text-[11px] text-[var(--color-text-muted)] whitespace-nowrap font-medium mt-0.5 leading-tight">
              {currentUser.email}
            </p>
          </div>
        </Link>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile menu button - fades out when sidebar opens */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className={`lg:hidden fixed left-4 z-50 p-2 bg-white rounded-md border border-[var(--color-border)] text-[var(--color-title)] hover:bg-[var(--color-surface-hover)] shadow-sm transition-all ease-in-out ${
          isMobileMenuOpen
            ? 'opacity-0 pointer-events-none duration-300'
            : 'opacity-100 duration-300 delay-300'
        }`}
        style={{ top: 'calc((4rem - 2.25rem) / 2)' }}
        aria-label="Toggle menu"
      >
        <Menu size={20} />
      </button>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-10 z-40 transition-opacity duration-500 ease-in-out"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Desktop Sidebar - Collapsed by default, expands on hover */}
      <aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          hidden lg:flex flex-col
          fixed inset-y-0 left-0 z-40
          bg-white border-r border-[var(--color-border)] shadow-sm
          transition-all duration-500 ease-in-out
          ${isHovered ? 'w-64' : 'w-20'}
        `}
      >
        <NavContent isCollapsed={!isHovered} isMobile={false} />
      </aside>

      {/* Mobile Sidebar - Full width when open */}
      <aside
        className={`
          lg:hidden fixed inset-y-0 left-0 z-40
          w-64 bg-white border-r border-[var(--color-border)]
          transform transition-transform duration-500 ease-in-out flex flex-col
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <NavContent isCollapsed={false} isMobile={true} />
      </aside>
    </>
  );
};
