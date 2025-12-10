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
        {/* Header */}
        <div className="text-center mb-6 xs:mb-8">
          <div className="w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 mx-auto mb-4 xs:mb-6 bg-white rounded-2xl border-2 border-dashed border-[var(--color-border)] flex items-center justify-center shadow-md">
            <BarChart3 className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 text-[var(--color-primary)]" strokeWidth={2} />
          </div>
          <h2 className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-bold text-[var(--color-title)] mb-2 xs:mb-3 sm:mb-4">
            {title}
          </h2>
          <p className="text-xs xs:text-sm sm:text-base text-[var(--color-text-secondary)] font-medium leading-relaxed max-w-2xl mx-auto px-4">
            {description}
          </p>
        </div>

        {/* Mock Metrics Grid */}
        {showMetrics && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 xs:gap-4 mb-6 xs:mb-8">
            {mockMetrics.map((metric, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-[var(--color-border)] p-3 xs:p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  {metric.icon && (
                    <div className="w-8 h-8 xs:w-10 xs:h-10 rounded-lg bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-accent)]/10 flex items-center justify-center">
                      {metric.icon}
                    </div>
                  )}
                  {metric.trend !== undefined && (
                    <div className={cn(
                      'flex items-center gap-1 text-xs font-bold',
                      metric.trend > 0 ? 'text-[var(--color-success)]' : 'text-[var(--color-danger)]'
                    )}>
                      <TrendingUp size={12} className={metric.trend < 0 ? 'rotate-180' : ''} />
                      {Math.abs(metric.trend)}%
                    </div>
                  )}
                </div>
                <p className="text-xs text-[var(--color-text-secondary)] font-medium mb-1">{metric.label}</p>
                <p className="text-lg xs:text-xl md:text-2xl font-bold text-[var(--color-title)]">{metric.value}</p>
              </div>
            ))}
          </div>
        )}

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

        {/* Integration Note */}
        <div className="mt-6 xs:mt-8 bg-gradient-to-br from-[var(--color-info-light)] to-[var(--color-primary-light)] border-2 border-[var(--color-primary)]/20 rounded-xl p-3 xs:p-4 sm:p-6">
          <p className="text-xs xs:text-sm sm:text-base text-[var(--color-title)] font-bold mb-2 xs:mb-3">Integration Example:</p>
          <div className="bg-white/80 rounded-lg p-2 xs:p-3 sm:p-4 overflow-x-auto">
            <code className="text-[10px] xs:text-xs sm:text-sm text-[var(--color-text-secondary)] block font-mono whitespace-pre">
{`<iframe
  src="YOUR_POWERBI_EMBED_URL"
  className="w-full h-[70vh] sm:h-[80vh] md:h-[85vh] lg:h-[90vh] rounded-xl"
  frameBorder="0"
  allowFullScreen
/>`}
            </code>
          </div>
          <p className="text-[10px] xs:text-xs sm:text-sm text-[var(--color-text-muted)] font-medium mt-3 xs:mt-4 leading-relaxed">
            Replace this placeholder with your Power BI embed code. The container is fully responsive and optimized for all screen sizes.
          </p>
        </div>

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
