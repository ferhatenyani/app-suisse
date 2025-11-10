import React, { useState } from 'react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Check, Edit, Users } from 'lucide-react';
import { subscriptions as initialSubscriptions } from '../data/mockData';
import { EditSubscriptionModal } from '../components/modals/EditSubscriptionModal';

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

export const Subscriptions: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(initialSubscriptions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);

  const handleEditClick = (subscription: Subscription) => {
    setSelectedSubscription(subscription);
    setIsModalOpen(true);
  };

  const handleSaveSubscription = (updatedSubscription: Subscription) => {
    setSubscriptions((prev) =>
      prev.map((sub) =>
        sub.id === updatedSubscription.id ? updatedSubscription : sub
      )
    );
  };
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[var(--color-title)] tracking-tight">
          Subscription Plans
        </h1>
        <p className="text-base text-[var(--color-text-secondary)] mt-2 font-medium">
          Manage pricing tiers and subscription plans
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {subscriptions.map((plan) => (
          <Card key={plan.id} elevated>
            <div className="flex items-center justify-between mb-1">
              <Badge variant="info">{plan.activeUsers} active users</Badge>
              <Button
                variant="ghost"
                size="sm"
                icon={<Edit size={14} />}
                onClick={() => handleEditClick(plan)}
              >
                Edit
              </Button>
            </div>
            <div className="space-y-4 mt-4">
              <div>
                <h3 className="text-xl font-bold text-[var(--color-title)]">{plan.planName}</h3>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-3xl font-bold text-[var(--color-primary)]">
                    ${plan.price}
                  </span>
                  <span className="text-sm text-[var(--color-text-muted)] font-medium">
                    /{plan.billing}
                  </span>
                </div>
              </div>
              <div className="pt-4 border-t border-[var(--color-border)]">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[var(--color-text-secondary)] font-medium">Users</span>
                    <span className="font-semibold text-[var(--color-title)]">
                      {plan.maxUsers === -1 ? 'Unlimited' : plan.maxUsers}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[var(--color-text-secondary)] font-medium">Dashboards</span>
                    <span className="font-semibold text-[var(--color-title)]">
                      {plan.maxDashboards === -1 ? 'Unlimited' : plan.maxDashboards}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[var(--color-text-secondary)] font-medium">Storage</span>
                    <span className="font-semibold text-[var(--color-title)]">{plan.storage}</span>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-[var(--color-border)]">
                <p className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-3">
                  Features
                </p>
                <div className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check size={14} className="text-[var(--color-success)] mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                      <span className="text-sm text-[var(--color-text)]">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Plan Comparison */}
      <Card elevated>
        <h3 className="text-lg font-bold text-[var(--color-title)] mb-5">Plan Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                <th className="text-left px-4 py-3 text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider bg-[var(--color-panel)]">
                  Feature
                </th>
                {subscriptions.map((plan) => (
                  <th
                    key={plan.id}
                    className="text-center px-4 py-3 text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider bg-[var(--color-panel)]"
                  >
                    {plan.planName}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              <tr>
                <td className="px-4 py-3 text-sm font-semibold text-[var(--color-text)]">Price</td>
                {subscriptions.map((plan) => (
                  <td key={plan.id} className="px-4 py-3 text-center">
                    <span className="text-sm font-bold text-[var(--color-primary)]">
                      ${plan.price}/{plan.billing}
                    </span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-semibold text-[var(--color-text)]">
                  Max Users
                </td>
                {subscriptions.map((plan) => (
                  <td key={plan.id} className="px-4 py-3 text-center text-sm">
                    {plan.maxUsers === -1 ? 'Unlimited' : plan.maxUsers}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-semibold text-[var(--color-text)]">
                  Max Dashboards
                </td>
                {subscriptions.map((plan) => (
                  <td key={plan.id} className="px-4 py-3 text-center text-sm">
                    {plan.maxDashboards === -1 ? 'Unlimited' : plan.maxDashboards}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-semibold text-[var(--color-text)]">Storage</td>
                {subscriptions.map((plan) => (
                  <td key={plan.id} className="px-4 py-3 text-center text-sm">
                    {plan.storage}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-semibold text-[var(--color-text)]">
                  Active Subscribers
                </td>
                {subscriptions.map((plan) => (
                  <td key={plan.id} className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Users size={14} className="text-[var(--color-text-muted)]" />
                      <span className="text-sm font-semibold">{plan.activeUsers}</span>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* Edit Modal */}
      <EditSubscriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        subscription={selectedSubscription}
        onSave={handleSaveSubscription}
      />
    </div>
  );
};
