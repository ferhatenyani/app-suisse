import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutGrid, Mail, Lock, ArrowRight } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - redirect to dashboard
    console.log('Logging in:', { email, password, rememberMe });
    navigate('/app/dashboard');
  };

  // Corporate login: centered card with logo, minimal form, professional background
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-surface-elevated)] via-[var(--color-background)] to-[var(--color-panel)] flex items-center justify-center p-6 lg:p-8">
      <div className="w-full max-w-[480px]">
        {/* Logo and Branding */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-elevated mb-6 transition-transform hover:scale-105">
            <LayoutGrid className="w-11 h-11 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-[var(--color-title)] mb-3 tracking-tight">Welcome Back</h1>
          <p className="text-[var(--color-text-secondary)] text-lg">Sign in to access your reports and analytics</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-elevated p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <Input
              label="Email Address"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail size={20} />}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock size={20} />}
              required
            />

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4.5 h-4.5 text-[var(--color-primary)] border-[var(--color-border)] rounded focus:ring-2 focus:ring-[var(--color-primary-light)] cursor-pointer transition-all"
                />
                <span className="text-sm text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors font-medium">Remember me</span>
              </label>

              <Link
                to="/forgot-password"
                className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-semibold transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-8"
              icon={<ArrowRight size={20} />}
              iconPosition="right"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-[var(--color-border)] text-center">
            <p className="text-base text-[var(--color-text-secondary)]">
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
        <p className="text-center text-sm text-[var(--color-text-muted)] mt-10">
          By signing in, you agree to our{' '}
          <a href="#" className="text-[var(--color-primary)] hover:underline transition-all">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-[var(--color-primary)] hover:underline transition-all">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};
