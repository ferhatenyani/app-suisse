import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, Users, User, Menu, X } from 'lucide-react';
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

  const NavContent = ({ isCollapsed }: { isCollapsed: boolean }) => (
    <>
      {/* Logo Area */}
      <div className={`flex items-center border-b border-[var(--color-border)] transition-all duration-300 ${
        isCollapsed ? 'h-[72px] justify-center px-4' : 'h-[72px] px-6'
      }`}>
        <div className={`flex items-center ${isCollapsed ? '' : 'gap-3 w-full'}`}>
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center flex-shrink-0 shadow-sm transition-all duration-200 hover:shadow-md hover:scale-[1.02]">
            <div className="w-[18px] h-[18px] border-2 border-white rounded-[3px]" />
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden">
              <h1 className="text-[15px] font-bold text-[var(--color-title)] tracking-[-0.01em] leading-tight">ReportHub</h1>
              {currentUser.role === 'organization' && (
                <p className="text-[11px] text-[var(--color-text-muted)] truncate font-medium mt-0.5 leading-tight">{currentUser.companyName}</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className={`flex-1 overflow-y-auto ${isCollapsed ? 'py-6 px-3' : 'py-6 px-4'}`}>
        <div className="space-y-1.5">
          {filteredNavItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`group relative flex items-center rounded-lg transition-all duration-200 ${
                  isCollapsed ? 'justify-center h-11 w-11 mx-auto' : 'gap-3 px-3 h-11'
                } ${
                  active
                    ? 'bg-[var(--color-primary)] text-white shadow-sm'
                    : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-title)]'
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                <div className={`flex-shrink-0 ${active ? 'text-white' : ''} transition-colors duration-200`}>
                  {item.icon}
                </div>
                {!isCollapsed && (
                  <span className="text-[13px] font-semibold tracking-[-0.01em]">{item.label}</span>
                )}

                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-4 px-3 py-1.5 bg-[var(--color-primary)] text-white text-[11px] font-semibold rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 whitespace-nowrap z-50 shadow-lg">
                    {item.label}
                  </div>
                )}

                {/* Active indicator */}
                {active && !isCollapsed && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white/80" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User Info at Bottom */}
      <div className={`border-t border-[var(--color-border)] transition-all duration-300 ${isCollapsed ? 'p-3' : 'p-4'}`}>
        <Link
          to="/app/profile"
          className={`flex items-center rounded-lg hover:bg-[var(--color-surface-hover)] transition-all duration-200 group ${
            isCollapsed ? 'justify-center h-11 w-11 mx-auto' : 'gap-3 p-2.5'
          }`}
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white text-[13px] font-bold flex-shrink-0 shadow-sm ring-2 ring-white/5 transition-all duration-200 group-hover:ring-white/10 group-hover:shadow">
            {currentUser.name.charAt(0)}
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-[var(--color-title)] truncate leading-tight">{currentUser.name}</p>
              <p className="text-[11px] text-[var(--color-text-muted)] truncate font-medium mt-0.5 leading-tight">{currentUser.email}</p>
            </div>
          )}
        </Link>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md border border-[var(--color-border)] text-[var(--color-title)] hover:bg-[var(--color-surface-hover)] transition-colors"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-40 z-40"
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
          transition-all duration-300 ease-in-out
          ${isHovered ? 'w-64' : 'w-20'}
        `}
      >
        <NavContent isCollapsed={!isHovered} />
      </aside>

      {/* Mobile Sidebar - Full width when open */}
      <aside
        className={`
          lg:hidden fixed inset-y-0 left-0 z-40
          w-64 bg-white border-r border-[var(--color-border)]
          transform transition-transform duration-300 ease-in-out flex flex-col
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <NavContent isCollapsed={false} />
      </aside>
    </>
  );
};
