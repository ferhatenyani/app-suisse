import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { DataSource } from '../../data/mockData';
import { RefreshCw, Database, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';

interface SyncAllDataSourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
  dataSources: DataSource[];
  onSyncAll: () => void;
}

type SyncStatus = 'idle' | 'syncing' | 'completed';

interface DataSourceSyncState {
  id: string;
  name: string;
  status: 'pending' | 'syncing' | 'success' | 'error';
}

export const SyncAllDataSourcesModal: React.FC<SyncAllDataSourcesModalProps> = ({
  isOpen,
  onClose,
  dataSources,
  onSyncAll,
}) => {
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle');
  const [dataSourceStates, setDataSourceStates] = useState<DataSourceSyncState[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      // Initialize states for all data sources
      setDataSourceStates(
        dataSources.map((ds) => ({
          id: ds.id,
          name: ds.name,
          status: 'pending' as const,
        }))
      );
      setSyncStatus('idle');
      setCurrentIndex(0);
    }
  }, [isOpen, dataSources]);

  const handleSyncAll = () => {
    setSyncStatus('syncing');
    setCurrentIndex(0);
    onSyncAll();

    // Simulate syncing each data source sequentially
    let index = 0;
    const syncInterval = setInterval(() => {
      if (index < dataSources.length) {
        // Mark current as syncing
        setDataSourceStates((prev) =>
          prev.map((ds, i) =>
            i === index ? { ...ds, status: 'syncing' as const } : ds
          )
        );

        // After a delay, mark as complete (randomly success or error)
        setTimeout(() => {
          const success = Math.random() > 0.15; // 85% success rate
          setDataSourceStates((prev) =>
            prev.map((ds, i) =>
              i === index
                ? { ...ds, status: success ? ('success' as const) : ('error' as const) }
                : ds
            )
          );

          index++;
          setCurrentIndex(index);

          if (index >= dataSources.length) {
            clearInterval(syncInterval);
            setSyncStatus('completed');
          }
        }, 800);
      }
    }, 1200);
  };

  const handleClose = () => {
    if (syncStatus !== 'syncing') {
      onClose();
    }
  };

  const successCount = dataSourceStates.filter((ds) => ds.status === 'success').length;
  const errorCount = dataSourceStates.filter((ds) => ds.status === 'error').length;
  const totalCount = dataSources.length;
  const progress = totalCount > 0 ? Math.round((currentIndex / totalCount) * 100) : 0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Sync All Data Sources"
      size="xl"
    >
      <div className="space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <Database className="mx-auto mb-2 text-blue-600" size={20} />
            <p className="text-2xl font-bold text-blue-900">{totalCount}</p>
            <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide">Total Sources</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <CheckCircle className="mx-auto mb-2 text-green-600" size={20} />
            <p className="text-2xl font-bold text-green-900">{successCount}</p>
            <p className="text-xs font-semibold text-green-700 uppercase tracking-wide">Successful</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <XCircle className="mx-auto mb-2 text-red-600" size={20} />
            <p className="text-2xl font-bold text-red-900">{errorCount}</p>
            <p className="text-xs font-semibold text-red-700 uppercase tracking-wide">Failed</p>
          </div>
        </div>

        {/* Overall Status */}
        {syncStatus === 'idle' && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
            <div className="flex items-start gap-3">
              <Clock className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="font-semibold text-blue-900 mb-1">Ready to Sync All Data Sources</h4>
                <p className="text-sm text-blue-700">
                  This will synchronize all {totalCount} data sources with the latest data. The process will run sequentially and may take several minutes.
                </p>
              </div>
            </div>
          </div>
        )}

        {syncStatus === 'syncing' && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
            <div className="flex items-start gap-3 mb-4">
              <RefreshCw className="text-blue-600 animate-spin flex-shrink-0 mt-0.5" size={20} />
              <div className="flex-1">
                <h4 className="font-semibold text-blue-900 mb-1">Syncing in Progress...</h4>
                <p className="text-sm text-blue-700">
                  Synchronizing {currentIndex} of {totalCount} data sources
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-semibold text-blue-700">
                <span>Overall Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] h-full transition-all duration-300 ease-out rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {syncStatus === 'completed' && (
          <div className={`${errorCount > 0 ? 'bg-yellow-50 border-yellow-200' : 'bg-green-50 border-green-200'} border rounded-lg p-5`}>
            <div className="flex items-start gap-3">
              {errorCount > 0 ? (
                <AlertCircle className="text-yellow-600 flex-shrink-0 mt-0.5" size={20} />
              ) : (
                <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
              )}
              <div>
                <h4 className={`font-semibold ${errorCount > 0 ? 'text-yellow-900' : 'text-green-900'} mb-1`}>
                  {errorCount > 0 ? 'Sync Completed with Errors' : 'All Syncs Completed Successfully!'}
                </h4>
                <p className={`text-sm ${errorCount > 0 ? 'text-yellow-700' : 'text-green-700'}`}>
                  {errorCount > 0
                    ? `${successCount} of ${totalCount} data sources synced successfully. ${errorCount} failed.`
                    : `All ${totalCount} data sources have been synchronized successfully.`}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Data Source List */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-80 overflow-y-auto">
          <h4 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide mb-3">
            Data Sources
          </h4>
          <div className="space-y-2">
            {dataSourceStates.map((ds, index) => (
              <div
                key={ds.id}
                className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                  ds.status === 'syncing'
                    ? 'bg-blue-50 border-blue-300 shadow-sm'
                    : ds.status === 'success'
                    ? 'bg-white border-green-200'
                    : ds.status === 'error'
                    ? 'bg-white border-red-200'
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white flex-shrink-0">
                    <Database size={14} strokeWidth={2} />
                  </div>
                  <span className="font-medium text-[var(--color-title)] truncate text-sm">
                    {ds.name}
                  </span>
                </div>
                <div className="flex-shrink-0">
                  {ds.status === 'pending' && (
                    <Badge variant="default">Pending</Badge>
                  )}
                  {ds.status === 'syncing' && (
                    <div className="flex items-center gap-2">
                      <RefreshCw className="text-blue-600 animate-spin" size={14} />
                      <Badge variant="default">Syncing...</Badge>
                    </div>
                  )}
                  {ds.status === 'success' && (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="text-green-600" size={14} />
                      <Badge variant="success">Success</Badge>
                    </div>
                  )}
                  {ds.status === 'error' && (
                    <div className="flex items-center gap-2">
                      <XCircle className="text-red-600" size={14} />
                      <Badge variant="danger">Failed</Badge>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t-2 border-gray-200">
          <Button
            variant="secondary"
            onClick={handleClose}
            className="flex-1"
            disabled={syncStatus === 'syncing'}
          >
            {syncStatus === 'idle' ? 'Cancel' : 'Close'}
          </Button>
          {syncStatus === 'idle' && (
            <Button
              variant="primary"
              onClick={handleSyncAll}
              icon={<RefreshCw size={16} />}
              className="flex-1"
            >
              Sync All Data Sources
            </Button>
          )}
          {syncStatus === 'completed' && errorCount > 0 && (
            <Button
              variant="primary"
              onClick={handleSyncAll}
              icon={<RefreshCw size={16} />}
              className="flex-1"
            >
              Retry Failed
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};
