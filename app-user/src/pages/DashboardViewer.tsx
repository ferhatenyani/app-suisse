import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Download, Settings, Maximize2, Minimize2, RefreshCw, BarChart3 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { PowerBiPlaceholder } from '../components/ui/PowerBiPlaceholder';
import { dashboards } from '../data/dashboards';
import { getMockDataForDashboard } from '../data/dashboardMocks';

export const DashboardViewer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const dashboard = dashboards.find((d) => d.id === id);

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error('Error toggling fullscreen:', error);
    }
  };

  // Listen for fullscreen changes (e.g., user pressing ESC)
  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  if (!dashboard) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Card className="text-center py-12 xs:py-16 md:py-20 max-w-lg mx-auto" elevated>
          <div className="flex flex-col items-center px-4 xs:px-6">
            <div className="w-16 h-16 xs:w-20 xs:h-20 rounded-2xl bg-gradient-to-br from-[var(--color-danger-light)] to-[var(--color-danger-light)] flex items-center justify-center mb-4 xs:mb-6 shadow-sm">
              <BarChart3 className="w-8 h-8 xs:w-10 xs:h-10 text-[var(--color-danger)]" strokeWidth={2} />
            </div>
            <h2 className="text-xl xs:text-2xl font-bold text-[var(--color-title)] mb-2 xs:mb-3">Report Not Found</h2>
            <p className="text-sm xs:text-base text-[var(--color-text-secondary)] font-medium mb-6 xs:mb-8 leading-relaxed">
              The report you're looking for doesn't exist or may have been removed
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/app/dashboards')}
              icon={<ArrowLeft size={18} strokeWidth={2} />}
              aria-label="Go back to reports list"
            >
              Back to Reports
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Corporate Report Viewer: toolbar with actions + Power BI embed container
  return (
    <div ref={containerRef} className="h-full flex flex-col bg-[var(--color-background)]">
      {/* Toolbar */}
      <Card className="mb-4 xs:mb-6 shadow-lg" elevated>
        <div className="p-4 xs:p-6">
          <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-4 xs:gap-6">
            {/* Left: Title and Back */}
            <div className="flex-1 min-w-0">
              <button
                onClick={() => navigate('/app/dashboards')}
                aria-label="Go back to reports list"
                className="flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors mb-3 xs:mb-4 group"
              >
                <ArrowLeft size={16} className="xs:w-[18px] xs:h-[18px] group-hover:-translate-x-1 transition-transform" strokeWidth={2} />
                <span className="font-bold text-xs xs:text-sm">Back to Reports</span>
              </button>
              <h1 className="text-xl xs:text-2xl lg:text-3xl font-bold text-[var(--color-title)] mb-1 xs:mb-2 tracking-tight">
                {dashboard.title}
              </h1>
              <p className="text-[var(--color-text-secondary)] text-xs xs:text-sm lg:text-base font-medium leading-relaxed">
                {dashboard.description}
              </p>
            </div>

            {/* Right: Action Buttons */}
            <div className="flex flex-wrap gap-2 xs:gap-2.5">
              <Button
                variant="outline"
                size="md"
                icon={<RefreshCw size={16} strokeWidth={2} />}
                onClick={() => console.log('Refresh report')}
                aria-label="Refresh report"
                className="flex-shrink-0"
              >
                <span className="hidden sm:inline">Refresh</span>
              </Button>
              <Button
                variant="outline"
                size="md"
                icon={isFullscreen ? <Minimize2 size={16} strokeWidth={2} /> : <Maximize2 size={16} strokeWidth={2} />}
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? 'Exit fullscreen mode' : 'Enter fullscreen mode'}
                className="flex-shrink-0"
              >
                <span className="hidden sm:inline">{isFullscreen ? 'Exit' : 'Fullscreen'}</span>
              </Button>
              <Button
                variant="outline"
                size="md"
                icon={<Share2 size={16} strokeWidth={2} />}
                onClick={() => console.log('Share report')}
                aria-label="Share report"
                className="flex-shrink-0"
              >
                <span className="hidden sm:inline">Share</span>
              </Button>
              <Button
                variant="outline"
                size="md"
                icon={<Download size={16} strokeWidth={2} />}
                onClick={() => console.log('Export report')}
                aria-label="Export report"
                className="flex-shrink-0"
              >
                <span className="hidden sm:inline">Export</span>
              </Button>
              <Button
                variant="secondary"
                size="md"
                icon={<Settings size={16} strokeWidth={2} />}
                onClick={() => console.log('Report settings')}
                aria-label="Report settings"
                className="flex-shrink-0"
              >
                <span className="hidden sm:inline">Settings</span>
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Power BI Embed Container */}
      <Card className="flex-1 flex flex-col min-h-0 shadow-lg" noPadding elevated>
        <PowerBiPlaceholder
          title={dashboard.title}
          description={dashboard.description}
          mockMetrics={getMockDataForDashboard(dashboard.id).metrics}
          variant="hybrid"
          fullHeight
        />
      </Card>
    </div>
  );
};
