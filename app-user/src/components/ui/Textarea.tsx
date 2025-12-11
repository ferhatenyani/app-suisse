import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helperText,
  className = '',
  id,
  ...props
}) => {
  const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-semibold text-[var(--color-text)] mb-2"
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={`
          w-full px-4 py-2.5
          border rounded-md
          text-sm text-[var(--color-text)]
          placeholder:text-[var(--color-text-muted)]
          bg-[var(--color-panel)]
          focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-light)] focus:border-[var(--color-primary)]
          transition-all duration-150
          disabled:opacity-60 disabled:cursor-not-allowed
          resize-y
          ${error
            ? 'border-[var(--color-danger)] focus:ring-[var(--color-danger-light)]'
            : 'border-[var(--color-border)] hover:border-[var(--color-border-strong)]'
          }
          ${className}
        `}
        {...props}
      />
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
