import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Input } from '../common/Input';
import { PendingAccount } from '../../data/mockData';
import { Check, ChevronRight, CheckCircle2, Search } from 'lucide-react';

interface ClientOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  account: PendingAccount | null;
  onApprove: (accountId: string, data: OnboardingData) => void;
  onUpdateAccount: (accountId: string, updates: Partial<PendingAccount>) => void;
}

export interface OnboardingData {
  workspacePlan: string;
  workspaceId: string;
  assignedDashboards: string[];
}

// Mock workspace plans
const workspacePlans = [
  {
    value: 'basic',
    label: 'Basic Plan',
    description: '10 GB storage, 5 users',
    storage: '10 GB',
    users: '5 users'
  },
  {
    value: 'professional',
    label: 'Professional Plan',
    description: '50 GB storage, 25 users',
    storage: '50 GB',
    users: '25 users'
  },
  {
    value: 'enterprise',
    label: 'Enterprise Plan',
    description: '500 GB storage, unlimited users',
    storage: '500 GB',
    users: 'Unlimited'
  },
];

// Mock dashboards
const dashboardOptions = [
  { value: 'dashboard-a', label: 'Dashboard A (Sales Analytics)', description: 'Comprehensive sales performance tracking' },
  { value: 'dashboard-b', label: 'Dashboard B (Financial Overview)', description: 'Financial metrics and KPIs' },
  { value: 'dashboard-c', label: 'Dashboard C (Operations Hub)', description: 'Operations and logistics management' },
  { value: 'custom', label: 'Custom Dashboard', description: 'Tailored dashboard solution' },
];

