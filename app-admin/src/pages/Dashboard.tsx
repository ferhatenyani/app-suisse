import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import {
  Users,
  LayoutDashboard,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  Clock,
  ChevronDown,
} from 'lucide-react';
import { platformAnalytics, pendingAccounts as initialPendingAccounts, publishedDashboards } from '../data/mockData';
import { ClientOnboardingModal, OnboardingData } from '../components/modals/ClientOnboardingModal';
import { DeleteConfirmationModal } from '../components/modals/DeleteConfirmationModal';
import type { PendingAccount } from '../data/mockData';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, changeLabel, icon, trend }) => {
  return (
    <Card className="relative overflow-hidden group" elevated>
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">
            {title}
          </p>
          <p className="text-2xl sm:text-3xl lg:text-3xl font-bold text-[var(--color-title)] mb-2 sm:mb-3 tracking-tight truncate">{value}</p>
          {change !== undefined && (
            <div className="flex items-center gap-1.5 flex-wrap">
              {trend === 'up' && (
                <TrendingUp size={14} className="text-[var(--color-success)] flex-shrink-0" strokeWidth={2.5} />
              )}
              {trend === 'down' && (
                <TrendingDown size={14} className="text-[var(--color-danger)] flex-shrink-0" strokeWidth={2.5} />
              )}
              <span
                className={`text-xs font-semibold ${
                  trend === 'up'
                    ? 'text-[var(--color-success)]'
                    : trend === 'down'
                    ? 'text-[var(--color-danger)]'
                    : 'text-[var(--color-text-secondary)]'
                }`}
              >
                {trend === 'up' ? '+' : ''}
                {change}%
              </span>
              {changeLabel && (
                <span className="text-xs text-[var(--color-text-muted)] font-medium">{changeLabel}</span>
              )}
            </div>
          )}
        </div>
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-accent)]/10 flex items-center justify-center text-[var(--color-primary)] group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
          {icon}
        </div>
      </div>
    </Card>
  );
};

type ServiceStatus = 'online' | 'offline';
type PlatformStatus = 'active' | 'maintenance';

interface StatusSelectorProps {
  value: ServiceStatus | PlatformStatus;
  onChange: (value: ServiceStatus | PlatformStatus) => void;
  options: Array<{ value: ServiceStatus | PlatformStatus; label: string; color: string }>;
  disabled?: boolean;
}

