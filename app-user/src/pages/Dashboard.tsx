import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { TrendingUp, TrendingDown, Users, FolderKanban, Activity, Globe, Eye } from 'lucide-react';
import { currentUser } from '../data/currentUser';
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

      <div className="relative flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs xs:text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">
            {title}
          </p>
          <p className="text-2xl xs:text-3xl font-bold text-[var(--color-title)] mb-3 tracking-tight">
            {value}
          </p>
          {change !== undefined && (
            <div className="flex items-center gap-1.5">
              {isPositive && <TrendingUp size={14} className="text-[var(--color-success)]" strokeWidth={2.5} aria-hidden="true" />}
              {isNegative && <TrendingDown size={14} className="text-[var(--color-danger)]" strokeWidth={2.5} aria-hidden="true" />}
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
        <div className="w-10 h-10 xs:w-12 xs:h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-accent)]/10 flex items-center justify-center text-[var(--color-primary)] group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
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
  const navigate = useNavigate();

  const activities: ActivityItem[] = [
    { id: 1, title: 'Q4 Financial Report generated', time: '2 hours ago', user: 'Sarah Chen', type: 'report' },
    { id: 2, title: 'New team member added', time: '5 hours ago', user: 'System', type: 'share' },
    { id: 3, title: 'Sales Dashboard updated', time: '1 day ago', user: 'Michael Torres', type: 'report' },
    { id: 4, title: 'Team permissions modified', time: '2 days ago', user: 'Admin', type: 'update' },
    { id: 5, title: 'Marketing Report exported', time: '3 days ago', user: 'Jessica Liu', type: 'report' },
  ];

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

  return (
    <Card elevated>
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-bold text-[var(--color-title)] tracking-tight">Recent Activity</h3>
        <button
          onClick={() => navigate('/app/reports')}
          className="text-xs font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-1 rounded"
          aria-label="View all activities"
        >
          View All
        </button>
      </div>
      <div className="space-y-3 xs:space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-2 xs:gap-3 pb-3 xs:pb-4 border-b border-[var(--color-border)] last:border-0 last:pb-0">
            <div className="mt-1">
              {getTypeBadge(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-[var(--color-text)] font-semibold truncate">{activity.title}</p>
              <div className="flex items-center gap-2 mt-1">
                {activity.user && (
                  <>
                    <span className="text-xs text-[var(--color-text-muted)] font-medium">{activity.user}</span>
                    <span className="text-[var(--color-border-strong)]">•</span>
                  </>
                )}
                <span className="text-xs text-[var(--color-text-muted)] font-medium">{activity.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const isOrganization = currentUser.role === 'organization';

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
    <div className="space-y-6 xs:space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-3 xs:gap-0">
        <div>
          <h1 className="text-2xl xs:text-3xl font-bold text-[var(--color-title)] tracking-tight">Dashboard</h1>
          <p className="text-sm xs:text-base text-[var(--color-text-secondary)] mt-1 xs:mt-2 font-medium">
            {isOrganization ? `${currentUser.companyName} Overview` : 'Your workspace overview'}
          </p>
        </div>
        <div className="text-xs xs:text-sm text-[var(--color-text-muted)] font-medium">
          Last updated: {formatDate(new Date().toISOString())}
        </div>
      </div>

      {/* Stats Grid - Responsive: 1 col mobile, 2 col tablet, 4 col desktop */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-5">
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
      </div>

      {/* Recent Reports */}
      <div>
        <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-3 xs:gap-0 mb-4 xs:mb-5">
          <div>
            <h2 className="text-lg xs:text-xl font-bold text-[var(--color-title)] tracking-tight">Recent Reports</h2>
            <p className="text-xs xs:text-sm text-[var(--color-text-secondary)] mt-1 font-medium">
              Recently updated reports and dashboards
            </p>
          </div>
          <button
            onClick={() => navigate('/app/reports')}
            className="text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-1 rounded self-start xs:self-auto"
            aria-label="View all reports"
          >
            View All →
          </button>
        </div>
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xs:gap-5">
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
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 xs:gap-6">
        {/* Recent Activity - Takes 2 columns */}
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>

        {/* Quick Actions & Team Overview */}
        <div className="space-y-5 xs:space-y-6">
          {/* Quick Actions */}
          <Card elevated>
            <h3 className="text-base font-bold text-[var(--color-title)] tracking-tight mb-4 xs:mb-5">Quick Actions</h3>
            <div className="space-y-2 xs:space-y-3">
              <button
                onClick={() => navigate('/app/reports')}
                className="w-full text-left px-3 xs:px-4 py-2.5 xs:py-3 rounded-xl border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition-all text-sm font-semibold text-[var(--color-text)] hover:text-[var(--color-primary)] flex items-center gap-2 xs:gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-1"
                aria-label="Create new report"
              >
                <div className="w-8 h-8 xs:w-9 xs:h-9 rounded-lg bg-[var(--color-primary)]/10 group-hover:bg-[var(--color-primary)]/20 flex items-center justify-center transition-colors" aria-hidden="true">
                  <FolderKanban size={16} strokeWidth={2} className="text-[var(--color-primary)]" />
                </div>
                Create New Report
              </button>
              {isOrganization && (
                <button
                  onClick={() => navigate('/app/team')}
                  className="w-full text-left px-3 xs:px-4 py-2.5 xs:py-3 rounded-xl border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition-all text-sm font-semibold text-[var(--color-text)] hover:text-[var(--color-primary)] flex items-center gap-2 xs:gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-1"
                  aria-label="Manage team"
                >
                  <div className="w-8 h-8 xs:w-9 xs:h-9 rounded-lg bg-[var(--color-primary)]/10 group-hover:bg-[var(--color-primary)]/20 flex items-center justify-center transition-colors" aria-hidden="true">
                    <Users size={16} strokeWidth={2} className="text-[var(--color-primary)]" />
                  </div>
                  Manage Team
                </button>
              )}
              <button
                onClick={() => navigate('/app/reports')}
                className="w-full text-left px-3 xs:px-4 py-2.5 xs:py-3 rounded-xl border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition-all text-sm font-semibold text-[var(--color-text)] hover:text-[var(--color-primary)] flex items-center gap-2 xs:gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-1"
                aria-label="View all reports"
              >
                <div className="w-8 h-8 xs:w-9 xs:h-9 rounded-lg bg-[var(--color-primary)]/10 group-hover:bg-[var(--color-primary)]/20 flex items-center justify-center transition-colors" aria-hidden="true">
                  <Eye size={16} strokeWidth={2} className="text-[var(--color-primary)]" />
                </div>
                View All Reports
              </button>
            </div>
          </Card>

          {/* Team Overview - Only for organizations */}
          {isOrganization && (
            <Card elevated>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-[var(--color-title)] tracking-tight">Team Overview</h3>
                <button
                  onClick={() => navigate('/app/team')}
                  className="text-xs font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors"
                >
                  View All
                </button>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--color-success)]/5 border border-[var(--color-success)]/20">
                  <span className="text-sm font-semibold text-[var(--color-text)]">Active</span>
                  <span className="text-lg font-bold text-[var(--color-success)]">{activeMembers}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--color-warning)]/5 border border-[var(--color-warning)]/20">
                  <span className="text-sm font-semibold text-[var(--color-text)]">Pending</span>
                  <span className="text-lg font-bold text-[var(--color-warning)]">
                    {teamMembers.filter(m => m.status === 'pending').length}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--color-panel)]">
                  <span className="text-sm font-semibold text-[var(--color-text)]">Total Members</span>
                  <span className="text-lg font-bold text-[var(--color-title)]">{totalMembers}</span>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