export const ClientOnboardingModal: React.FC<ClientOnboardingModalProps> = ({
  isOpen,
  onClose,
  account,
  onApprove,
  onUpdateAccount,
}) => {
  const [selectedWorkspacePlan, setSelectedWorkspacePlan] = useState('');
  const [selectedDashboards, setSelectedDashboards] = useState<string[]>([]);
  const [dashboardSearchTerm, setDashboardSearchTerm] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Reset state when account changes
  useEffect(() => {
    if (account) {
      setSelectedWorkspacePlan(account.selectedWorkspacePlan || '');
      setSelectedDashboards(account.assignedDashboard ? [account.assignedDashboard] : []);
      setDashboardSearchTerm('');
    }
  }, [account]);

  if (!account) return null;

  // Determine current stage
  const getCurrentStage = () => {
    if (!account.workspaceId) return 1;
    if (!account.assignedDashboard || (selectedDashboards.length === 0 && !account.assignedDashboard)) return 2;
    return 3;
  };

  const currentStage = getCurrentStage();

  const handleGenerateWorkspace = () => {
    if (!selectedWorkspacePlan) return;

    const workspaceId = `WS-${Date.now()}-${account.id}`;
    onUpdateAccount(account.id, {
      workspaceId,
      selectedWorkspacePlan,
    });
  };

  const handleAssignDashboards = () => {
    if (selectedDashboards.length === 0) return;

    onUpdateAccount(account.id, {
      assignedDashboard: selectedDashboards.join(','), // Store as comma-separated for compatibility
    });
  };

  const toggleDashboardSelection = (dashboardValue: string) => {
    setSelectedDashboards(prev => {
      if (prev.includes(dashboardValue)) {
        return prev.filter(d => d !== dashboardValue);
      } else {
        return [...prev, dashboardValue];
      }
    });
  };

  const handleFinalApproval = () => {
    const dashboards = account.assignedDashboard
      ? account.assignedDashboard.split(',')
      : selectedDashboards;

    onApprove(account.id, {
      workspacePlan: account.selectedWorkspacePlan || selectedWorkspacePlan,
      workspaceId: account.workspaceId || '',
      assignedDashboards: dashboards,
    });
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
      onClose();
    }, 2000);
  };

  // Filter dashboards based on search term
  const filteredDashboards = dashboardOptions.filter(dashboard =>
    dashboard.label.toLowerCase().includes(dashboardSearchTerm.toLowerCase()) ||
    dashboard.description.toLowerCase().includes(dashboardSearchTerm.toLowerCase())
  );

  const getSelectedPlanDetails = () => {
    const plan = workspacePlans.find(p => p.value === (account.selectedWorkspacePlan || selectedWorkspacePlan));
    return plan;
  };

  const getSelectedDashboardsDetails = () => {
    const dashboardIds = account.assignedDashboard
      ? account.assignedDashboard.split(',')
      : selectedDashboards;
    return dashboardOptions.filter(d => dashboardIds.includes(d.value));
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="Client Onboarding Process" size="xl">
        <div className="space-y-6">
        {/* Progress Indicator */}
        <div className="flex items-center justify-between mb-6">
          {[1, 2, 3].map((stage) => (
            <div key={stage} className="flex items-center flex-1">
              <div className="flex items-center">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
                    ${currentStage > stage
                      ? 'bg-green-500 text-white'
                      : currentStage === stage
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'bg-gray-200 text-gray-500'
                    }
                  `}
                >
                  {currentStage > stage ? <CheckCircle2 size={20} /> : stage}
                </div>
                <div className="ml-3">
                  <p className={`text-xs font-semibold ${currentStage >= stage ? 'text-[var(--color-title)]' : 'text-gray-400'}`}>
                    Stage {stage}
                  </p>
                  <p className={`text-xs ${currentStage >= stage ? 'text-[var(--color-text-secondary)]' : 'text-gray-400'}`}>
                    {stage === 1 && 'Plan Selection'}
                    {stage === 2 && 'Dashboard Assignment'}
                    {stage === 3 && 'Confirmation'}
                  </p>
                </div>
              </div>
              {stage < 3 && (
                <div className={`flex-1 h-1 mx-4 ${currentStage > stage ? 'bg-green-500' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Account Info */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h3 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-3">
            Account Information
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-[var(--color-text-muted)] mb-1">Company Name</p>
              <p className="font-semibold text-[var(--color-title)]">{account.companyName}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--color-text-muted)] mb-1">Contact Person</p>
              <p className="font-semibold text-[var(--color-title)]">{account.contactPerson}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--color-text-muted)] mb-1">Email</p>
              <p className="font-medium text-[var(--color-text)]">{account.email}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--color-text-muted)] mb-1">Requested Plan</p>
              <Badge variant="info">{account.plan}</Badge>
            </div>
          </div>
        </div>

        {/* Stage 1: Plan Selection */}
        {currentStage === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="border-l-4 border-[var(--color-primary)] pl-4 py-2 bg-blue-50 rounded-r-lg">
              <h3 className="text-lg font-bold text-[var(--color-title)] mb-1">
                Stage 1: Select Workspace Plan
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)]">
                Choose the appropriate workspace plan for this client
              </p>
            </div>

            <div className="space-y-3">
              {workspacePlans.map((plan) => (
                <label
                  key={plan.value}
                  className={`
                    flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all
                    ${selectedWorkspacePlan === plan.value
                      ? 'border-[var(--color-primary)] bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="workspacePlan"
                    value={plan.value}
                    checked={selectedWorkspacePlan === plan.value}
                    onChange={(e) => setSelectedWorkspacePlan(e.target.value)}
                    className="mt-1 w-4 h-4 text-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-light)]"
                  />
                  <div className="ml-3 flex-1">
                    <p className="font-semibold text-[var(--color-title)]">{plan.label}</p>
                    <p className="text-sm text-[var(--color-text-secondary)] mt-1">{plan.description}</p>
                    <div className="flex gap-4 mt-2">
                      <span className="text-xs font-medium text-[var(--color-text-muted)]">
                        Storage: {plan.storage}
                      </span>
                      <span className="text-xs font-medium text-[var(--color-text-muted)]">
                        Users: {plan.users}
                      </span>
                    </div>
                  </div>
                </label>
              ))}
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <Button
                variant="secondary"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleGenerateWorkspace}
                disabled={!selectedWorkspacePlan}
                icon={<ChevronRight size={16} />}
                className="flex-1"
              >
                Generate Workspace
              </Button>
            </div>
          </div>
        )}

        {/* Stage 2: Dashboard Assignment */}
        {currentStage === 2 && (
          <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="border-l-4 border-[var(--color-primary)] pl-5 py-3 bg-gradient-to-r from-blue-50 to-transparent rounded-r-lg">
              <h3 className="text-lg font-bold text-[var(--color-title)] mb-1">
                Stage 2: Dashboard Assignment
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)]">
                Select one or more dashboards to assign to this client's workspace
              </p>
            </div>

            {/* Workspace Info Card */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                  <CheckCircle2 size={18} className="text-white" />
                </div>
                <p className="font-bold text-green-900 text-base">Workspace Generated Successfully</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/60 rounded-lg p-3 border border-green-100">
                  <p className="text-xs font-semibold text-green-700 mb-1 uppercase tracking-wide">Workspace ID</p>
                  <p className="font-mono font-semibold text-green-900 text-sm">{account.workspaceId}</p>
                </div>
                <div className="bg-white/60 rounded-lg p-3 border border-green-100">
                  <p className="text-xs font-semibold text-green-700 mb-1 uppercase tracking-wide">Selected Plan</p>
                  <p className="font-semibold text-green-900 text-sm">
                    {getSelectedPlanDetails()?.label}
                  </p>
                </div>
              </div>
            </div>

            {/* Selection Summary */}
            {selectedDashboards.length > 0 && (
              <div className="bg-blue-50 border-2 border-[var(--color-primary)] rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[var(--color-primary)] flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{selectedDashboards.length}</span>
                    </div>
                    <p className="font-semibold text-[var(--color-title)]">
                      {selectedDashboards.length} Dashboard{selectedDashboards.length !== 1 ? 's' : ''} Selected
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedDashboards([])}
                    className="text-xs font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] underline"
                  >
                    Clear All
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedDashboards.map(dashboardId => {
                    const dashboard = dashboardOptions.find(d => d.value === dashboardId);
                    return dashboard ? (
                      <div
                        key={dashboardId}
                        className="bg-white border border-[var(--color-primary)] rounded-lg px-3 py-1.5 flex items-center gap-2 text-sm"
                      >
                        <span className="font-medium text-[var(--color-title)]">{dashboard.label}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleDashboardSelection(dashboardId);
                          }}
                          className="text-[var(--color-text-muted)] hover:text-red-600 transition-colors"
                        >
                          ×
                        </button>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            )}

            {/* Search Bar */}
            <div>
              <label className="block text-sm font-semibold text-[var(--color-title)] mb-2">
                Search Available Dashboards
              </label>
              <Input
                placeholder="Search by name or description..."
                icon={<Search size={18} />}
                value={dashboardSearchTerm}
                onChange={(e) => setDashboardSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>

            {/* Dashboard Selection Grid */}
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {filteredDashboards.length > 0 ? (
                filteredDashboards.map((dashboard) => {
                  const isSelected = selectedDashboards.includes(dashboard.value);
                  return (
                    <div
                      key={dashboard.value}
                      onClick={() => toggleDashboardSelection(dashboard.value)}
                      className={`
                        relative flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all duration-200
                        ${isSelected
                          ? 'border-[var(--color-primary)] bg-blue-50 shadow-md'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm bg-white'
                        }
                      `}
                    >
                      {/* Checkbox */}
                      <div className="flex-shrink-0 mt-0.5">
                        <div
                          className={`
                            w-5 h-5 rounded border-2 flex items-center justify-center transition-all
                            ${isSelected
                              ? 'bg-[var(--color-primary)] border-[var(--color-primary)]'
                              : 'bg-white border-gray-300'
                            }
                          `}
                        >
                          {isSelected && <Check size={14} className="text-white" />}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="ml-4 flex-1">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-bold text-[var(--color-title)] text-base mb-1">
                              {dashboard.label}
                            </h4>
                            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                              {dashboard.description}
                            </p>
                          </div>
                          {isSelected && (
                            <div className="ml-3 flex-shrink-0">
                              <div className="w-7 h-7 rounded-full bg-[var(--color-primary)] flex items-center justify-center">
                                <CheckCircle2 size={16} className="text-white" />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12 text-[var(--color-text-muted)] bg-gray-50 rounded-lg border border-gray-200">
                  <Search size={40} className="mx-auto mb-3 opacity-30" />
                  <p className="text-sm font-medium">No dashboards found matching "{dashboardSearchTerm}"</p>
                  <p className="text-xs mt-1">Try adjusting your search criteria</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t-2 border-gray-100">
              <Button
                variant="secondary"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleAssignDashboards}
                disabled={selectedDashboards.length === 0}
                icon={<ChevronRight size={16} />}
                className="flex-1"
              >
                Assign {selectedDashboards.length > 0 ? `${selectedDashboards.length} ` : ''}Dashboard{selectedDashboards.length !== 1 ? 's' : ''}
              </Button>
            </div>
          </div>
        )}

        {/* Stage 3: Confirmation */}
        {currentStage === 3 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="border-l-4 border-green-500 pl-4 py-2 bg-green-50 rounded-r-lg">
              <h3 className="text-lg font-bold text-green-800 mb-1">
                Stage 3: Ready for Approval
              </h3>
              <p className="text-sm text-green-700">
                Review the configuration and approve the client account
              </p>
            </div>

            {/* Summary */}
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 size={18} className="text-green-600" />
                  <h4 className="font-semibold text-[var(--color-title)]">Configuration Summary</h4>
                </div>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-[var(--color-text-muted)] mb-1">Workspace Plan</p>
                      <p className="font-semibold text-[var(--color-title)]">
                        {getSelectedPlanDetails()?.label}
                      </p>
                      <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                        {getSelectedPlanDetails()?.description}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[var(--color-text-muted)] mb-1">Workspace ID</p>
                      <p className="font-mono font-medium text-[var(--color-title)]">
                        {account.workspaceId}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--color-text-muted)] mb-2">Assigned Dashboards ({getSelectedDashboardsDetails().length})</p>
                    <div className="space-y-2">
                      {getSelectedDashboardsDetails().map((dashboard) => (
                        <div key={dashboard.value} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                          <p className="font-semibold text-[var(--color-title)] text-sm">
                            {dashboard.label}
                          </p>
                          <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                            {dashboard.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <span className="font-semibold">Note:</span> Upon approval, this client will be moved to the Active Clients page with an "inactive" status until payment is confirmed.
                </p>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <Button
                variant="secondary"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleFinalApproval}
                icon={<Check size={16} />}
                className="flex-1"
              >
                Approve & Move to Active
              </Button>
            </div>
          </div>
        )}
        </div>
      </Modal>

      {/* Success Toast Notification */}
      {showSuccessToast && (
        <div className="fixed top-4 right-4 z-[9999] animate-fadeIn">
          <div className="bg-green-600 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 min-w-[320px]">
            <CheckCircle2 size={24} className="flex-shrink-0" />
            <div>
              <p className="font-bold text-base">Client Approved Successfully!</p>
              <p className="text-sm text-green-100 mt-1">
                {account?.companyName} has been moved to Active Clients
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
