import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  UserCheck,
  Building2,
  Database,
  FileBarChart,
  CreditCard,
  BarChart3,
  Menu,
  X,
  Shield,
} from 'lucide-react';

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);

  const navItems: NavItem[] = [
    {
      path: '/admin/dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard size={20} strokeWidth={1.5} />,
    },
    {
      path: '/admin/pending-accounts',
      label: 'Pending Accounts',
      icon: <UserCheck size={20} strokeWidth={1.5} />,
    },
    {
      path: '/admin/clients',
      label: 'Clients & Orgs',
      icon: <Building2 size={20} strokeWidth={1.5} />,
    },
    {
      path: '/admin/data-sources',
      label: 'Data Sources',
      icon: <Database size={20} strokeWidth={1.5} />,
    },
    // {
    //   path: '/admin/publishing',
    //   label: 'Publishing',
    //   icon: <FileBarChart size={20} strokeWidth={1.5} />,
    // },
    {
      path: '/admin/subscriptions',
      label: 'Subscriptions',
      icon: <CreditCard size={20} strokeWidth={1.5} />,
    },
    {
      path: '/admin/analytics',
      label: 'Analytics',
      icon: <BarChart3 size={20} strokeWidth={1.5} />,
    },
  ];

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

  const NavContent = ({ isCollapsed }: { isCollapsed: boolean }) => (
    <>
      {/* Logo Area */}
      <div className="relative h-16 border-b border-[var(--color-border)] overflow-hidden">
        {/* Fixed position Shield icon */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center shadow-sm transition-all duration-300 ease-out hover:shadow-md hover:scale-[1.02]">
          <Shield size={18} className="text-white" strokeWidth={2} />
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
            Admin Panel
          </h1>
          <p className="text-[11px] text-[var(--color-text-muted)] font-medium mt-0.5 leading-tight whitespace-nowrap">
            Super Administrator
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6">
        <div className="space-y-1.5 px-3">
          {navItems.map((item) => {
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

      {/* Admin Info at Bottom */}
      <div className="border-t border-[var(--color-border)] p-3">
        <Link
          to="/admin/profile"
          onClick={() => setIsMobileMenuOpen(false)}
          className="relative flex items-center h-11 rounded-lg bg-[var(--color-panel)] hover:bg-[var(--color-surface-hover)] transition-colors duration-300 overflow-hidden"
          title={isCollapsed ? 'Profile Settings' : undefined}
        >
          {/* Fixed position avatar */}
          <div className="absolute left-1 w-9 h-9 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white text-[13px] font-bold shadow-sm ring-2 ring-white/5">
            SA
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
              Super Admin
            </p>
            <p className="text-[11px] text-[var(--color-text-muted)] whitespace-nowrap font-medium mt-0.5 leading-tight">
              admin@reporthub.com
            </p>
          </div>
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
          className="lg:hidden fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-500 ease-in-out"
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
        <NavContent isCollapsed={!isHovered} />
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
        <NavContent isCollapsed={false} />
      </aside>
    </>
  );
};
