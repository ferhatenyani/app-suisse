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
          className="block text-sm font-semibold text-[var(--color-text)] mb-2"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          className={`
            w-full px-4 py-2.5 ${icon ? 'pl-11' : ''}
            border rounded-md
            text-sm text-[var(--color-text)]
            placeholder:text-[var(--color-text-muted)]
            bg-[var(--color-panel)]
            focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-light)] focus:border-[var(--color-primary)]
            transition-all duration-150
            disabled:opacity-60 disabled:cursor-not-allowed
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
        <p className="mt-1.5 text-xs text-[var(--color-danger)] font-medium">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="mt-1.5 text-xs text-[var(--color-text-muted)] font-medium">{helperText}</p>
      )}
    </div>
  );
};
