import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className = '',
  id,
  icon,
  ...props
}) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5 uppercase tracking-wide"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          className={`
            w-full px-3 py-2 ${icon ? 'pl-10' : ''}
            border rounded-md
            text-sm text-[var(--color-text)]
            placeholder:text-[var(--color-text-muted)]
            bg-[var(--color-surface)]
            focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-light)] focus:border-[var(--color-primary)]
            transition-all duration-150
            ${error
              ? 'border-[var(--color-danger)] focus:ring-[var(--color-danger-light)]'
              : 'border-[var(--color-border)] hover:border-[var(--color-border-strong)]'
            }
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-xs text-[var(--color-danger)]">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-xs text-[var(--color-text-muted)]">{helperText}</p>
      )}
    </div>
  );
};
