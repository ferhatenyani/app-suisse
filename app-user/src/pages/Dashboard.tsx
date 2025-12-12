import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { TrendingUp, TrendingDown, Users, FolderKanban, Activity, Globe, Eye, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { UpgradeModal } from '../components/ui/UpgradeModal';
import { dashboards } from '../data/dashboards';
import { teamMembers } from '../data/teamMembers';
import { formatDate } from '../utils/formatters';
import type { ActivityType } from '../types';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: React.ReactNode;
}

// Memoized StatCard component for performance
const StatCard = React.memo<StatCardProps>(({ title, value, change, changeLabel, icon }) => {
  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;

  return (
    <Card className="relative overflow-hidden group" elevated>
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />

      <div className="relative flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">
            {title}
          </p>
          <p className="text-2xl sm:text-3xl lg:text-3xl font-bold text-[var(--color-title)] mb-2 sm:mb-3 tracking-tight truncate">
            {value}
          </p>
          {change !== undefined && (
            <div className="flex items-center gap-1.5 flex-wrap">
              {isPositive && <TrendingUp size={14} className="text-[var(--color-success)] flex-shrink-0" strokeWidth={2.5} aria-hidden="true" />}
              {isNegative && <TrendingDown size={14} className="text-[var(--color-danger)] flex-shrink-0" strokeWidth={2.5} aria-hidden="true" />}
              <span className={`text-xs font-semibold ${
                isPositive ? 'text-[var(--color-success)]' : isNegative ? 'text-[var(--color-danger)]' : 'text-[var(--color-text-secondary)]'
              }`}>
                {isPositive ? '+' : ''}{change}%
              </span>
              {changeLabel && (
                <span className="text-xs text-[var(--color-text-muted)] font-medium">{changeLabel}</span>
              )}
            </div>
          )}
        </div>
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-accent)]/10 flex items-center justify-center text-[var(--color-primary)] group-hover:scale-110 transition-transform duration-300 flex-shrink-0" aria-hidden="true">
          {icon}
        </div>
      </div>
    </Card>
  );
});

StatCard.displayName = 'StatCard';

interface ActivityItem {
  id: number;
  title: string;
  time: string;
  user?: string;
  type: ActivityType;
}

