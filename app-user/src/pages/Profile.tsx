import React, { useState } from 'react';
import { Camera, Save, X, User as UserIcon, Mail, Building2, Lock, Calendar, Shield } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Avatar } from '../components/ui/Avatar';
import { currentUser } from '../data/currentUser';

export const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    companyName: currentUser.companyName || '',
    avatar: currentUser.avatar || '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = () => {
    // Mock save logic
    console.log('Saving profile:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: currentUser.name,
      email: currentUser.email,
      companyName: currentUser.companyName || '',
      avatar: currentUser.avatar || '',
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[var(--color-title)] tracking-tight">Profile</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          Manage account settings and preferences
        </p>
      </div>

      {/* Profile Picture Card */}
      <Card className="mb-4">
        <div className="flex items-start gap-5">
          <div className="relative">
            <Avatar
              src={formData.avatar}
              name={formData.name}
              size="xl"
            />
            {isEditing && (
              <button className="absolute bottom-0 right-0 p-1.5 bg-[var(--color-primary)] text-white rounded-md hover:bg-[var(--color-primary-hover)] transition-colors">
                <Camera size={14} strokeWidth={2} />
              </button>
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-[var(--color-title)] mb-1">
              {formData.name}
            </h3>
            <p className="text-xs text-[var(--color-text-muted)] mb-3">
              {formData.email}
            </p>
            {!isEditing && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Personal Information Card */}
      <Card className="mb-4">
        <h3 className="text-xs font-semibold text-[var(--color-title)] uppercase tracking-wide mb-4">
          Personal Information
        </h3>

        <div className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            disabled={!isEditing}
            icon={<UserIcon size={16} strokeWidth={1.5} />}
          />

          <Input
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            disabled={!isEditing}
            icon={<Mail size={16} strokeWidth={1.5} />}
          />

          {currentUser.role === 'organization' && (
            <Input
              label="Company Name"
              type="text"
              value={formData.companyName}
              onChange={(e) => handleChange('companyName', e.target.value)}
              disabled={!isEditing}
              icon={<Building2 size={16} strokeWidth={1.5} />}
            />
          )}
        </div>
      </Card>

      {/* Account Information Card */}
      <Card className="mb-4">
        <h3 className="text-xs font-semibold text-[var(--color-title)] uppercase tracking-wide mb-4">
          Account Details
        </h3>

        <div className="space-y-3">
          {/* Account Type */}
          <div className="flex items-center justify-between py-3 border-b border-[var(--color-border)]">
            <div className="flex items-center gap-3">
              <Shield size={16} className="text-[var(--color-text-muted)]" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-medium text-[var(--color-text)]">Account Type</p>
                <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                  {currentUser.role === 'organization' ? 'Organization account' : 'Personal account'}
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-md bg-[var(--color-panel)] border border-[var(--color-border)] text-xs font-medium text-[var(--color-text)]">
              {currentUser.role === 'organization' ? 'Enterprise' : 'Personal'}
            </span>
          </div>

          {/* Member Since */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <Calendar size={16} className="text-[var(--color-text-muted)]" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-medium text-[var(--color-text)]">Member Since</p>
                <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                  {new Date(currentUser.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Security Card */}
      {isEditing && (
        <Card className="mb-4">
          <h3 className="text-xs font-semibold text-[var(--color-title)] uppercase tracking-wide mb-4">
            Security
          </h3>

          <div className="space-y-4">
            <Input
              label="Current Password"
              type="password"
              placeholder="Enter current password"
              icon={<Lock size={16} strokeWidth={1.5} />}
            />
            <Input
              label="New Password"
              type="password"
              placeholder="Create a strong password"
              icon={<Lock size={16} strokeWidth={1.5} />}
              helperText="Minimum 8 characters"
            />
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Re-enter new password"
              icon={<Lock size={16} strokeWidth={1.5} />}
            />
          </div>
        </Card>
      )}

      {/* Action Buttons */}
      {isEditing && (
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            variant="secondary"
            onClick={handleCancel}
            size="md"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            size="md"
          >
            Save Changes
          </Button>
        </div>
      )}
    </div>
  );
};
