import React from 'react';
import { Card } from '../components/common/Card';
import { TrendingUp, TrendingDown, Users, LayoutDashboard, Eye } from 'lucide-react';
import { platformAnalytics, clients, publishedDashboards } from '../data/mockData';

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  trend: 'up' | 'down';
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon, trend }) => {
  return (
    <Card elevated>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">
            {title}
          </p>
          <p className="text-3xl font-bold text-[var(--color-title)] mb-3 tracking-tight">{value}</p>
          <div className="flex items-center gap-1.5">
            {trend === 'up' ? (
              <TrendingUp size={14} className="text-[var(--color-success)]" strokeWidth={2.5} />
            ) : (
              <TrendingDown size={14} className="text-[var(--color-danger)]" strokeWidth={2.5} />
            )}
            <span
              className={`text-xs font-semibold ${
                trend === 'up' ? 'text-[var(--color-success)]' : 'text-[var(--color-danger)]'
              }`}
            >
              {trend === 'up' ? '+' : ''}
              {change}%
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-medium">vs last month</span>
          </div>
        </div>
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-accent)]/10 flex items-center justify-center text-[var(--color-primary)]">
          {icon}
        </div>
      </div>
    </Card>
  );
};

export const Analytics: React.FC = () => {
  const totalViews = publishedDashboards.reduce((sum, d) => sum + d.views, 0);
  const activeClients = clients.filter((c) => c.status === 'active').length;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[var(--color-title)] tracking-tight">
          Platform Analytics
        </h1>
        <p className="text-base text-[var(--color-text-secondary)] mt-2 font-medium">
          Comprehensive platform performance metrics and insights
        </p>
      </div>

      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <MetricCard
          title="Total Users"
          value={platformAnalytics.totalUsers}
          change={24.5}
          icon={<Users size={20} strokeWidth={1.5} />}
          trend="up"
        />
        <MetricCard
          title="Active Dashboards"
          value={platformAnalytics.totalDashboards}
          change={18.3}
          icon={<LayoutDashboard size={20} strokeWidth={1.5} />}
          trend="up"
        />
        <MetricCard
          title="Total Views"
          value={totalViews.toLocaleString()}
          change={32.7}
          icon={<Eye size={20} strokeWidth={1.5} />}
          trend="up"
        />
      </div>

      {/* Revenue & Growth */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card elevated>
          <h3 className="text-base font-bold text-[var(--color-title)] tracking-tight mb-5">
            Revenue Overview
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-[var(--color-text)]">
                Monthly Revenue
              </span>
              <span className="text-2xl font-bold text-[var(--color-primary)]">
                ${platformAnalytics.revenue.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-[var(--color-text)]">Growth Rate</span>
              <div className="flex items-center gap-2">
                <TrendingUp size={16} className="text-[var(--color-success)]" />
                <span className="text-lg font-bold text-[var(--color-success)]">
                  +{platformAnalytics.growthRate}%
                </span>
              </div>
            </div>
            <div className="pt-4 border-t border-[var(--color-border)]">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[var(--color-text)]">
                  Avg. Revenue per User
                </span>
                <span className="text-lg font-bold text-[var(--color-title)]">
                  ${Math.round(platformAnalytics.revenue / platformAnalytics.totalUsers)}
                </span>
              </div>
            </div>
          </div>
        </Card>

        <Card elevated>
          <h3 className="text-base font-bold text-[var(--color-title)] tracking-tight mb-5">
            User Engagement
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-[var(--color-text)]">Active Users</span>
              <span className="text-2xl font-bold text-[var(--color-primary)]">
                {platformAnalytics.activeUsers}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-[var(--color-text)]">
                Engagement Rate
              </span>
              <span className="text-lg font-bold text-[var(--color-success)]">
                {Math.round((platformAnalytics.activeUsers / platformAnalytics.totalUsers) * 100)}%
              </span>
            </div>
            <div className="pt-4 border-t border-[var(--color-border)]">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[var(--color-text)]">
                  Avg. Views per Dashboard
                </span>
                <span className="text-lg font-bold text-[var(--color-title)]">
                  {Math.round(totalViews / platformAnalytics.totalDashboards)}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Plan Distribution */}
      <Card elevated>
        <h3 className="text-base font-bold text-[var(--color-title)] tracking-tight mb-5">
          Plan Distribution
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {['Starter', 'Professional', 'Enterprise'].map((plan) => {
            const count = clients.filter((c) => c.plan === plan).length;
            const percentage = Math.round((count / clients.length) * 100);
            return (
              <div key={plan} className="p-4 rounded-lg bg-[var(--color-panel)] border border-[var(--color-border)]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-[var(--color-text)]">{plan}</span>
                  <span className="text-lg font-bold text-[var(--color-primary)]">{count}</span>
                </div>
                <div className="w-full bg-[var(--color-border)] rounded-full h-2 mb-2">
                  <div
                    className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="text-xs text-[var(--color-text-muted)] font-medium">
                  {percentage}% of total
                </span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Client Status */}
      <Card elevated>
        <h3 className="text-base font-bold text-[var(--color-title)] tracking-tight mb-5">
          Client Status Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="flex items-center justify-between p-4 rounded-lg bg-[var(--color-success-light)] border border-[var(--color-success-border)]">
            <span className="text-sm font-semibold text-[var(--color-text)]">Active</span>
            <span className="text-2xl font-bold text-[var(--color-success)]">{activeClients}</span>
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg bg-[var(--color-warning-light)] border border-[var(--color-warning-border)]">
            <span className="text-sm font-semibold text-[var(--color-text)]">Inactive</span>
            <span className="text-2xl font-bold text-[var(--color-warning)]">
              {clients.filter((c) => c.status === 'inactive').length}
            </span>
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg bg-[var(--color-danger-light)] border border-[var(--color-danger-border)]">
            <span className="text-sm font-semibold text-[var(--color-text)]">Suspended</span>
            <span className="text-2xl font-bold text-[var(--color-danger)]">
              {clients.filter((c) => c.status === 'suspended').length}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};