const StatusSelector: React.FC<StatusSelectorProps> = ({ value, onChange, options, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="relative flex-shrink-0">
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-md border transition-all text-xs font-semibold ${
          disabled
            ? 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-60'
            : 'bg-white border-[var(--color-border)] hover:border-[var(--color-primary)] cursor-pointer'
        }`}
      >
        <div
          className={`w-2 h-2 rounded-full flex-shrink-0`}
          style={{ backgroundColor: selectedOption?.color }}
        ></div>
        <span className="text-[var(--color-text)] whitespace-nowrap">{selectedOption?.label}</span>
        {!disabled && <ChevronDown size={14} className="text-[var(--color-text-muted)] flex-shrink-0" />}
      </button>
      {isOpen && !disabled && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-1 w-40 bg-white border border-[var(--color-border)] rounded-lg shadow-lg z-20 overflow-hidden">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-[var(--color-primary)]/5 transition-colors text-xs font-semibold text-[var(--color-text)]"
              >
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: option.color }}
                ></div>
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  // Pending accounts state management
  const [pendingAccounts, setPendingAccounts] = useState(initialPendingAccounts);
  const pendingCount = pendingAccounts.filter((a) => a.status === 'pending').length;

  // Modal states
  const [selectedAccount, setSelectedAccount] = useState<PendingAccount | null>(null);
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState<PendingAccount | null>(null);

  // Service status states
  const [powerBIStatus, setPowerBIStatus] = useState<ServiceStatus>('online');
  const [vpsStatus, setVPSStatus] = useState<ServiceStatus>('online');
  const [manualPlatformStatus, setManualPlatformStatus] = useState<PlatformStatus>('active');

  // Computed platform status based on services
  const platformStatus: PlatformStatus =
    powerBIStatus === 'offline' || vpsStatus === 'offline'
      ? 'maintenance'
      : manualPlatformStatus;

  // Check if platform status is forced by service failures
  const isPlatformStatusForced = powerBIStatus === 'offline' || vpsStatus === 'offline';

  // Handler functions
  const handleApproveClick = (account: PendingAccount) => {
    setSelectedAccount(account);
    setIsOnboardingModalOpen(true);
  };

  const handleRejectClick = (account: PendingAccount) => {
    setAccountToDelete(account);
    setIsDeleteModalOpen(true);
  };

  const handleApproveAccount = (accountId: string, data: OnboardingData) => {
    // Remove from pending accounts
    setPendingAccounts(prev => prev.filter(acc => acc.id !== accountId));
    // In a real app, this would move the account to active clients
    console.log('Account approved:', accountId, data);
  };

  const handleUpdateAccount = (accountId: string, updates: Partial<PendingAccount>) => {
    setPendingAccounts(prev =>
      prev.map(acc => (acc.id === accountId ? { ...acc, ...updates } : acc))
    );
  };

  const handleDeleteAccount = () => {
    if (accountToDelete) {
      setPendingAccounts(prev => prev.filter(acc => acc.id !== accountToDelete.id));
      console.log('Account rejected:', accountToDelete.id);
    }
  };

  return (
    <>
      <div className="min-h-screen pb-8 animate-fadeIn">
        {/* Header Section - Flexbox with consistent spacing */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--color-title)] tracking-tight">
              Admin Dashboard
            </h1>
            <p className="text-sm sm:text-base text-[var(--color-text-secondary)] mt-2 font-medium">
              Platform overview and key metrics
            </p>
          </div>
          <div className="text-xs sm:text-sm text-[var(--color-text-muted)] font-medium whitespace-nowrap">
            Last updated:{' '}
            {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
        </header>

        {/* Stats Grid - 3 column responsive grid with uniform spacing */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8" aria-label="Platform statistics">
          <StatCard
            title="Total Clients"
            value={platformAnalytics.totalUsers}
            change={platformAnalytics.growthRate}
            changeLabel="vs last month"
            trend="up"
            icon={<Users size={20} strokeWidth={1.5} />}
          />
          <StatCard
            title="Total Dashboards"
            value={platformAnalytics.totalDashboards}
            change={18.5}
            changeLabel="vs last month"
            trend="up"
            icon={<LayoutDashboard size={20} strokeWidth={1.5} />}
          />
          <StatCard
            title="Monthly Revenue"
            value={`$${platformAnalytics.revenue.toLocaleString()}`}
            change={15.2}
            changeLabel="vs last month"
            trend="up"
            icon={<DollarSign size={20} strokeWidth={1.5} />}
          />
        </section>

        {/* Pending Accounts - Full width section */}
        <section className="mb-8" aria-label="Pending accounts">
          <Card elevated>
            <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
              <div className="flex items-center gap-3">
                <h3 className="text-sm sm:text-base font-bold text-[var(--color-title)] tracking-tight">
                  Pending Account Requests
                </h3>
                {pendingCount > 0 && <Badge variant="warning">{pendingCount} pending</Badge>}
              </div>
              <button
                onClick={() => navigate('/admin/pending-accounts')}
                className="text-xs sm:text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors self-start sm:self-auto"
              >
                View All →
              </button>
            </header>
            <div className="space-y-4">
              {pendingAccounts.slice(0, 5).map((account) => (
                <div
                  key={account.id}
                  className="flex flex-col sm:flex-row items-start gap-3 pb-4 border-b border-[var(--color-border)] last:border-0 last:pb-0"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {account.companyName.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0 w-full">
                    <p className="text-sm text-[var(--color-text)] font-semibold truncate">
                      {account.companyName}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)] font-medium mt-0.5 truncate">
                      {account.contactPerson} • {account.email}
                    </p>
                    <div className="flex items-center flex-wrap gap-2 mt-2">
                      <Badge variant="info" size="sm">
                        {account.plan}
                      </Badge>
                      <span className="text-xs text-[var(--color-text-muted)] flex items-center">
                        <Clock size={12} className="inline mr-1" />
                        {new Date(account.requestedDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => handleApproveClick(account)}
                      className="flex-1 sm:flex-none px-3 py-1.5 text-xs font-semibold text-[var(--color-success)] bg-[var(--color-success-light)] border border-[var(--color-success-border)] rounded-md hover:bg-[var(--color-success)]/10 transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleRejectClick(account)}
                      className="flex-1 sm:flex-none px-3 py-1.5 text-xs font-semibold text-[var(--color-danger)] bg-[var(--color-danger-light)] border border-[var(--color-danger-border)] rounded-md hover:bg-[var(--color-danger)]/10 transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Platform Health and Quick Actions - Two column grid */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8" aria-label="Platform management">
          {/* Platform Health */}
          <Card elevated>
            <h3 className="text-sm sm:text-base font-bold text-[var(--color-title)] tracking-tight mb-5">
              Platform Health
            </h3>
            <div className="space-y-4">
              {/* Overall Platform Status */}
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs sm:text-sm font-semibold text-[var(--color-text)]">Platform Status</span>
                <StatusSelector
                  value={platformStatus}
                  onChange={(value) => setManualPlatformStatus(value as PlatformStatus)}
                  options={[
                    { value: 'active', label: 'Active', color: 'var(--color-success)' },
                    { value: 'maintenance', label: 'In Maintenance', color: 'var(--color-warning)' },
                  ]}
                  disabled={isPlatformStatusForced}
                />
              </div>

              {/* Display notice if status is forced */}
              {isPlatformStatusForced && (
                <div className="bg-[var(--color-warning)]/10 border border-[var(--color-warning)]/30 rounded-md px-3 py-2.5">
                  <p className="text-xs text-[var(--color-warning)] font-semibold leading-relaxed">
                    Platform automatically set to maintenance due to service issues
                  </p>
                </div>
              )}

              {/* Service Status Divider */}
              <div className="pt-3 border-t border-[var(--color-border)]">
                <p className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-3">
                  Service Status
                </p>
              </div>

              {/* Power BI Embedded Status */}
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs sm:text-sm font-semibold text-[var(--color-text)]">Power BI Embedded</span>
                <StatusSelector
                  value={powerBIStatus}
                  onChange={(value) => setPowerBIStatus(value as ServiceStatus)}
                  options={[
                    { value: 'online', label: 'Online', color: 'var(--color-success)' },
                    { value: 'offline', label: 'Offline', color: 'var(--color-danger)' },
                  ]}
                />
              </div>

              {/* VPS Status */}
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs sm:text-sm font-semibold text-[var(--color-text)]">VPS Server</span>
                <StatusSelector
                  value={vpsStatus}
                  onChange={(value) => setVPSStatus(value as ServiceStatus)}
                  options={[
                    { value: 'online', label: 'Online', color: 'var(--color-success)' },
                    { value: 'offline', label: 'Offline', color: 'var(--color-danger)' },
                  ]}
                />
              </div>

              {/* Overall Status Summary */}
              <div className="pt-4 border-t border-[var(--color-border)]">
                <div
                  className={`flex items-center gap-2 ${
                    platformStatus === 'active' ? 'text-[var(--color-success)]' : 'text-[var(--color-warning)]'
                  }`}
                >
                  <Activity size={16} strokeWidth={2} />
                  <span className="text-xs sm:text-sm font-semibold">
                    {platformStatus === 'active'
                      ? 'All systems operational'
                      : 'Platform under maintenance'}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card elevated>
            <h3 className="text-sm sm:text-base font-bold text-[var(--color-title)] tracking-tight mb-5">
              Quick Actions
            </h3>
            <div className="space-y-2.5">
              <button
                onClick={() => navigate('/admin/pending-accounts')}
                className="w-full text-left px-4 py-3 rounded-lg border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition-all text-xs sm:text-sm font-semibold text-[var(--color-text)] hover:text-[var(--color-primary)]"
              >
                Review Pending Accounts
              </button>
              <button
                onClick={() => navigate('/admin/clients')}
                className="w-full text-left px-4 py-3 rounded-lg border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition-all text-xs sm:text-sm font-semibold text-[var(--color-text)] hover:text-[var(--color-primary)]"
              >
                Manage Clients
              </button>
              <button
                onClick={() => navigate('/admin/analytics')}
                className="w-full text-left px-4 py-3 rounded-lg border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition-all text-xs sm:text-sm font-semibold text-[var(--color-text)] hover:text-[var(--color-primary)]"
              >
                View Analytics
              </button>
            </div>
          </Card>
        </section>

        {/* Recent Published Dashboards - Full width section */}
        <section aria-label="Recently published dashboards">
          <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[var(--color-title)] tracking-tight">
                Recently Published
              </h2>
              <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1 font-medium">
                Latest public dashboards
              </p>
            </div>
            <button
              onClick={() => navigate('/admin/publishing')}
              className="text-xs sm:text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors self-start sm:self-auto"
            >
              View All →
            </button>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {publishedDashboards.slice(0, 4).map((dashboard) => (
              <Card key={dashboard.id} hover onClick={() => navigate('/admin/publishing')}>
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-[var(--color-title)] mb-1 line-clamp-1 group-hover:text-[var(--color-primary)] transition-colors">
                        {dashboard.title}
                      </h3>
                      <p className="text-xs text-[var(--color-text-muted)] font-medium truncate">
                        {dashboard.owner}
                      </p>
                    </div>
                    {dashboard.isPublic && (
                      <Badge variant="success" size="sm">
                        Public
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border)]">
                    <span className="text-xs text-[var(--color-text-muted)] font-medium">
                      {dashboard.views.toLocaleString()} views
                    </span>
                    <span className="text-xs text-[var(--color-text-muted)] font-medium">
                      {new Date(dashboard.publishedDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>

      {/* Modals */}
      <ClientOnboardingModal
        isOpen={isOnboardingModalOpen}
        onClose={() => {
          setIsOnboardingModalOpen(false);
          setSelectedAccount(null);
        }}
        account={selectedAccount}
        onApprove={handleApproveAccount}
        onUpdateAccount={handleUpdateAccount}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setAccountToDelete(null);
        }}
        onConfirm={handleDeleteAccount}
        title="Reject Account Request"
        message="Are you sure you want to reject this account request? This will permanently remove the pending account from the system."
        itemName={accountToDelete?.companyName}
      />
    </>
  );
};
