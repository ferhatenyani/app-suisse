import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Download, Settings, Maximize2, Minimize2, RefreshCw, BarChart3 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { dashboards } from '../data/dashboards';

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
        <Card className="text-center py-20 max-w-lg mx-auto" elevated>
          <div className="flex flex-col items-center px-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center mb-6 shadow-sm">
              <BarChart3 className="w-10 h-10 text-red-500" strokeWidth={2} />
            </div>
            <h2 className="text-2xl font-bold text-[var(--color-title)] mb-3">Report Not Found</h2>
            <p className="text-base text-[var(--color-text-secondary)] font-medium mb-8 leading-relaxed">
              The report you're looking for doesn't exist or may have been removed
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/app/dashboards')}
              icon={<ArrowLeft size={18} strokeWidth={2} />}
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
      <Card className="mb-6 shadow-lg" elevated>
        <div className="p-6">
          <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-6">
            {/* Left: Title and Back */}
            <div className="flex-1 min-w-0">
              <button
                onClick={() => navigate('/app/dashboards')}
                className="flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors mb-4 group"
              >
                <ArrowLeft size={18} strokeWidth={2} className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-bold text-sm">Back to Reports</span>
              </button>
              <h1 className="text-2xl lg:text-3xl font-bold text-[var(--color-title)] mb-2 tracking-tight">
                {dashboard.title}
              </h1>
              <p className="text-[var(--color-text-secondary)] text-sm lg:text-base font-medium leading-relaxed">
                {dashboard.description}
              </p>
            </div>

            {/* Right: Action Buttons */}
            <div className="flex flex-wrap gap-2.5">
              <Button
                variant="outline"
                size="md"
                icon={<RefreshCw size={16} strokeWidth={2} />}
                onClick={() => console.log('Refresh report')}
                className="flex-shrink-0"
              >
                <span className="hidden sm:inline">Refresh</span>
              </Button>
              <Button
                variant="outline"
                size="md"
                icon={isFullscreen ? <Minimize2 size={16} strokeWidth={2} /> : <Maximize2 size={16} strokeWidth={2} />}
                onClick={toggleFullscreen}
                className="flex-shrink-0"
              >
                <span className="hidden sm:inline">{isFullscreen ? 'Exit' : 'Fullscreen'}</span>
              </Button>
              <Button
                variant="outline"
                size="md"
                icon={<Share2 size={16} strokeWidth={2} />}
                onClick={() => console.log('Share report')}
                className="flex-shrink-0"
              >
                <span className="hidden sm:inline">Share</span>
              </Button>
              <Button
                variant="outline"
                size="md"
                icon={<Download size={16} strokeWidth={2} />}
                onClick={() => console.log('Export report')}
                className="flex-shrink-0"
              >
                <span className="hidden sm:inline">Export</span>
              </Button>
              <Button
                variant="secondary"
                size="md"
                icon={<Settings size={16} strokeWidth={2} />}
                onClick={() => console.log('Report settings')}
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
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-[var(--color-background)] via-white to-[var(--color-panel)] p-4 sm:p-8 md:p-12 rounded-2xl overflow-auto">
          {/* Placeholder for Power BI embed - w-full h-full for responsive iframe */}
          <div className="w-full max-w-5xl">
            <div className="text-center px-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 sm:mb-8 bg-white rounded-2xl border-2 border-dashed border-[var(--color-border)] flex items-center justify-center shadow-md">
                <BarChart3 className="w-10 h-10 sm:w-12 sm:h-12 text-[var(--color-primary)]" strokeWidth={2} />
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[var(--color-title)] mb-3 sm:mb-4">
                Power BI Report Container
              </h2>
              <p className="text-sm sm:text-base text-[var(--color-text-secondary)] font-medium mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto">
                This is a placeholder for your Power BI embedded report. The iframe will be inserted here with responsive dimensions that adapt to all screen sizes.
              </p>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-[var(--color-primary)]/20 rounded-xl p-4 sm:p-6 text-left max-w-2xl mx-auto">
                <p className="text-sm sm:text-base text-[var(--color-title)] font-bold mb-3">Integration Example:</p>
                <div className="bg-white/80 rounded-lg p-3 sm:p-4 overflow-x-auto">
                  <code className="text-xs sm:text-sm text-[var(--color-text-secondary)] block font-mono">
                    {`<iframe`}<br />
                    {`  src="YOUR_POWERBI_EMBED_URL"`}<br />
                    {`  className="w-full h-[70vh] sm:h-[80vh] md:h-[85vh] lg:h-[90vh] rounded-xl"`}<br />
                    {`  frameBorder="0"`}<br />
                    {`  allowFullScreen`}<br />
                    {`/>`}
                  </code>
                </div>
                <p className="text-xs sm:text-sm text-[var(--color-text-muted)] font-medium mt-4 leading-relaxed">
                  The container automatically adjusts to mobile, tablet, and desktop viewports with optimized spacing and typography.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
