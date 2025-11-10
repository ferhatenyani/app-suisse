import React, { useState, useEffect, useRef } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Badge } from '../common/Badge';
import { DataSource } from '../../data/mockData';
import { Save, Edit, Eye, Database, Activity, RefreshCw, ChevronDown } from 'lucide-react';

interface ViewDataSourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  dataSource: DataSource | null;
  onSave: (dataSourceId: string, data: EditDataSourceData) => void;
}

export interface EditDataSourceData {
  client: string;
  type: 'Database' | 'API' | 'File' | 'Cloud';
  status: 'connected' | 'disconnected' | 'error';
  provider?: string;
}

export const ViewDataSourceModal: React.FC<ViewDataSourceModalProps> = ({
  isOpen,
  onClose,
  dataSource,
  onSave,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const typeDropdownRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<EditDataSourceData>({
    client: '',
    type: 'Database',
    status: 'connected',
    provider: '',
  });

  useEffect(() => {
    if (dataSource) {
      setFormData({
        client: dataSource.client,
        type: dataSource.type,
        status: dataSource.status,
        provider: dataSource.provider || '',
      });
    }
    // Reset to view mode when modal opens
    setIsEditMode(false);
  }, [dataSource, isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (typeDropdownRef.current && !typeDropdownRef.current.contains(event.target as Node)) {
        setIsTypeDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!dataSource) return null;

  const handleSubmit = () => {
    onSave(dataSource.id, formData);
    setIsEditMode(false);
  };

  const statusVariants = {
    connected: 'success' as const,
    disconnected: 'warning' as const,
    error: 'danger' as const,
  };

  const typeColors = {
    Database: 'bg-blue-500',
    API: 'bg-purple-500',
    File: 'bg-green-500',
    Cloud: 'bg-orange-500',
  };

  const typeOptions: Array<'Database' | 'API' | 'File' | 'Cloud'> = ['Database', 'API', 'File', 'Cloud'];

  const handleTypeSelect = (type: 'Database' | 'API' | 'File' | 'Cloud') => {
    setFormData({ ...formData, type });
    setIsTypeDropdownOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Data Source Management"
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
            {/* Data Source Information */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-4 flex items-center gap-2">
                <Database size={16} />
                Data Source Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-white rounded-lg p-5 border border-gray-200">
                  <label className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide">Client</label>
                  <p className="text-[15px] font-semibold text-[var(--color-title)] mt-2 break-words overflow-wrap-anywhere">{dataSource.client}</p>
                </div>
                <div className="bg-white rounded-lg p-5 border border-gray-200">
                  <label className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide">Type</label>
                  <div className="mt-2.5">
                    <Badge variant="default">{dataSource.type}</Badge>
                  </div>
                </div>
                {dataSource.provider && (
                  <div className="bg-white rounded-lg p-5 border border-gray-200">
                    <label className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide">Provider</label>
                    <p className="text-[15px] text-[var(--color-text)] mt-2 break-words overflow-wrap-anywhere">{dataSource.provider}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Status & Metrics */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-4 flex items-center gap-2">
                <Activity size={16} />
                Status & Metrics
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-white rounded-lg p-5 border border-gray-200">
                  <label className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide">Connection Status</label>
                  <div className="mt-2.5">
                    <Badge variant={statusVariants[dataSource.status]}>{dataSource.status}</Badge>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-5 border border-gray-200">
                  <label className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide">Last Sync</label>
                  <p className="text-[15px] text-[var(--color-text)] mt-2 break-words overflow-wrap-anywhere">{dataSource.lastSync}</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-lg p-5 border border-blue-200 md:col-span-2">
                  <label className="text-xs font-semibold text-blue-700 uppercase tracking-wide flex items-center gap-2 flex-wrap">
                    <Database size={14} />
                    Used By Dashboards
                  </label>
                  <p className="text-3xl font-bold text-blue-900 mt-3 break-words">{dataSource.usedBy}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* EDIT SECTION */
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl p-6 border border-gray-200 shadow-sm space-y-4">
              <h3 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider flex items-center gap-2">
                <Database size={16} />
                Basic Information
              </h3>

              <div>
                <label className="block text-sm font-semibold text-[var(--color-text)] mb-2.5">
                  Client Name
                </label>
                <Input
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  placeholder="Enter client name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Custom Type Dropdown */}
                <div ref={typeDropdownRef} className="relative">
                  <label className="block text-sm font-semibold text-[var(--color-text)] mb-2.5">
                    Type
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent bg-white text-[var(--color-text)] font-medium flex items-center justify-between hover:border-gray-400 transition-colors"
                  >
                    <span className="text-[15px]">{formData.type}</span>
                    <ChevronDown
                      size={18}
                      className={`text-gray-500 transition-transform duration-200 ${isTypeDropdownOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isTypeDropdownOpen && (
                    <div className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-lg shadow-lg overflow-hidden">
                      {typeOptions.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => handleTypeSelect(type)}
                          className={`w-full px-4 py-3 text-left text-[15px] font-medium transition-colors ${
                            formData.type === type
                              ? 'bg-blue-50 text-[var(--color-primary)]'
                              : 'text-[var(--color-text)] hover:bg-gray-50'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[var(--color-text)] mb-2.5">
                    Provider (Optional)
                  </label>
                  <Input
                    value={formData.provider}
                    onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                    placeholder="e.g., PostgreSQL 14, MongoDB Atlas"
                  />
                </div>
              </div>
            </div>

            {/* Connection Status */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl p-6 border border-gray-200 shadow-sm">
              <label className="block text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-4">
                Connection Status
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, status: 'connected' })}
                  className={`
                    relative px-2 sm:px-4 py-4 rounded-lg border-2 transition-all
                    ${formData.status === 'connected'
                      ? 'border-[var(--color-primary)] bg-blue-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                    }
                  `}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Badge variant="success" className="text-[10px] sm:text-xs whitespace-nowrap">Connected</Badge>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, status: 'disconnected' })}
                  className={`
                    relative px-2 sm:px-4 py-4 rounded-lg border-2 transition-all
                    ${formData.status === 'disconnected'
                      ? 'border-[var(--color-primary)] bg-blue-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                    }
                  `}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Badge variant="warning" className="text-[10px] sm:text-xs whitespace-nowrap">Disconnected</Badge>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, status: 'error' })}
                  className={`
                    relative px-2 sm:px-4 py-4 rounded-lg border-2 transition-all
                    ${formData.status === 'error'
                      ? 'border-[var(--color-primary)] bg-blue-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                    }
                  `}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Badge variant="danger" className="text-[10px] sm:text-xs whitespace-nowrap">Error</Badge>
                  </div>
                </button>
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
