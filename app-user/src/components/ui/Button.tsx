import React from 'react';
import { cn } from '../../utils/cn';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button = React.memo<ButtonProps>(({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  icon,
  iconPosition = 'left',
  loading = false,
  fullWidth = false,
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-semibold rounded-md transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none';

  const variants = {
    primary: 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] focus-visible:ring-[var(--color-primary-light)]',
    secondary: 'bg-transparent border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-strong)] focus-visible:ring-[var(--color-primary-light)]',
    outline: 'bg-transparent border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary-light)] focus-visible:ring-[var(--color-primary-light)]',
    ghost: 'bg-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-title)] focus-visible:ring-[var(--color-primary-light)]',
    danger: 'bg-[var(--color-danger)] text-white hover:opacity-90 focus-visible:ring-[var(--color-danger-light)]',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs h-8',
    md: 'px-4 py-2 text-sm h-9',
    lg: 'px-5 py-2.5 text-base h-10',
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      disabled={disabled || loading}
      aria-busy={loading}
      aria-disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" aria-hidden="true" />
          <span>{children}</span>
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="flex-shrink-0" aria-hidden="true">{icon}</span>}
          {children}
          {icon && iconPosition === 'right' && <span className="flex-shrink-0" aria-hidden="true">{icon}</span>}
        </>
      )}
    </button>
  );
});

Button.displayName = 'Button';
