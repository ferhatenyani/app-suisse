import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutGrid, User, Mail, Lock, Building2, ArrowRight } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState<'individual' | 'organization'>('individual');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock signup - redirect to dashboard
    console.log('Signing up:', { ...formData, accountType });
    navigate('/app/dashboard');
  };

  // Corporate signup: matching login design with account type toggle
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-surface-elevated)] via-[var(--color-background)] to-[var(--color-panel)] flex items-center justify-center p-4 xs:p-6 lg:p-8">
      <div className="w-full max-w-[560px]">
        {/* Logo and Branding */}
        <div className="text-center mb-8 xs:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 xs:w-20 xs:h-20 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-elevated mb-4 xs:mb-6 transition-transform hover:scale-105">
            <LayoutGrid className="w-9 h-9 xs:w-11 xs:h-11 text-white" />
          </div>
          <h1 className="text-2xl xs:text-3xl md:text-4xl font-bold text-[var(--color-title)] mb-2 xs:mb-3 tracking-tight">Create Your Account</h1>
          <p className="text-[var(--color-text-secondary)] text-sm xs:text-base md:text-lg">Start managing your reports and analytics today</p>
        </div>

        {/* Signup Card */}
        <Card className="shadow-elevated p-5 xs:p-6 md:p-8">
          {/* Account Type Toggle */}
          <div className="mb-6 xs:mb-8">
            <label className="block text-sm xs:text-base font-semibold text-[var(--color-title)] mb-3 xs:mb-4">
              Account Type
            </label>
            <div className="flex gap-2 xs:gap-3 p-1.5 xs:p-2 bg-[var(--color-panel)] rounded-xl border border-[var(--color-border)]" role="group" aria-label="Select account type">
              <button
                type="button"
                onClick={() => setAccountType('individual')}
                aria-label="Individual account"
                aria-pressed={accountType === 'individual'}
                className={`flex-1 px-3 xs:px-5 py-2.5 xs:py-3.5 rounded-lg text-xs xs:text-sm md:text-base font-semibold transition-all duration-200 ${
                  accountType === 'individual'
                    ? 'bg-white text-[var(--color-primary)] shadow-sm border border-[var(--color-primary)]/20'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-white/50'
                }`}
              >
                <User size={16} className="xs:w-[18px] xs:h-[18px] inline mr-1 xs:mr-2" />
                Individual
              </button>
              <button
                type="button"
                onClick={() => setAccountType('organization')}
                aria-label="Organization account"
                aria-pressed={accountType === 'organization'}
                className={`flex-1 px-3 xs:px-5 py-2.5 xs:py-3.5 rounded-lg text-xs xs:text-sm md:text-base font-semibold transition-all duration-200 ${
                  accountType === 'organization'
                    ? 'bg-white text-[var(--color-primary)] shadow-sm border border-[var(--color-primary)]/20'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-white/50'
                }`}
              >
                <Building2 size={16} className="xs:w-[18px] xs:h-[18px] inline mr-1 xs:mr-2" />
                Organization
              </button>
            </div>
          </div>

          <form onSubmit={handleSignup} className="space-y-5 xs:space-y-6" aria-label="Signup form">
            <Input
              label="Full Name"
              type="text"
              placeholder="John Anderson"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              icon={<User size={20} />}
              aria-label="Full name"
              required
              autoFocus
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="you@company.com"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              icon={<Mail size={20} />}
              aria-label="Email address"
              required
            />

            {accountType === 'organization' && (
              <Input
                label="Company Name"
                type="text"
                placeholder="Acme Corporation"
                value={formData.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)}
                icon={<Building2 size={20} />}
                aria-label="Company name"
                required
              />
            )}

            <Input
              label="Password"
              type="password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              icon={<Lock size={20} />}
              helperText="Must be at least 8 characters with letters and numbers"
              aria-label="Password"
              required
            />

            <Input
              label="Confirm Password"
              type="password"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              icon={<Lock size={20} />}
              aria-label="Confirm password"
              required
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-6 xs:mt-8"
              icon={<ArrowRight size={20} />}
              iconPosition="right"
              aria-label="Create your account"
            >
              Create Account
            </Button>
          </form>

          <div className="mt-6 xs:mt-8 pt-6 xs:pt-8 border-t border-[var(--color-border)] text-center">
            <p className="text-sm xs:text-base text-[var(--color-text-secondary)]">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-semibold transition-colors"
              >
                Sign in instead
              </Link>
            </p>
          </div>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs xs:text-sm text-[var(--color-text-muted)] mt-6 xs:mt-10">
          By creating an account, you agree to our{' '}
          <a href="#" className="text-[var(--color-primary)] hover:underline transition-all">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-[var(--color-primary)] hover:underline transition-all">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};