const RecentActivity: React.FC = () => {
  const [activities, setActivities] = useState<ActivityItem[]>([
    { id: 1, title: 'Q4 Financial Report generated', time: '2 hours ago', user: 'Sarah Chen', type: 'report' },
    { id: 2, title: 'New team member added', time: '5 hours ago', user: 'System', type: 'share' },
    { id: 3, title: 'Sales Dashboard updated', time: '1 day ago', user: 'Michael Torres', type: 'report' },
    { id: 4, title: 'Team permissions modified', time: '2 days ago', user: 'Admin', type: 'update' },
    { id: 5, title: 'Marketing Report exported', time: '3 days ago', user: 'Jessica Liu', type: 'report' },
  ]);

  const getTypeBadge = (type: ActivityType) => {
    const badgeConfig: Record<ActivityType, { variant: 'info' | 'success' | 'neutral' | 'warning', icon: React.ReactNode, label: string }> = {
      report: { variant: 'info', icon: <FolderKanban size={10} />, label: 'Report' },
      share: { variant: 'success', icon: <Users size={10} />, label: 'Share' },
      comment: { variant: 'neutral', icon: <Activity size={10} />, label: 'Comment' },
      update: { variant: 'warning', icon: <Activity size={10} />, label: 'Update' },
    };

    const config = badgeConfig[type];
    return <Badge variant={config.variant} size="sm" icon={config.icon}>{config.label}</Badge>;
  };

  const handleDeleteActivity = (id: number) => {
    setActivities(activities.filter(activity => activity.id !== id));
  };

  const handleClear = () => {
    // In a real app, this would clear the activity list
    setActivities([]);
  };

  return (
    <Card elevated className="h-full">
      <div className="flex items-center justify-between gap-4 mb-6">
        <h3 className="text-base sm:text-lg font-bold text-[var(--color-title)] tracking-tight">Recent Activity</h3>
        <button
          onClick={handleClear}
          className="px-3 py-2 rounded-lg text-xs font-semibold text-[var(--color-text)] bg-[var(--color-panel)] hover:bg-[var(--color-danger)]/10 hover:text-[var(--color-danger)] border border-[var(--color-border)] hover:border-[var(--color-danger)] transition-all duration-200 flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-danger)] focus-visible:ring-offset-1"
          aria-label="Clear all activities"
        >
          <Trash2 size={14} strokeWidth={2} className="group-hover:scale-110 transition-transform duration-200" />
          <span className="hidden sm:inline">Clear All</span>
        </button>
      </div>
      {activities.length === 0 ? (
        <div className="text-center py-12">
          <Activity size={48} className="mx-auto text-[var(--color-text-muted)] opacity-50 mb-3" />
          <p className="text-sm text-[var(--color-text-muted)] font-medium">No recent activities</p>
        </div>
      ) : (
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 pb-4 border-b border-[var(--color-border)] last:border-0 last:pb-0 animate-fadeIn group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="mt-1 flex-shrink-0">
                {getTypeBadge(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base text-[var(--color-text)] font-semibold truncate group-hover:text-[var(--color-primary)] transition-colors duration-200">{activity.title}</p>
                <div className="flex items-center flex-wrap gap-2 mt-1.5">
                  {activity.user && (
                    <>
                      <span className="text-sm text-[var(--color-text-muted)] font-medium">{activity.user}</span>
                      <span className="text-[var(--color-border-strong)]">•</span>
                    </>
                  )}
                  <span className="text-sm text-[var(--color-text-muted)] font-medium">{activity.time}</span>
                </div>
              </div>
              <button
                onClick={() => handleDeleteActivity(activity.id)}
                className="mt-1 p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-danger)] hover:bg-[var(--color-danger)]/10 active:bg-[var(--color-danger)]/20 active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-danger)] focus-visible:ring-offset-1 flex-shrink-0"
                aria-label={`Delete ${activity.title}`}
              >
                <Trash2 size={16} strokeWidth={2} />
              </button>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const isOrganization = user?.role === 'organization';

  React.useEffect(() => {
    window.scrollTo(0, 0);
    const mainElement = document.querySelector('main');
    if (mainElement) mainElement.scrollTo(0, 0);
  }, []);

  // Calculate real stats from data with error handling
  const totalReports = dashboards.length;
  const publicReports = dashboards.filter(d => d.isPublic).length;
  const activeMembers = isOrganization ? teamMembers.filter(m => m.status === 'active').length : 1;
  const totalMembers = isOrganization ? teamMembers.length : 1;
  const recentUpdates = dashboards.filter(d => {
    try {
      const daysSinceUpdate = (Date.now() - new Date(d.updatedAt).getTime()) / (1000 * 60 * 60 * 24);
      return daysSinceUpdate <= 7;
    } catch (error) {
      console.error('Invalid date in dashboard:', d.id, error);
      return false;
    }
  }).length;

  return (
    <div className="min-h-screen pb-8 animate-fadeIn">
      {/* Header Section - Flexbox with consistent spacing */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--color-title)] tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm sm:text-base text-[var(--color-text-secondary)] mt-2 font-medium">
            {isOrganization && user?.companyName ? `${user.companyName} Overview` : 'Your workspace overview'}
          </p>
        </div>
        <div className="text-xs sm:text-sm text-[var(--color-text-muted)] font-medium whitespace-nowrap">
          Last updated: {formatDate(new Date().toISOString())}
        </div>
      </header>

      {/* Stats Grid - Responsive: 1 col mobile, 2 col tablet, 4 col desktop */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" aria-label="Dashboard statistics">
        <StatCard
          title="Total Reports"
          value={totalReports}
          change={12.5}
          changeLabel="vs last month"
          icon={<FolderKanban size={20} strokeWidth={1.5} />}
        />
        <StatCard
          title={isOrganization ? "Team Members" : "Active User"}
          value={isOrganization ? `${activeMembers}/${totalMembers}` : activeMembers}
          change={isOrganization ? 8.3 : undefined}
          changeLabel={isOrganization ? "vs last month" : undefined}
          icon={<Users size={20} strokeWidth={1.5} />}
        />
        <StatCard
          title="Recent Updates"
          value={recentUpdates}
          change={-3.2}
          changeLabel="vs last week"
          icon={<Activity size={20} strokeWidth={1.5} />}
        />
        <StatCard
          title="Public Reports"
          value={publicReports}
          change={15.7}
          changeLabel="shared globally"
          icon={<Globe size={20} strokeWidth={1.5} />}
        />
      </section>

      {/* Recent Reports - Full width section */}
      <section className="mb-8" aria-label="Recent reports">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[var(--color-title)] tracking-tight">
              Recent Reports
            </h2>
            <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1 font-medium">
              Recently updated reports and dashboards
            </p>
          </div>
          <button
            onClick={() => navigate('/app/reports')}
            className="text-xs sm:text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-1 rounded self-start sm:self-auto"
            aria-label="View all reports"
          >
            View All →
          </button>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {dashboards.slice(0, 4).map((dashboard, index) => (
            <Card
              key={dashboard.id}
              hover
              noPadding
              onClick={() => navigate(`/app/reports/${dashboard.id}`)}
              className={`group overflow-hidden cursor-pointer stagger-${index + 1}`}
              aria-label={`Open ${dashboard.title} report`}
            >
              <div className="aspect-video bg-[var(--color-panel)] overflow-hidden relative">
                <img
                  src={dashboard.thumbnailUrl}
                  alt={dashboard.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                {dashboard.isPublic && (
                  <Badge variant="success" size="sm" icon={<Globe size={10} />} className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm shadow-sm">
                    Public
                  </Badge>
                )}
              </div>
              <div className="p-3 xs:p-4">
                <h3 className="text-sm font-bold text-[var(--color-title)] mb-1 line-clamp-1 group-hover:text-[var(--color-primary)] transition-colors">
                  {dashboard.title}
                </h3>
                <p className="text-xs text-[var(--color-text-muted)] font-medium">
                  Updated {formatDate(dashboard.updatedAt, { month: 'short', day: 'numeric' })}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Quick Actions & Team Overview - Side by side layout */}
      <section className={`grid grid-cols-1 ${isOrganization ? 'lg:grid-cols-2' : ''} gap-6 mb-8`} aria-label="Quick actions and team overview">
        {/* Quick Actions */}
        <Card elevated className="h-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base sm:text-lg font-bold text-[var(--color-title)] tracking-tight">
              Quick Actions
            </h3>
          </div>
          <div className={`flex-1 ${isOrganization ? 'space-y-3' : 'grid grid-cols-1 sm:grid-cols-3 gap-3'}`}>
            <button
              onClick={() => navigate('/app/reports')}
              className="w-full text-left p-4 rounded-xl bg-gradient-to-br from-[var(--color-primary)]/5 to-[var(--color-primary)]/10 border-2 border-[var(--color-border)] hover:border-[var(--color-primary)] transition-all duration-300 text-sm font-semibold text-[var(--color-text)] hover:text-[var(--color-primary)] flex items-center justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 hover:shadow-lg hover:shadow-[var(--color-primary)]/10 hover:-translate-y-0.5"
              aria-label="Create new report"
            >
              <div>
                <span className="text-xs text-[var(--color-text-muted)] font-medium uppercase tracking-wider block mb-1">Create New</span>
                <span className="block">Report</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center transition-all duration-300 flex-shrink-0 group-hover:scale-110 group-hover:rotate-3" aria-hidden="true">
                <FolderKanban size={20} strokeWidth={2} className="text-[var(--color-primary)]" />
              </div>
            </button>
            {isOrganization && (
              <button
                onClick={() => navigate('/app/team')}
                className="w-full text-left p-4 rounded-xl bg-gradient-to-br from-[var(--color-accent)]/5 to-[var(--color-accent)]/10 border-2 border-[var(--color-border)] hover:border-[var(--color-primary)] transition-all duration-300 text-sm font-semibold text-[var(--color-text)] hover:text-[var(--color-primary)] flex items-center justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 hover:shadow-lg hover:shadow-[var(--color-primary)]/10 hover:-translate-y-0.5"
                aria-label="Manage team"
              >
                <div>
                  <span className="text-xs text-[var(--color-text-muted)] font-medium uppercase tracking-wider block mb-1">Manage</span>
                  <span className="block">Team</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center transition-all duration-300 flex-shrink-0 group-hover:scale-110 group-hover:rotate-3" aria-hidden="true">
                  <Users size={20} strokeWidth={2} className="text-[var(--color-primary)]" />
                </div>
              </button>
            )}
            <button
              onClick={() => navigate('/app/reports')}
              className="w-full text-left p-4 rounded-xl bg-gradient-to-br from-[var(--color-primary)]/5 to-[var(--color-accent)]/10 border-2 border-[var(--color-border)] hover:border-[var(--color-primary)] transition-all duration-300 text-sm font-semibold text-[var(--color-text)] hover:text-[var(--color-primary)] flex items-center justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 hover:shadow-lg hover:shadow-[var(--color-primary)]/10 hover:-translate-y-0.5"
              aria-label="View all reports"
            >
              <div>
                <span className="text-xs text-[var(--color-text-muted)] font-medium uppercase tracking-wider block mb-1">View All</span>
                <span className="block">Reports</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center transition-all duration-300 flex-shrink-0 group-hover:scale-110 group-hover:rotate-3" aria-hidden="true">
                <Eye size={20} strokeWidth={2} className="text-[var(--color-primary)]" />
              </div>
            </button>
          </div>
        </Card>

        {/* Team Overview - Shown for both, but blurred for individuals */}
        {(isOrganization || user?.role === 'individual') && (
          <div className="relative">
            <Card elevated className={`h-full flex flex-col ${user?.role === 'individual' ? 'overflow-hidden' : ''}`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-base sm:text-lg font-bold text-[var(--color-title)] tracking-tight ${user?.role === 'individual' ? 'blur-sm' : ''}`}>
                  Team Overview
                </h3>
                <button
                  onClick={() => user?.role === 'individual' ? setShowUpgradeModal(true) : navigate('/app/team')}
                  className={`text-xs font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors px-2 py-1 rounded hover:bg-[var(--color-primary)]/5 ${user?.role === 'individual' ? 'blur-sm' : ''}`}
                >
                  View All →
                </button>
              </div>
              <div className={`flex-1 space-y-3 ${user?.role === 'individual' ? 'blur-sm' : ''}`}>
                <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-br from-[var(--color-success)]/5 to-[var(--color-success)]/10 border-2 border-[var(--color-success)]/20 hover:border-[var(--color-success)]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[var(--color-success)]/10 group cursor-pointer hover:-translate-y-0.5">
                  <div>
                    <span className="text-xs text-[var(--color-text-muted)] font-medium uppercase tracking-wider block mb-1">Active Members</span>
                    <span className="text-sm font-semibold text-[var(--color-success)] block">{activeMembers}</span>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-success)]/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 flex-shrink-0">
                    <Users size={20} className="text-[var(--color-success)]" strokeWidth={2} />
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-br from-[var(--color-warning)]/5 to-[var(--color-warning)]/10 border-2 border-[var(--color-warning)]/20 hover:border-[var(--color-warning)]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[var(--color-warning)]/10 group cursor-pointer hover:-translate-y-0.5">
                  <div>
                    <span className="text-xs text-[var(--color-text-muted)] font-medium uppercase tracking-wider block mb-1">Pending Invites</span>
                    <span className="text-sm font-semibold text-[var(--color-warning)] block">
                      {teamMembers.filter(m => m.status === 'pending').length}
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-warning)]/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 flex-shrink-0">
                    <Activity size={20} className="text-[var(--color-warning)]" strokeWidth={2} />
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-br from-[var(--color-primary)]/5 to-[var(--color-accent)]/10 border-2 border-[var(--color-border)] hover:border-[var(--color-primary)]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[var(--color-primary)]/10 group cursor-pointer hover:-translate-y-0.5">
                  <div>
                    <span className="text-xs text-[var(--color-text-muted)] font-medium uppercase tracking-wider block mb-1">Total Members</span>
                    <span className="text-sm font-semibold text-[var(--color-title)] block">{totalMembers}</span>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 flex-shrink-0">
                    <Users size={20} className="text-[var(--color-primary)]" strokeWidth={2} />
                  </div>
                </div>
              </div>
            </Card>

            {/* Upgrade overlay for individual users */}
            {user?.role === 'individual' && (
              <button
                onClick={() => setShowUpgradeModal(true)}
                className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-[2px] hover:bg-white/70 transition-all duration-300 cursor-pointer group rounded-xl"
              >
                <div className="bg-white rounded-xl shadow-xl p-6 border-2 border-[var(--color-primary)]/20 group-hover:border-[var(--color-primary)]/40 transition-all duration-300 group-hover:scale-105">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] text-white mb-3">
                      <Users size={24} strokeWidth={2} />
                    </div>
                    <h4 className="text-lg font-bold text-[var(--color-title)] mb-1">Team Features</h4>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-3">Upgrade to Pro to unlock team collaboration</p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white text-sm font-semibold rounded-lg group-hover:shadow-lg transition-all duration-300">
                      <span>Upgrade Now</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </button>
            )}
          </div>
        )}
      </section>

      {/* Recent Activity - Full width at bottom */}
      <section className="mb-8" aria-label="Recent activity">
        <RecentActivity />
      </section>

      {/* Upgrade Modal */}
      <UpgradeModal isOpen={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} />
    </div>
  );
};
