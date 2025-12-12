import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, FileText, Clock, Globe } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/feedback/EmptyState';
import { dashboards } from '../data/dashboards';
import { formatDate, pluralize } from '../utils/formatters';
import { useDebounce } from '../hooks/useDebounce';

export const Dashboards: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 300);

  useEffect(() => {
    window.scrollTo(0, 0);
    const mainElement = document.querySelector('main');
    if (mainElement) mainElement.scrollTo(0, 0);
  }, []);

  const filteredDashboards = dashboards.filter(
    (dashboard) =>
      dashboard.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      dashboard.description.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <div className="animate-fadeIn">
      {/* Header Section */}
      <div className="mb-6 xs:mb-8 md:mb-10">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 xs:gap-6 mb-6 xs:mb-8">
          <div className="flex-1">
            <h1 className="text-2xl xs:text-3xl md:text-4xl font-bold text-[var(--color-title)] tracking-tight mb-2 xs:mb-3">
              Reports Dashboard
            </h1>
            <p className="text-sm xs:text-base text-[var(--color-text-secondary)] font-medium leading-relaxed">
              Access and manage your analytics and business intelligence reports
            </p>
          </div>
          <Button
            variant="primary"
            size="lg"
            icon={<FileText size={20} strokeWidth={2} />}
            className="whitespace-nowrap shadow-lg hover:shadow-xl transition-all duration-200"
            aria-label="Request a new report"
            onClick={() => navigate('/app/support', { state: { openCreateModal: true, category: 'request_new_report', type: 'request' } })}
          >
            Request a Report
          </Button>
        </div>

        {/* Enhanced Search and Filter Bar */}
        <Card className="p-4 xs:p-6" elevated>
          <div className="flex flex-col md:flex-row gap-3 xs:gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <div className="absolute left-3 xs:left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <Search size={18} className="text-[var(--color-text-muted)] xs:w-5 xs:h-5" strokeWidth={2} />
              </div>
              <input
                type="text"
                placeholder="Search by title, description, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search reports"
                className="w-full pl-10 xs:pl-12 pr-3 xs:pr-4 py-2.5 xs:py-3.5 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl text-sm xs:text-base text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all duration-200"
              />
            </div>

        
          </div>

          {/* Search Results Count */}
          {searchQuery && (
            <div className="mt-3 xs:mt-4 pt-3 xs:pt-4 border-t border-[var(--color-border)]">
              <p className="text-xs xs:text-sm text-[var(--color-text-muted)] font-medium">
                Found <span className="font-bold text-[var(--color-primary)]">{filteredDashboards.length}</span> {pluralize(filteredDashboards.length, 'report')} matching your search
              </p>
            </div>
          )}
        </Card>
      </div>

      {/* Reports Grid */}
      {filteredDashboards.length === 0 ? (
        <Card elevated>
          <EmptyState
            icon={<Search size={48} className="text-[var(--color-text-muted)]" strokeWidth={1.5} />}
            title="No Reports Found"
            description={
              searchQuery
                ? "We couldn't find any reports matching your search criteria. Try adjusting your filters or search terms."
                : "No reports are currently available. Request a new report to get started."
            }
          />
        </Card>
      ) : (
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-5 md:gap-6">
          {filteredDashboards.map((dashboard) => (
            <Card
              key={dashboard.id}
              hover
              noPadding
              onClick={() => navigate(`/app/reports/${dashboard.id}`)}
              aria-label={`View ${dashboard.title} report`}
              className="group overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl"
            >
              {/* Thumbnail */}
              <div className="aspect-video bg-[var(--color-panel)] overflow-hidden relative">
                <img
                  src={dashboard.thumbnailUrl}
                  alt={dashboard.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-4 xs:p-5 md:p-6">
                <h3 className="text-base xs:text-lg font-bold text-[var(--color-title)] mb-2 line-clamp-1 group-hover:text-[var(--color-primary)] transition-colors">
                  {dashboard.title}
                </h3>
                <p className="text-xs xs:text-sm text-[var(--color-text-secondary)] mb-4 xs:mb-5 line-clamp-2 font-medium leading-relaxed">
                  {dashboard.description}
                </p>

                {/* Metadata Footer */}
                <div className="flex items-center justify-between pt-3 xs:pt-4 border-t border-[var(--color-border)]">
                  <div className="flex items-center gap-1.5 xs:gap-2 text-xs text-[var(--color-text-muted)] font-medium">
                    <Clock size={12} className="xs:w-3.5 xs:h-3.5" strokeWidth={2} />
                    <span>{formatDate(dashboard.updatedAt)}</span>
                  </div>
                  {dashboard.isPublic && (
                    <div className="flex items-center gap-1 xs:gap-1.5 px-2 xs:px-3 py-1 xs:py-1.5 bg-[var(--color-success-light)] border border-[var(--color-success-border)] text-[var(--color-success)] rounded-lg text-xs font-bold">
                      <Globe size={10} className="xs:w-3 xs:h-3" strokeWidth={2.5} />
                      <span>Public</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
