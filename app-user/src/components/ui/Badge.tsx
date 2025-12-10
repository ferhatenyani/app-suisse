import React from 'react';
import { cn } from '../../utils/cn';
import type { BadgeProps } from '../../types';

/**
 * Badge Component
 * Displays a small label with various variants and optional icon/dot indicator
 *
 * @example
 * <Badge variant="success" size="sm" dot>Active</Badge>
 * <Badge variant="danger" icon={<AlertCircle size={12} />}>Error</Badge>
 */
export const Badge = React.memo<BadgeProps>(({
  variant,
  size = 'md',
  children,
  icon,
  dot,
  className = '',
}) => {
  const variants: Record<typeof variant, string> = {
    success: 'bg-[var(--color-success-light)] text-[var(--color-success)] border-[var(--color-success-border)]',
    warning: 'bg-[var(--color-warning-light)] text-[var(--color-warning)] border-[var(--color-warning-border)]',
    danger: 'bg-[var(--color-danger-light)] text-[var(--color-danger)] border-[var(--color-danger-border)]',
    info: 'bg-[var(--color-info-light)] text-[var(--color-info)] border-[var(--color-info-border)]',
    neutral: 'bg-[var(--color-panel)] text-[var(--color-text-secondary)] border-[var(--color-border)]',
    primary: 'bg-[var(--color-primary-light)] text-[var(--color-primary)] border-transparent',
  };

  const sizes = {
    sm: 'px-1.5 py-0.5 text-[10px] xs:text-xs gap-1',
    md: 'px-2 py-0.5 xs:py-1 text-xs xs:text-sm gap-1 xs:gap-1.5',
  };

  const dotColors: Record<typeof variant, string> = {
    success: 'bg-[var(--color-success)]',
    warning: 'bg-[var(--color-warning)]',
    danger: 'bg-[var(--color-danger)]',
    info: 'bg-[var(--color-info)]',
    neutral: 'bg-[var(--color-text-secondary)]',
    primary: 'bg-[var(--color-primary)]',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded border font-medium transition-colors',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {dot && (
        <span
          className={cn(
            'w-1 h-1 xs:w-1.5 xs:h-1.5 rounded-full',
            dotColors[variant]
          )}
          aria-hidden="true"
        />
      )}
      {icon && <span className="flex items-center" aria-hidden="true">{icon}</span>}
      {children}
    </span>
  );
});

Badge.displayName = 'Badge';
