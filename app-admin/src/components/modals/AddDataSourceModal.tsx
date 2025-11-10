import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Dropdown } from '../common/Dropdown';
import { Input } from '../common/Input';
import { Database, Plus } from 'lucide-react';

interface AddDataSourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: NewDataSourceData) => void;
}

export interface NewDataSourceData {
  name: string;
  type: string;
  provider: string;
  connectionString: string;
  username: string;
  password: string;
  database: string;
  port: string;
}

// Data source type options
const dataSourceTypes = [
  { value: 'SQL Server', label: 'SQL Server' },
  { value: 'PostgreSQL', label: 'PostgreSQL' },
  { value: 'MySQL', label: 'MySQL' },
  { value: 'MongoDB', label: 'MongoDB' },
  { value: 'Oracle', label: 'Oracle Database' },
  { value: 'Redis', label: 'Redis' },
  { value: 'Snowflake', label: 'Snowflake' },
  { value: 'BigQuery', label: 'Google BigQuery' },
];

// Provider options
const providerOptions = [
  { value: 'Azure', label: 'Microsoft Azure' },
  { value: 'AWS', label: 'Amazon Web Services' },
  { value: 'GCP', label: 'Google Cloud Platform' },
  { value: 'On-Premise', label: 'On-Premise' },
  { value: 'Other', label: 'Other' },
];

export const AddDataSourceModal: React.FC<AddDataSourceModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [formData, setFormData] = useState<NewDataSourceData>({
    name: '',
    type: 'SQL Server',
    provider: 'Azure',
    connectionString: '',
    username: '',
    password: '',
    database: '',
    port: '',
  });

  const handleInputChange = (field: keyof NewDataSourceData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!formData.name || !formData.type || !formData.provider) {
      alert('Please fill in all required fields');
      return;
    }

    onAdd(formData);

    // Reset form
    setFormData({
      name: '',
      type: 'SQL Server',
      provider: 'Azure',
      connectionString: '',
      username: '',
      password: '',
      database: '',
      port: '',
    });

    onClose();
  };

  const handleClose = () => {
    // Reset form on close
    setFormData({
      name: '',
      type: 'SQL Server',
      provider: 'Azure',
      connectionString: '',
      username: '',
      password: '',
      database: '',
      port: '',
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add New Data Source" size="xl">
      <div className="space-y-6">
        {/* Header Info */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white">
              <Database size={18} strokeWidth={2} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[var(--color-title)]">
                Configure New Data Source
              </h3>
              <p className="text-xs text-[var(--color-text-muted)]">
                Fill in the details below to connect a new data source
              </p>
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">
            Basic Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Data Source Name *"
              placeholder="e.g., Production Database"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />

            <Dropdown
              label="Data Source Type *"
              value={formData.type}
              onChange={(value) => handleInputChange('type', value)}
              options={dataSourceTypes}
            />
          </div>

          <Dropdown
            label="Cloud Provider *"
            value={formData.provider}
            onChange={(value) => handleInputChange('provider', value)}
            options={providerOptions}
          />
        </div>

        {/* Connection Details */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">
            Connection Details
          </h3>

          <Input
            label="Connection String"
            placeholder="Server=myserver;Database=mydb;..."
            value={formData.connectionString}
            onChange={(e) => handleInputChange('connectionString', e.target.value)}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Database Name"
              placeholder="e.g., analytics_db"
              value={formData.database}
              onChange={(e) => handleInputChange('database', e.target.value)}
            />

            <Input
              label="Port"
              placeholder="e.g., 1433, 5432, 3306"
              value={formData.port}
              onChange={(e) => handleInputChange('port', e.target.value)}
            />
          </div>
        </div>

        {/* Authentication */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">
            Authentication
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Username"
              placeholder="Database username"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Database password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
            />
          </div>
        </div>

        {/* Info Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-xs text-blue-800">
            <strong>Note:</strong> Make sure your database allows connections from this application's IP address.
            Connection will be tested before the data source is activated.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <Button
            variant="secondary"
            onClick={handleClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            icon={<Plus size={16} />}
            className="flex-1"
          >
            Add Data Source
          </Button>
        </div>
      </div>
    </Modal>
  );
};
