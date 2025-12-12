import React from 'react';
import { BarChart3, TrendingUp, Users, DollarSign } from 'lucide-react';
import { cn } from '../../utils/cn';

interface MockMetric {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: number;
}

interface PowerBiPlaceholderProps {
  title: string;
  description: string;
  mockImageSrc?: string;
  mockMetrics?: MockMetric[];
  variant?: 'screenshot' | 'metrics' | 'hybrid';
  fullHeight?: boolean;
  className?: string;
}

export const PowerBiPlaceholder: React.FC<PowerBiPlaceholderProps> = React.memo(({
  title,
  description,
  mockImageSrc,
  mockMetrics,
  variant = 'hybrid',
  fullHeight = false,
  className = '',
}) => {
  const showScreenshot = (variant === 'screenshot' || variant === 'hybrid') && mockImageSrc;
  const showMetrics = (variant === 'metrics' || variant === 'hybrid') && mockMetrics && mockMetrics.length > 0;

  return (
    <div className={cn(
      'flex flex-col items-center justify-center bg-gradient-to-br from-[var(--color-background)] via-white to-[var(--color-panel)] p-4 xs:p-6 sm:p-8 md:p-12 rounded-2xl',
      fullHeight && 'h-full',
      className
    )}>
      <div className="w-full max-w-6xl">
        
        {/* Mock Screenshot */}
        {showScreenshot && (
          <div className="rounded-xl overflow-hidden border-2 border-[var(--color-border)] shadow-lg bg-white">
            <img
              src={mockImageSrc}
              alt={`${title} preview`}
              className="w-full h-auto object-cover"
              loading="lazy"
              onError={(e) => {
                // Fallback if image fails to load
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}

        

        {/* Accessibility - Screen reader summary */}
        <div className="sr-only" role="status" aria-live="polite">
          Power BI report placeholder for {title}. {description}
          {showMetrics && ` Displaying ${mockMetrics.length} key metrics.`}
        </div>
      </div>
    </div>
  );
});

PowerBiPlaceholder.displayName = 'PowerBiPlaceholder';
