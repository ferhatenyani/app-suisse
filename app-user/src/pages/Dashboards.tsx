import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, FileText, Clock, Globe, Filter } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { dashboards } from '../data/dashboards';

export const Dashboards: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDashboards = dashboards.filter(
    (dashboard) =>
      dashboard.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dashboard.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="animate-fadeIn">
      {/* Header Section */}
      <div className="mb-10">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-[var(--color-title)] tracking-tight mb-3">
              Reports Dashboard
            </h1>
            <p className="text-base text-[var(--color-text-secondary)] font-medium leading-relaxed">
              Access and manage your analytics and business intelligence reports
            </p>
          </div>
          <Button
            variant="primary"
            size="lg"
            icon={<FileText size={20} strokeWidth={2} />}
            className="whitespace-nowrap shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Request a Report
          </Button>
        </div>

        {/* Enhanced Search and Filter Bar */}
        <Card className="p-6" elevated>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <Search size={20} className="text-[var(--color-text-muted)]" strokeWidth={2} />
              </div>
              <input
                type="text"
                placeholder="Search by title, description, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Filter Button */}
            <Button
              variant="outline"
              size="lg"
              icon={<Filter size={18} strokeWidth={2} />}
              className="md:w-auto"
            >
              Filters
            </Button>
          </div>

          {/* Search Results Count */}
          {searchQuery && (
            <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
              <p className="text-sm text-[var(--color-text-muted)] font-medium">
                Found <span className="font-bold text-[var(--color-primary)]">{filteredDashboards.length}</span> {filteredDashboards.length !== 1 ? 'reports' : 'report'} matching your search
              </p>
            </div>
          )}
        </Card>
      </div>

      {/* Reports Grid */}
      {filteredDashboards.length === 0 ? (
        <Card className="text-center py-20" elevated>
          <div className="flex flex-col items-center max-w-md mx-auto">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-accent)]/10 flex items-center justify-center mb-6 shadow-sm">
              <Search className="w-10 h-10 text-[var(--color-text-muted)]" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold text-[var(--color-title)] mb-3">No Reports Found</h3>
            <p className="text-base text-[var(--color-text-muted)] font-medium leading-relaxed">
              {searchQuery
                ? "We couldn't find any reports matching your search criteria. Try adjusting your filters or search terms."
                : "No reports are currently available. Request a new report to get started."}
            </p>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDashboards.map((dashboard) => (
            <Card
              key={dashboard.id}
              hover
              noPadding
              onClick={() => navigate(`/app/reports/${dashboard.id}`)}
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
              <div className="p-6">
                <h3 className="text-lg font-bold text-[var(--color-title)] mb-2 line-clamp-1 group-hover:text-[var(--color-primary)] transition-colors">
                  {dashboard.title}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] mb-5 line-clamp-2 font-medium leading-relaxed">
                  {dashboard.description}
                </p>

                {/* Metadata Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
                  <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)] font-medium">
                    <Clock size={14} strokeWidth={2} />
                    <span>{formatDate(dashboard.updatedAt)}</span>
                  </div>
                  {dashboard.isPublic && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--color-success-light)] border border-[var(--color-success-border)] text-[var(--color-success)] rounded-lg text-xs font-bold">
                      <Globe size={12} strokeWidth={2.5} />
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
