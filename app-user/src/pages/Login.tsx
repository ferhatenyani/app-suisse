import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutGrid, Mail, Lock, ArrowRight, AlertCircle, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useAuth } from '../contexts/AuthContext';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [showDemoCredentials, setShowDemoCredentials] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Redirect if already authenticated
    if (isAuthenticated) {
      navigate('/app/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = login(email, password);

    if (success) {
      navigate('/app/dashboard');
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  const fillDemoCredentials = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError('');
  };

  // Corporate login: centered card with logo, minimal form, professional background
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-surface-elevated)] via-[var(--color-background)] to-[var(--color-panel)] flex items-center justify-center p-4 xs:p-6 lg:p-8">
      <div className="w-full max-w-[480px]">
        {/* Logo and Branding */}
        <div className="text-center mb-8 xs:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 xs:w-20 xs:h-20 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-elevated mb-4 xs:mb-6 transition-transform hover:scale-105">
            <LayoutGrid className="w-9 h-9 xs:w-11 xs:h-11 text-white" />
          </div>
          <h1 className="text-2xl xs:text-3xl md:text-4xl font-bold text-[var(--color-title)] mb-2 xs:mb-3 tracking-tight">Welcome Back</h1>
          <p className="text-[var(--color-text-secondary)] text-sm xs:text-base md:text-lg">Sign in to access your reports and analytics</p>
        </div>

        {/* Demo Credentials Section */}
        <div className="mb-6">
          <button
            type="button"
            onClick={() => setShowDemoCredentials(!showDemoCredentials)}
            className="w-full flex items-center justify-between p-4 xs:p-5 bg-gradient-to-r from-[var(--color-primary)]/15 to-[var(--color-accent)]/15 hover:from-[var(--color-primary)]/25 hover:to-[var(--color-accent)]/25 border-2 border-[var(--color-primary)]/40 rounded-lg transition-all group shadow-sm hover:shadow-md"
            aria-expanded={showDemoCredentials}
            aria-controls="demo-credentials"
          >
            <div className="flex items-center gap-3 xs:gap-4">
              <div className="flex items-center justify-center w-10 h-10 xs:w-12 xs:h-12 rounded-lg bg-[var(--color-primary)]/20 group-hover:bg-[var(--color-primary)]/30 transition-colors">
                <Info size={22} className="text-[var(--color-primary)]" />
              </div>
              <div className="text-left">
                <span className="text-base xs:text-lg font-bold text-[var(--color-title)] block mb-1">Demo Account Access</span>
                <span className="text-sm xs:text-base font-semibold text-[var(--color-primary)] group-hover:text-[var(--color-primary-hover)] transition-colors">
                  Click here to view login credentials
                </span>
              </div>
            </div>
            {showDemoCredentials ? (
              <ChevronUp size={24} className="text-[var(--color-primary)] transition-transform flex-shrink-0" />
            ) : (
              <ChevronDown size={24} className="text-[var(--color-primary)] transition-transform flex-shrink-0 animate-bounce" />
            )}
          </button>

          {showDemoCredentials && (
            <div
              id="demo-credentials"
              className="mt-3 p-4 xs:p-5 bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-lg space-y-4 animate-in fade-in slide-in-from-top-2 duration-200"
            >
              <p className="text-xs xs:text-sm text-[var(--color-text-secondary)] mb-4">
                Use these credentials to explore the demo application:
              </p>

              {/* Organization Account */}
              <div className="p-4 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg hover:border-[var(--color-primary)]/30 transition-colors group">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--color-title)] mb-1">Organization Account</h3>
                    <p className="text-xs text-[var(--color-text-secondary)]">John Anderson - Acme Corporation</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => fillDemoCredentials('organization@gmail.com', 'azerty1234')}
                    className="px-3 py-1.5 text-xs font-medium text-[var(--color-primary)] hover:text-white hover:bg-[var(--color-primary)] border border-[var(--color-primary)] rounded-md transition-all opacity-0 group-hover:opacity-100"
                  >
                    Auto-fill
                  </button>
                </div>
                <div className="space-y-2 text-xs xs:text-sm">
                  <div className="flex items-center gap-2">
                    <Mail size={14} className="text-[var(--color-text-muted)] flex-shrink-0" />
                    <code className="text-[var(--color-text)] font-mono bg-[var(--color-surface-elevated)] px-2 py-1 rounded">organization@gmail.com</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock size={14} className="text-[var(--color-text-muted)] flex-shrink-0" />
                    <code className="text-[var(--color-text)] font-mono bg-[var(--color-surface-elevated)] px-2 py-1 rounded">azerty1234</code>
                  </div>
                </div>
              </div>

              {/* Individual Account */}
              <div className="p-4 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg hover:border-[var(--color-primary)]/30 transition-colors group">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--color-title)] mb-1">Individual Account</h3>
                    <p className="text-xs text-[var(--color-text-secondary)]">Sarah Mitchell</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => fillDemoCredentials('individual@gmail.com', 'azerty1234')}
                    className="px-3 py-1.5 text-xs font-medium text-[var(--color-primary)] hover:text-white hover:bg-[var(--color-primary)] border border-[var(--color-primary)] rounded-md transition-all opacity-0 group-hover:opacity-100"
                  >
                    Auto-fill
                  </button>
                </div>
                <div className="space-y-2 text-xs xs:text-sm">
                  <div className="flex items-center gap-2">
                    <Mail size={14} className="text-[var(--color-text-muted)] flex-shrink-0" />
                    <code className="text-[var(--color-text)] font-mono bg-[var(--color-surface-elevated)] px-2 py-1 rounded">individual@gmail.com</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock size={14} className="text-[var(--color-text-muted)] flex-shrink-0" />
                    <code className="text-[var(--color-text)] font-mono bg-[var(--color-surface-elevated)] px-2 py-1 rounded">azerty1234</code>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Login Card */}
        <Card className="shadow-elevated p-5 xs:p-6 md:p-8">
          <form onSubmit={handleLogin} className="space-y-5 xs:space-y-6" aria-label="Login form">
            {error && (
              <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-red-900 mb-1">Login Failed</p>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            )}

            <Input
              label="Email Address"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail size={20} />}
              aria-label="Email address"
              required
              autoFocus
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock size={20} />}
              aria-label="Password"
              required
            />

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 xs:gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  aria-label="Remember me"
                  className="w-4 h-4 xs:w-4.5 xs:h-4.5 text-[var(--color-primary)] border-[var(--color-border)] rounded focus:ring-2 focus:ring-[var(--color-primary-light)] cursor-pointer transition-all"
                />
                <span className="text-xs xs:text-sm text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors font-medium">Remember me</span>
              </label>

              <Link
                to="/forgot-password"
                className="text-xs xs:text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-semibold transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-6 xs:mt-8"
              icon={<ArrowRight size={20} />}
              iconPosition="right"
              aria-label="Sign in to your account"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-6 xs:mt-8 pt-6 xs:pt-8 border-t border-[var(--color-border)] text-center">
            <p className="text-sm xs:text-base text-[var(--color-text-secondary)]">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-semibold transition-colors"
              >
                Create one now
              </Link>
            </p>
          </div>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs xs:text-sm text-[var(--color-text-muted)] mt-6 xs:mt-10">
          By signing in, you agree to our{' '}
          <a href="#" className="text-[var(--color-primary)] hover:underline transition-all">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-[var(--color-primary)] hover:underline transition-all">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};
