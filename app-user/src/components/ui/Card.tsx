import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  noPadding?: boolean;
  elevated?: boolean;
  'aria-label'?: string;
}

export const Card = React.memo<CardProps>(({
  children,
  className = '',
  onClick,
  hover = false,
  noPadding = false,
  elevated = false,
  'aria-label': ariaLabel,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={cn(
        'bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl',
        elevated ? 'shadow-md' : 'shadow-sm',
        hover && 'transition-all duration-200 hover:shadow-lg hover:border-[var(--color-border-strong)] hover:-translate-y-0.5',
        onClick && 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2',
        !hover && 'transition-shadow duration-150',
        noPadding ? '' : 'p-6',
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? handleKeyDown : undefined}
      aria-label={ariaLabel}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';
