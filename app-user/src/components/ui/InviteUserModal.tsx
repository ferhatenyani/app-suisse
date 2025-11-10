import React, { useState } from 'react';
import { Modal } from './Modal';
import { Input } from './Input';
import { Select } from './Select';
import { Button } from './Button';
import { Mail, UserPlus, Info, Shield } from 'lucide-react';

interface InviteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvite?: (email: string, role: string) => void;
}

export const InviteUserModal: React.FC<InviteUserModalProps> = ({
  isOpen,
  onClose,
  onInvite,
}) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('viewer');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (emailError && validateEmail(newEmail)) {
      setEmailError('');
    }
  };

  const handleInvite = () => {
    if (!email.trim()) {
      setEmailError('Email address is required');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    // Call the onInvite callback if provided
    if (onInvite) {
      onInvite(email, role);
    }

    // Reset form
    setEmail('');
    setRole('viewer');
    setEmailError('');
    onClose();
  };

  const handleClose = () => {
    setEmail('');
    setRole('viewer');
    setEmailError('');
    onClose();
  };

  const getRoleDescription = (roleValue: string): string => {
    switch (roleValue) {
      case 'admin':
        return 'Full system access including user management, settings, and billing';
      case 'editor':
        return 'Can create, edit, publish, and share reports with the team';
      case 'viewer':
        return 'Read-only access to shared reports and dashboards';
      default:
        return '';
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Invite Team Member"
      size="lg"
      footer={
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <Button
            variant="outline"
            onClick={handleClose}
            className="flex-1 sm:flex-none sm:min-w-[160px] justify-center order-2 sm:order-1 py-3 text-base"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleInvite}
            disabled={!email.trim()}
            icon={<UserPlus size={20} />}
            className="flex-1 sm:flex-none sm:min-w-[200px] justify-center order-1 sm:order-2 py-3 text-base"
          >
            Send Invitation
          </Button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* Info Banner */}
        <div className="flex items-start gap-5 p-6 sm:p-7 bg-gradient-to-br from-[#DBEAFE] to-[#DBEAFE]/80 rounded-2xl border border-[#1D4ED8]/20 shadow-sm transition-all">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
            <Info className="w-7 h-7 sm:w-8 sm:h-8 text-[#1D4ED8]" />
          </div>
          <div className="flex-1 min-w-0 pt-1.5">
            <p className="text-base sm:text-lg text-[#1E1E2E] leading-relaxed font-medium">
              The invited member will receive an email with instructions to join your team and access reports.
            </p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-7">
          <Input
            label="Email Address"
            type="email"
            placeholder="colleague@company.com"
            value={email}
            onChange={handleEmailChange}
            icon={<Mail size={20} />}
            error={emailError}
            helperText={!emailError ? "Enter the work email of the team member you want to invite" : undefined}
            autoComplete="email"
          />

          <div className="space-y-5">
            <Select
              label="Access Level"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              options={[
                { value: 'viewer', label: 'Viewer' },
                { value: 'editor', label: 'Editor' },
                { value: 'admin', label: 'Admin' },
              ]}
            />

            {/* Role Description */}
            <div className="flex items-start gap-4 p-5 sm:p-6 bg-gradient-to-br from-[#F8F9FB] to-[#F8F9FB]/60 rounded-xl border border-[#E5E9F0] shadow-sm transition-all">
              <Shield className="w-6 h-6 text-[#64748B] flex-shrink-0 mt-0.5" />
              <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
                {getRoleDescription(role)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
