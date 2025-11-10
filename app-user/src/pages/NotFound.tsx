import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-surface-elevated)] via-[var(--color-background)] to-[var(--color-panel)] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-elevated mb-6">
            <Search className="w-12 h-12 text-white opacity-50" />
          </div>
          <h1 className="text-8xl font-bold text-[var(--color-primary)] mb-4 tracking-tight">404</h1>
          <h2 className="text-3xl font-bold text-[var(--color-title)] mb-3 tracking-tight">Page Not Found</h2>
          <p className="text-lg text-[var(--color-text-secondary)] mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved to a different location.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            variant="primary"
            size="lg"
            onClick={() => window.history.back()}
            icon={<ArrowLeft size={20} />}
            iconPosition="left"
          >
            Go Back
          </Button>
          <Link to="/app/dashboard">
            <Button
              variant="secondary"
              size="lg"
              icon={<Home size={20} />}
              iconPosition="left"
            >
              Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-[var(--color-border)] max-w-md mx-auto">
          <p className="text-sm text-[var(--color-text-muted)] mb-4">
            Looking for something specific?
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              to="/app/reports"
              className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-medium transition-colors"
            >
              View Reports
            </Link>
            <span className="text-[var(--color-border-strong)]">•</span>
            <Link
              to="/app/dashboard"
              className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-medium transition-colors"
            >
              Dashboard
            </Link>
            <span className="text-[var(--color-border-strong)]">•</span>
            <Link
              to="/app/profile"
              className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-medium transition-colors"
            >
              Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
