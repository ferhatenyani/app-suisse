import React from 'react';
import { Button } from '../ui/Button';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

/**
 * EmptyState Component
 * Displays a friendly empty state with optional icon, description, and call-to-action
 *
 * @example
 * <EmptyState
 *   icon={<FileText size={48} />}
 *   title="No reports yet"
 *   description="Create your first report to get started"
 *   action={{ label: 'Create Report', onClick: () => navigate('/create') }}
 * />
 */
export const EmptyState: React.FC<EmptyStateProps> = React.memo(({
  icon,
  title,
  description,
  action,
  className = '',
}) => {
  return (
    <div className={`text-center py-12 xs:py-16 md:py-20 ${className}`} role="status">
      {icon && (
        <div className="w-16 h-16 xs:w-20 xs:h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-accent)]/10 flex items-center justify-center mb-4 xs:mb-6 mx-auto shadow-sm">
          <div className="text-[var(--color-primary)]" aria-hidden="true">
            {icon}
          </div>
        </div>
      )}
      <h3 className="text-lg xs:text-xl font-bold text-[var(--color-title)] mb-2 xs:mb-3">
        {title}
      </h3>
      {description && (
        <p className="text-sm xs:text-base text-[var(--color-text-muted)] font-medium leading-relaxed max-w-md mx-auto px-4">
          {description}
        </p>
      )}
      {action && (
        <Button
          onClick={action.onClick}
          variant="primary"
          size="md"
          className="mt-6 xs:mt-8"
          aria-label={action.label}
        >
          {action.label}
        </Button>
      )}
    </div>
  );
});

EmptyState.displayName = 'EmptyState';
