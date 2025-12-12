import React from 'react';
import { Crown, Check, X } from 'lucide-react';
import { Button } from './Button';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const proFeatures = [
    'Team collaboration and management',
    'Advanced role-based access control',
    'Unlimited team members',
    'Priority customer support',
    'Advanced analytics and reporting',
    'Custom branding options',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-md min-w-[320px] sm:min-w-[500px] max-h-[90vh] overflow-hidden animate-scaleIn mx-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-[var(--color-text-muted)] hover:text-[var(--color-title)] transition-colors p-2 rounded-lg hover:bg-[var(--color-surface-hover)]"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Header with gradient */}
        <div className="relative bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] text-white p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-4">
            <Crown size={32} className="text-white" strokeWidth={2} />
          </div>
          <h2 className="text-2xl font-bold mb-2">Upgrade to Pro</h2>
          <p className="text-white/90 text-sm">Unlock powerful team collaboration features</p>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-[var(--color-title)] mb-4">Pro Features Include:</h3>
            <ul className="space-y-3">
              {proFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--color-success)]/10 flex items-center justify-center mt-0.5">
                    <Check size={14} className="text-[var(--color-success)]" strokeWidth={3} />
                  </div>
                  <span className="text-sm text-[var(--color-text)] font-medium">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pricing */}
          <div className="bg-gradient-to-br from-[var(--color-primary)]/5 to-[var(--color-accent)]/5 rounded-xl p-5 mb-6 border-2 border-[var(--color-primary)]/20">
            <div className="text-center">
              <p className="text-sm text-[var(--color-text-muted)] font-medium mb-1">Starting at</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold text-[var(--color-title)]">$29</span>
                <span className="text-lg text-[var(--color-text-muted)] font-medium">/month</span>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] mt-2">Billed monthly or save 20% with annual billing</p>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              icon={<Crown size={18} />}
              onClick={() => {
                // In a real app, this would navigate to the upgrade/checkout page
                alert('Contact sales to upgrade your account!');
                onClose();
              }}
            >
              Upgrade Now
            </Button>
            <Button
              variant="ghost"
              size="md"
              className="w-full"
              onClick={onClose}
            >
              Maybe Later
            </Button>
          </div>

          {/* Footer note */}
          <p className="text-xs text-center text-[var(--color-text-muted)] mt-4">
            No credit card required. Cancel anytime.
          </p>
        </div>
      </div>
    </div>
  );
};
