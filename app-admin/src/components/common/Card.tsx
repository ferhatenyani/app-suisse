import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  noPadding?: boolean;
  elevated?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hover = false,
  noPadding = false,
  elevated = false,
}) => {
  return (
    <div
      className={`
        bg-[var(--color-surface)]
        border border-[var(--color-border)]
        rounded-xl
        ${elevated ? 'shadow-md' : 'shadow-sm'}
        ${hover ? 'transition-all duration-200 hover:shadow-lg hover:border-[var(--color-border-strong)] hover:-translate-y-0.5 cursor-pointer' : 'transition-shadow duration-150'}
        ${onClick ? 'cursor-pointer' : ''}
        ${noPadding ? '' : 'p-6'}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
