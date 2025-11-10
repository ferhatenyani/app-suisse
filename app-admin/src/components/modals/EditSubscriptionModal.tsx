import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

interface Subscription {
  id: string;
  planName: string;
  price: number;
  billing: string;
  maxUsers: number;
  maxDashboards: number;
  storage: string;
  activeUsers: number;
  features: string[];
}

interface EditSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  subscription: Subscription | null;
  onSave: (updatedSubscription: Subscription) => void;
}

export const EditSubscriptionModal: React.FC<EditSubscriptionModalProps> = ({
  isOpen,
  onClose,
  subscription,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    planName: '',
    price: 0,
    maxUsers: 0,
    maxDashboards: 0,
    storage: '',
  });

  useEffect(() => {
    if (subscription) {
      setFormData({
        planName: subscription.planName,
        price: subscription.price,
        maxUsers: subscription.maxUsers,
        maxDashboards: subscription.maxDashboards,
        storage: subscription.storage,
      });
    }
  }, [subscription]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (subscription) {
      onSave({
        ...subscription,
        ...formData,
      });
    }
    onClose();
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (!subscription) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Subscription Plan"
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
          {/* Plan Name */}
          <div>
            <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">
              Plan Name
            </label>
            <input
              type="text"
              value={formData.planName}
              onChange={(e) => handleInputChange('planName', e.target.value)}
              className="w-full px-4 py-2.5 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">
              Price (${subscription.billing})
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
              className="w-full px-4 py-2.5 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Max Users */}
          <div>
            <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">
              Max Users
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.maxUsers === -1 ? 'Unlimited' : formData.maxUsers}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.toLowerCase() === 'unlimited') {
                    handleInputChange('maxUsers', -1);
                  } else {
                    const num = parseInt(value);
                    if (!isNaN(num) && num >= -1) {
                      handleInputChange('maxUsers', num);
                    }
                  }
                }}
                className="flex-1 px-4 py-2.5 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
                required
              />
              <Button
                type="button"
                variant="secondary"
                size="lg"
                onClick={() => handleInputChange('maxUsers', -1)}
                className="!h-auto !py-2.5"
              >
                Unlimited
              </Button>
            </div>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">
              Click "Unlimited" or type "unlimited" for unlimited users
            </p>
          </div>

          {/* Max Dashboards */}
          <div>
            <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">
              Max Dashboards
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.maxDashboards === -1 ? 'Unlimited' : formData.maxDashboards}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.toLowerCase() === 'unlimited') {
                    handleInputChange('maxDashboards', -1);
                  } else {
                    const num = parseInt(value);
                    if (!isNaN(num) && num >= -1) {
                      handleInputChange('maxDashboards', num);
                    }
                  }
                }}
                className="flex-1 px-4 py-2.5 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
                required
              />
              <Button
                type="button"
                variant="secondary"
                size="lg"
                onClick={() => handleInputChange('maxDashboards', -1)}
                className="!h-auto !py-2.5"
              >
                Unlimited
              </Button>
            </div>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">
              Click "Unlimited" or type "unlimited" for unlimited dashboards
            </p>
          </div>

          {/* Storage */}
          <div>
            <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">
              Storage
            </label>
            <input
              type="text"
              value={formData.storage}
              onChange={(e) => handleInputChange('storage', e.target.value)}
              placeholder="e.g., 10GB, 100GB, Unlimited"
              className="w-full px-4 py-2.5 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="flex-1">
              Save Changes
            </Button>
          </div>
        </form>
    </Modal>
  );
};
