import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { DataSource } from '../../data/mockData';
import { RefreshCw, Database, CheckCircle, XCircle, Clock } from 'lucide-react';

interface SyncDataSourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  dataSource: DataSource | null;
  onSync: (dataSourceId: string) => void;
}

type SyncStatus = 'idle' | 'syncing' | 'success' | 'error';

export const SyncDataSourceModal: React.FC<SyncDataSourceModalProps> = ({
  isOpen,
  onClose,
  dataSource,
  onSync,
}) => {
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      // Reset state when modal closes
      setSyncStatus('idle');
      setProgress(0);
    }
  }, [isOpen]);

  if (!dataSource) return null;

  const handleSync = () => {
    setSyncStatus('syncing');
    setProgress(0);

    // Simulate sync progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Simulate random success/error (80% success rate)
          const success = Math.random() > 0.2;
          setSyncStatus(success ? 'success' : 'error');
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    // Call the actual sync handler
    onSync(dataSource.id);
  };

  const handleClose = () => {
    if (syncStatus !== 'syncing') {
      onClose();
    }
  };

  const statusVariants = {
    connected: 'success' as const,
    disconnected: 'warning' as const,
    error: 'danger' as const,
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Sync Data Source"
      size="lg"
    >
      <div className="space-y-6">
        {/* Data Source Info */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white flex-shrink-0">
              <Database size={20} strokeWidth={2} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-[var(--color-title)] truncate">
                {dataSource.name}
              </h3>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <Badge variant="default">{dataSource.type}</Badge>
                <Badge variant={statusVariants[dataSource.status]}>{dataSource.status}</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Sync Status */}
        {syncStatus === 'idle' && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
            <div className="flex items-start gap-3">
              <Clock className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="font-semibold text-blue-900 mb-1">Ready to Sync</h4>
                <p className="text-sm text-blue-700">
                  This will synchronize the data source with the latest data. The process may take a few moments depending on the data volume.
                </p>
                <p className="text-sm text-blue-700 mt-2">
                  <strong>Last synced:</strong> {dataSource.lastSync}
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
                  Please wait while we synchronize your data source.
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-semibold text-blue-700">
                <span>Progress</span>
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

        {syncStatus === 'success' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-5">
            <div className="flex items-start gap-3">
              <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="font-semibold text-green-900 mb-1">Sync Completed Successfully!</h4>
                <p className="text-sm text-green-700">
                  The data source has been synchronized successfully. All data is up to date.
                </p>
              </div>
            </div>
          </div>
        )}

        {syncStatus === 'error' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-5">
            <div className="flex items-start gap-3">
              <XCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="font-semibold text-red-900 mb-1">Sync Failed</h4>
                <p className="text-sm text-red-700">
                  An error occurred while synchronizing the data source. Please check the connection and try again.
                </p>
              </div>
            </div>
          </div>
        )}

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
              onClick={handleSync}
              icon={<RefreshCw size={16} />}
              className="flex-1"
            >
              Start Sync
            </Button>
          )}
          {syncStatus === 'error' && (
            <Button
              variant="primary"
              onClick={handleSync}
              icon={<RefreshCw size={16} />}
              className="flex-1"
            >
              Retry Sync
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};
