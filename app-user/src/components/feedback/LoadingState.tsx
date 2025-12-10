import React from 'react';
import { cn } from '../../utils/cn';

export interface LoadingStateProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

/**
 * LoadingState Component
 * Displays a loading spinner with optional text
 * Includes proper ARIA attributes for accessibility
 *
 * @example
 * <LoadingState size="lg" text="Loading reports..." />
 */
export const LoadingState: React.FC<LoadingStateProps> = React.memo(({
  size = 'md',
  text,
  className = '',
}) => {
  const sizes = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4',
  };

  return (
    <div
      className={cn('flex flex-col items-center justify-center py-12', className)}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div
        className={cn(
          'border-[var(--color-border)] border-t-[var(--color-primary)] rounded-full animate-spin',
          sizes[size]
        )}
        aria-hidden="true"
      />
      {text && (
        <p className="mt-4 text-sm xs:text-base text-[var(--color-text-muted)] font-medium">
          {text}
        </p>
      )}
      <span className="sr-only">
        {text || 'Loading...'}
      </span>
    </div>
  );
});

LoadingState.displayName = 'LoadingState';
