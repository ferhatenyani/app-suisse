import React, { useState } from 'react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Table } from '../components/common/Table';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { Search, Database, Plus, RefreshCw, Eye } from 'lucide-react';
import { dataSources, DataSource } from '../data/mockData';
import { ViewDataSourceModal, EditDataSourceData } from '../components/modals/ViewDataSourceModal';
import { AddDataSourceModal, NewDataSourceData } from '../components/modals/AddDataSourceModal';
import { SyncDataSourceModal } from '../components/modals/SyncDataSourceModal';
import { SyncAllDataSourcesModal } from '../components/modals/SyncAllDataSourcesModal';

export const DataSources: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDataSource, setSelectedDataSource] = useState<DataSource | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [isSyncAllModalOpen, setIsSyncAllModalOpen] = useState(false);

  // Mock client name - in a real app, this would come from context or props
  const clientName = 'Acme Corporation';

  const filteredSources = dataSources.filter((source) =>
    source.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDataSource = (source: DataSource) => {
    setSelectedDataSource(source);
    setIsViewModalOpen(true);
  };

  const handleSaveDataSource = (dataSourceId: string, data: EditDataSourceData) => {
    // In a real app, this would make an API call to update the data source
    console.log('Saving data source:', dataSourceId, data);
    setIsViewModalOpen(false);
  };

  const handleAddDataSource = (data: NewDataSourceData) => {
    // In a real app, this would make an API call to create the data source
    console.log('Adding new data source:', data);
    setIsAddModalOpen(false);
  };

  const handleSyncDataSource = (source: DataSource) => {
    setSelectedDataSource(source);
    setIsSyncModalOpen(true);
  };

  const handleSync = (dataSourceId: string) => {
    // In a real app, this would make an API call to sync the data source
    console.log('Syncing data source:', dataSourceId);
  };

  const handleSyncAll = () => {
    // In a real app, this would make an API call to sync all data sources
    console.log('Syncing all data sources');
  };

  const columns = [
    {
      key: 'client',
      header: 'Data Source',
      render: (source: DataSource) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white">
            <Database size={18} strokeWidth={2} />
          </div>
          <div>
            <p className="font-semibold text-[var(--color-title)]">{source.client}</p>
            {source.provider && (
              <p className="text-xs text-[var(--color-text-muted)]">{source.provider}</p>
            )}
          </div>
        </div>
      ),
    },
    {
      key: 'type',
      header: 'Type',
      render: (source: DataSource) => <Badge variant="default">{source.type}</Badge>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (source: DataSource) => {
        const variants = {
          connected: 'success' as const,
          disconnected: 'warning' as const,
          error: 'danger' as const,
        };
        return <Badge variant={variants[source.status]}>{source.status}</Badge>;
      },
    },
    {
      key: 'usedBy',
      header: 'Used By',
      render: (source: DataSource) => (
        <span className="font-semibold">{source.usedBy} dashboards</span>
      ),
    },
    {
      key: 'lastSync',
      header: 'Last Sync',
      render: (source: DataSource) => <span className="text-sm">{source.lastSync}</span>,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (source: DataSource) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={<RefreshCw size={14} />}
            onClick={() => handleSyncDataSource(source)}
          >
            Sync
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={<Eye size={14} />}
            onClick={() => handleViewDataSource(source)}
          >
            View
          </Button>
        </div>
      ),
    },
  ];

  const stats = [
    {
      label: 'Total Sources',
      value: dataSources.length,
      color: 'bg-blue-500',
    },
    {
      label: 'Connected',
      value: dataSources.filter((s) => s.status === 'connected').length,
      color: 'bg-green-500',
    },
    {
      label: 'Disconnected',
      value: dataSources.filter((s) => s.status === 'disconnected').length,
      color: 'bg-yellow-500',
    },
    {
      label: 'Errors',
      value: dataSources.filter((s) => s.status === 'error').length,
      color: 'bg-red-500',
    },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-title)] tracking-tight">
            {clientName}
          </h1>
          <p className="text-base text-[var(--color-text-secondary)] mt-2 font-medium">
            Data Sources - Configure and manage platform data sources
          </p>
        </div>
        <Button icon={<Plus size={18} />} onClick={() => setIsAddModalOpen(true)}>
          Add Data Source
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {stats.map((stat, index) => (
          <Card key={index} elevated>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-1">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-[var(--color-title)]">{stat.value}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)]">
                <Database size={16} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Table */}
      <Card elevated>
        <div className="flex gap-4 mb-5">
          <div className="flex-1">
            <Input
              placeholder="Search data sources..."
              icon={<Search size={16} />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            variant="secondary"
            icon={<RefreshCw size={16} />}
            onClick={() => setIsSyncAllModalOpen(true)}
          >
            Sync All
          </Button>
        </div>
        <Table data={filteredSources} columns={columns} />
      </Card>

      {/* View/Edit Data Source Modal */}
      <ViewDataSourceModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        dataSource={selectedDataSource}
        onSave={handleSaveDataSource}
      />

      {/* Add Data Source Modal */}
      <AddDataSourceModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddDataSource}
      />

      {/* Sync Data Source Modal */}
      <SyncDataSourceModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        dataSource={selectedDataSource}
        onSync={handleSync}
      />

      {/* Sync All Data Sources Modal */}
      <SyncAllDataSourcesModal
        isOpen={isSyncAllModalOpen}
        onClose={() => setIsSyncAllModalOpen(false)}
        dataSources={dataSources}
        onSyncAll={handleSyncAll}
      />
    </div>
  );
};
