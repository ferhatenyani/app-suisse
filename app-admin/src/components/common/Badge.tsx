import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'default';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  const variants = {
    success: 'bg-[var(--color-success-light)] text-[var(--color-success)] border-[var(--color-success-border)]',
    warning: 'bg-[var(--color-warning-light)] text-[var(--color-warning)] border-[var(--color-warning-border)]',
    danger: 'bg-[var(--color-danger-light)] text-[var(--color-danger)] border-[var(--color-danger-border)]',
    info: 'bg-[var(--color-info-light)] text-[var(--color-info)] border-[var(--color-info-border)]',
    default: 'bg-[var(--color-panel)] text-[var(--color-text-secondary)] border-[var(--color-border)]',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1 rounded-md font-semibold border
        ${variants[variant]} ${sizes[size]} ${className}
      `}
    >
      {children}
    </span>
  );
};
