import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Badge } from '../common/Badge';
import { Client } from '../../data/mockData';
import { Save, Edit, Eye, Users, LayoutDashboard, Search, Check, CheckCircle2, X } from 'lucide-react';

interface EditClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: Client | null;
  onSave: (clientId: string, data: EditClientData) => void;
}

export interface EditClientData {
  name: string;
  email: string;
  type: 'Individual' | 'Organization';
  plan: 'Starter' | 'Professional' | 'Enterprise';
  status: 'active' | 'inactive' | 'suspended';
  dashboards: string[];
}

// Mock Power BI dashboards/reports
const mockDashboards = [
  { value: 'sales-dashboard', label: 'Sales Performance Dashboard' },
  { value: 'marketing-analytics', label: 'Marketing Analytics' },
  { value: 'financial-overview', label: 'Financial Overview' },
  { value: 'customer-insights', label: 'Customer Insights' },
  { value: 'operations-metrics', label: 'Operations Metrics' },
  { value: 'hr-analytics', label: 'HR Analytics' },
  { value: 'product-performance', label: 'Product Performance' },
  { value: 'inventory-tracking', label: 'Inventory Tracking' },
];

export const EditClientModal: React.FC<EditClientModalProps> = ({
  isOpen,
  onClose,
  client,
  onSave,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [dashboardSearchTerm, setDashboardSearchTerm] = useState('');
  const [formData, setFormData] = useState<EditClientData>({
    name: '',
    email: '',
    type: 'Individual',
    plan: 'Starter',
    status: 'active',
    dashboards: [],
  });

  useEffect(() => {
    if (client) {
      // Load assigned dashboards from client data if available
      // assignedDashboard can be either a comma-separated string or a single dashboard name
      let assignedDashboards: string[] = [];

      if (client.assignedDashboard) {
        // Split by comma in case of multiple dashboards
        const dashboardNames = client.assignedDashboard.split(',').map(d => d.trim());

        // Map dashboard names to their values
        assignedDashboards = dashboardNames
          .map(name => {
            const dashboard = mockDashboards.find(d => d.label === name || d.value === name);
            return dashboard ? dashboard.value : null;
          })
          .filter((val): val is string => val !== null);
      }

      setFormData({
        name: client.name,
        email: client.email,
        type: client.type,
        plan: client.plan,
        status: client.status,
        dashboards: assignedDashboards,
      });
      setDashboardSearchTerm('');
    }
    // Reset to view mode when modal opens
    setIsEditMode(false);
  }, [client, isOpen]);

  if (!client) return null;

  const handleDashboardToggle = (dashboardValue: string) => {
    setFormData((prev) => ({
      ...prev,
      dashboards: prev.dashboards.includes(dashboardValue)
        ? prev.dashboards.filter((d) => d !== dashboardValue)
        : [...prev.dashboards, dashboardValue],
    }));
  };

  const handleSubmit = () => {
    onSave(client.id, formData);
    setIsEditMode(false);
  };

  const statusVariants = {
    active: 'success' as const,
    inactive: 'warning' as const,
    suspended: 'danger' as const,
  };

  // Filter dashboards based on search term
  const filteredDashboards = mockDashboards.filter(dashboard =>
    dashboard.label.toLowerCase().includes(dashboardSearchTerm.toLowerCase())
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Client Management"
      size="xl"
    >
      <div className="space-y-6">
        {/* Mode Toggle - Segmented Control */}
        <div className="flex justify-center">
          <div className="inline-flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setIsEditMode(false)}
              className={`
                flex items-center gap-2 px-6 py-2.5 rounded-md font-semibold text-sm transition-all
                ${!isEditMode
                  ? 'bg-white text-[var(--color-primary)] shadow-sm'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                }
              `}
            >
              <Eye size={16} />
              View Mode
            </button>
            <button
              onClick={() => setIsEditMode(true)}
              className={`
                flex items-center gap-2 px-6 py-2.5 rounded-md font-semibold text-sm transition-all
                ${isEditMode
                  ? 'bg-white text-[var(--color-primary)] shadow-sm'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                }
              `}
            >
              <Edit size={16} />
              Edit Mode
            </button>
          </div>
        </div>

        {!isEditMode ? (
          /* VIEW SECTION */
          <div className="space-y-5">
            {/* Client Information */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-4 flex items-center gap-2">
                <Users size={16} />
                Client Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <label className="text-xs font-semibold text-[var(--color-text-muted)] uppercase">Name</label>
                  <p className="text-base font-semibold text-[var(--color-title)] mt-1">{client.name}</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <label className="text-xs font-semibold text-[var(--color-text-muted)] uppercase">Email</label>
                  <p className="text-base text-[var(--color-text)] mt-1">{client.email}</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <label className="text-xs font-semibold text-[var(--color-text-muted)] uppercase">Type</label>
                  <p className="text-base text-[var(--color-text)] mt-1">{client.type}</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <label className="text-xs font-semibold text-[var(--color-text-muted)] uppercase">Plan</label>
                  <p className="text-base text-[var(--color-text)] mt-1">{client.plan}</p>
                </div>
              </div>
            </div>

            {/* Status & Metrics */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-4">
                Status & Metrics
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <label className="text-xs font-semibold text-[var(--color-text-muted)] uppercase">Status</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge variant={statusVariants[client.status]}>{client.status}</Badge>
                    {client.paymentStatus && (
                      <Badge variant={client.paymentStatus === 'paid' ? 'success' : 'danger'}>
                        {client.paymentStatus === 'paid' ? 'Paid' : 'Payment Pending'}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <label className="text-xs font-semibold text-[var(--color-text-muted)] uppercase">Last Active</label>
                  <p className="text-base text-[var(--color-text)] mt-1">
                    {new Date(client.lastActive).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-lg p-4 border border-blue-200">
                  <label className="text-xs font-semibold text-blue-700 uppercase flex items-center gap-2">
                    <LayoutDashboard size={14} />
                    Dashboards
                  </label>
                  <p className="text-3xl font-bold text-blue-900 mt-2">{formData.dashboards.length}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-lg p-4 border border-purple-200">
                  <label className="text-xs font-semibold text-purple-700 uppercase flex items-center gap-2">
                    <Users size={14} />
                    Users
                  </label>
                  <p className="text-3xl font-bold text-purple-900 mt-2">{client.userCount}</p>
                </div>
              </div>
            </div>

            {/* Workspace Information */}
            {client.workspaceId && (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50/50 rounded-xl p-6 border border-green-200 shadow-sm">
                <h3 className="text-sm font-semibold text-green-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <CheckCircle2 size={16} />
                  Workspace
                </h3>
                <div className="bg-white rounded-lg p-4 border border-green-200">
                  <label className="text-xs font-semibold text-green-700 uppercase">Workspace ID</label>
                  <p className="text-base font-mono font-semibold text-green-900 mt-1">{client.workspaceId}</p>
                </div>
                {client.assignedDashboard && (
                  <div className="mt-3 bg-white rounded-lg p-4 border border-green-200">
                    <label className="text-xs font-semibold text-green-700 uppercase">Assigned Dashboard</label>
                    <p className="text-base text-green-900 mt-1">{client.assignedDashboard}</p>
                  </div>
                )}
              </div>
            )}

            {/* Assigned Dashboards Display */}
            {formData.dashboards.length > 0 && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-xl p-6 border border-blue-200 shadow-sm">
                <h3 className="text-sm font-semibold text-blue-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <LayoutDashboard size={16} />
                  Assigned Dashboards ({formData.dashboards.length})
                </h3>
                <div className="space-y-3">
                  {formData.dashboards.map(dashboardId => {
                    const dashboard = mockDashboards.find(d => d.value === dashboardId);
                    return dashboard ? (
                      <div key={dashboardId} className="bg-white rounded-lg p-4 border border-blue-200 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <LayoutDashboard size={20} className="text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-[var(--color-title)]">{dashboard.label}</p>
                        </div>
                        <CheckCircle2 size={20} className="text-green-600" />
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* EDIT SECTION */
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl p-6 border border-gray-200 shadow-sm space-y-4">
              <h3 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider flex items-center gap-2">
                <Users size={16} />
                Basic Information
              </h3>

              <Input
                label="Client Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter client name"
              />

              <Input
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter email address"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">
                    Client Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as 'Individual' | 'Organization' })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent bg-white text-[var(--color-text)] font-medium"
                  >
                    <option value="Individual">Individual</option>
                    <option value="Organization">Organization</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">
                    Subscription Plan
                  </label>
                  <select
                    value={formData.plan}
                    onChange={(e) => setFormData({ ...formData, plan: e.target.value as 'Starter' | 'Professional' | 'Enterprise' })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent bg-white text-[var(--color-text)] font-medium"
                  >
                    <option value="Starter">Starter - $29/month</option>
                    <option value="Professional">Professional - $99/month</option>
                    <option value="Enterprise">Enterprise - $299/month</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl p-6 border border-gray-200 shadow-sm">
              <label className="block text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-4">
                Account Status
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, status: 'active' })}
                  className={`
                    relative px-4 py-4 rounded-lg border-2 transition-all
                    ${formData.status === 'active'
                      ? 'border-[var(--color-primary)] bg-blue-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                    }
                  `}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Badge variant="success">Active</Badge>
                    {formData.status === 'active' && (
                      <div className="absolute top-2 right-2">
                        <CheckCircle2 size={18} className="text-[var(--color-primary)]" />
                      </div>
                    )}
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, status: 'inactive' })}
                  className={`
                    relative px-4 py-4 rounded-lg border-2 transition-all
                    ${formData.status === 'inactive'
                      ? 'border-[var(--color-primary)] bg-blue-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                    }
                  `}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Badge variant="warning">Inactive</Badge>
                    {formData.status === 'inactive' && (
                      <div className="absolute top-2 right-2">
                        <CheckCircle2 size={18} className="text-[var(--color-primary)]" />
                      </div>
                    )}
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, status: 'suspended' })}
                  className={`
                    relative px-4 py-4 rounded-lg border-2 transition-all
                    ${formData.status === 'suspended'
                      ? 'border-[var(--color-primary)] bg-blue-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                    }
                  `}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Badge variant="danger">Suspended</Badge>
                    {formData.status === 'suspended' && (
                      <div className="absolute top-2 right-2">
                        <CheckCircle2 size={18} className="text-[var(--color-primary)]" />
                      </div>
                    )}
                  </div>
                </button>
              </div>
            </div>

            {/* Power BI Dashboards - Enhanced Multi-Select */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-xl p-6 border border-blue-200 shadow-sm space-y-4">
              <h3 className="text-sm font-semibold text-blue-800 uppercase tracking-wider flex items-center gap-2">
                <LayoutDashboard size={16} />
                Dashboard Management
              </h3>

              {/* Selection Summary */}
              {formData.dashboards.length > 0 && (
                <div className="bg-blue-50 border-2 border-[var(--color-primary)] rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[var(--color-primary)] flex items-center justify-center">
                        <span className="text-white text-xs font-bold">{formData.dashboards.length}</span>
                      </div>
                      <p className="font-semibold text-[var(--color-title)]">
                        {formData.dashboards.length} Dashboard{formData.dashboards.length !== 1 ? 's' : ''} Assigned
                      </p>
                    </div>
                    <button
                      onClick={() => setFormData({ ...formData, dashboards: [] })}
                      className="text-xs font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] underline"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.dashboards.map(dashboardId => {
                      const dashboard = mockDashboards.find(d => d.value === dashboardId);
                      return dashboard ? (
                        <div
                          key={dashboardId}
                          className="bg-white border border-[var(--color-primary)] rounded-lg px-3 py-1.5 flex items-center gap-2 text-sm"
                        >
                          <span className="font-medium text-[var(--color-title)]">{dashboard.label}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDashboardToggle(dashboardId);
                            }}
                            className="text-[var(--color-text-muted)] hover:text-red-600 transition-colors"
                          >
                            <X size={14} />
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
                  placeholder="Search dashboards..."
                  icon={<Search size={18} />}
                  value={dashboardSearchTerm}
                  onChange={(e) => setDashboardSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Dashboard Selection Grid */}
              <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                {filteredDashboards.length > 0 ? (
                  filteredDashboards.map((dashboard) => {
                    const isSelected = formData.dashboards.includes(dashboard.value);
                    return (
                      <div
                        key={dashboard.value}
                        onClick={() => handleDashboardToggle(dashboard.value)}
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
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-6 border-t-2 border-gray-200">
              <Button
                variant="secondary"
                onClick={() => setIsEditMode(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleSubmit}
                icon={<Save size={16} />}
                className="flex-1"
              >
                Save Changes
              </Button>
            </div>
          </div>
        )}

        {/* Close Button (Bottom) */}
        {!isEditMode && (
          <div className="pt-5 border-t-2 border-gray-200">
            <Button
              variant="secondary"
              onClick={onClose}
              className="w-full"
            >
              Close
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};
