import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  label?: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  id?: string;
  disabled?: boolean;
  'aria-label'?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  helperText,
  value,
  onChange,
  className = '',
  id,
  disabled = false,
  'aria-label': ariaLabel,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');

  const selectedOption = options.find(opt => opt.value === value) || options[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      }
    }
  };

  const handleOptionClick = (option: SelectOption) => {
    if (option.disabled) return;

    if (onChange) {
      // Create a synthetic event to match the original API
      const syntheticEvent = {
        target: { value: option.value },
        currentTarget: { value: option.value },
      } as React.ChangeEvent<HTMLSelectElement>;
      onChange(syntheticEvent);
    }
    setIsOpen(false);
  };

  return (
    <div className="w-full" ref={containerRef}>
      {label && (
        <label
          htmlFor={selectId}
          className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5 uppercase tracking-wide"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {/* Custom Select Button */}
        <button
          type="button"
          id={selectId}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          aria-label={ariaLabel}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className={`
            w-full px-3 py-2 pr-10
            border rounded-md
            text-sm text-left text-[var(--color-text)]
            bg-[var(--color-surface)]
            focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-light)] focus:border-[var(--color-primary)]
            transition-all duration-150
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            ${error
              ? 'border-[var(--color-danger)] focus:ring-[var(--color-danger-light)]'
              : 'border-[var(--color-border)] hover:border-[var(--color-border-strong)]'
            }
            ${className}
          `}
        >
          <span className="block truncate">{selectedOption?.label}</span>

          {/* Chevron Icon */}
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <ChevronDown
              size={16}
              className={`text-[var(--color-text-muted)] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            />
          </span>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div
            className="absolute z-50 w-full mt-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md shadow-lg max-h-60 overflow-auto"
            role="listbox"
          >
            {options.map((option) => {
              const isSelected = option.value === value;
              const isDisabled = option.disabled || false;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleOptionClick(option)}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={isDisabled}
                  disabled={isDisabled}
                  className={`
                    w-full px-3 py-2 text-left text-sm
                    flex items-center justify-between
                    transition-colors duration-150
                    ${isDisabled
                      ? 'opacity-50 cursor-not-allowed text-[var(--color-text-muted)]'
                      : isSelected
                        ? 'bg-[var(--color-primary-light)] text-[var(--color-primary)]'
                        : 'text-[var(--color-text)] hover:bg-[var(--color-panel)]'
                    }
                  `}
                >
                  <span className="block truncate">{option.label}</span>
                  {isSelected && !isDisabled && (
                    <Check size={16} className="text-[var(--color-primary)] ml-2 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        )}
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
