import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-surface-elevated)] via-[var(--color-background)] to-[var(--color-panel)] flex items-center justify-center p-4 xs:p-6" role="main" aria-labelledby="not-found-title">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-6 xs:mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 xs:w-24 xs:h-24 rounded-3xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-elevated mb-4 xs:mb-6">
            <Search className="w-10 h-10 xs:w-12 xs:h-12 text-white opacity-50" />
          </div>
          <h1 className="text-6xl xs:text-7xl md:text-8xl font-bold text-[var(--color-primary)] mb-3 xs:mb-4 tracking-tight" aria-label="Error 404">404</h1>
          <h2 id="not-found-title" className="text-2xl xs:text-3xl font-bold text-[var(--color-title)] mb-2 xs:mb-3 tracking-tight">Page Not Found</h2>
          <p className="text-sm xs:text-base md:text-lg text-[var(--color-text-secondary)] mb-6 xs:mb-8 max-w-md mx-auto px-4">
            The page you're looking for doesn't exist or has been moved to a different location.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 xs:gap-4 justify-center items-center px-4">
          <Button
            variant="primary"
            size="lg"
            onClick={() => window.history.back()}
            icon={<ArrowLeft size={20} />}
            iconPosition="left"
            aria-label="Go back to previous page"
          >
            Go Back
          </Button>
          <Link to="/app/dashboard">
            <Button
              variant="secondary"
              size="lg"
              icon={<Home size={20} />}
              iconPosition="left"
              aria-label="Go to dashboard"
            >
              Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="mt-8 xs:mt-12 pt-6 xs:pt-8 border-t border-[var(--color-border)] max-w-md mx-auto px-4">
          <p className="text-xs xs:text-sm text-[var(--color-text-muted)] mb-3 xs:mb-4">
            Looking for something specific?
          </p>
          <nav className="flex flex-wrap gap-2 xs:gap-3 justify-center" aria-label="Quick navigation">
            <Link
              to="/app/reports"
              className="text-xs xs:text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-medium transition-colors"
            >
              View Reports
            </Link>
            <span className="text-[var(--color-border-strong)]" aria-hidden="true">•</span>
            <Link
              to="/app/dashboard"
              className="text-xs xs:text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-medium transition-colors"
            >
              Dashboard
            </Link>
            <span className="text-[var(--color-border-strong)]" aria-hidden="true">•</span>
            <Link
              to="/app/profile"
              className="text-xs xs:text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-medium transition-colors"
            >
              Profile
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};
