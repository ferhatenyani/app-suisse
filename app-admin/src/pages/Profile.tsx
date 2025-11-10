import React, { useState } from 'react';
import { Card } from '../components/common/Card';
import { User, Mail, Shield, Lock, Bell, Globe } from 'lucide-react';
import { UpdatePasswordModal } from '../components/modals/UpdatePasswordModal';

// Section Header Component for consistency
const SectionHeader: React.FC<{ icon: React.ReactNode; title: string }> = ({ icon, title }) => (
  <div className="flex items-center gap-2 mb-5">
    {icon}
    <h3 className="text-base font-bold text-[var(--color-title)] tracking-tight">
      {title}
    </h3>
  </div>
);

// Toggle Switch Component for reusability
const ToggleSwitch: React.FC<{
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description: string;
}> = ({ checked, onChange, label, description }) => (
  <div className="flex items-center justify-between py-3 border-b border-[var(--color-border)] last:border-b-0">
    <div>
      <p className="text-sm font-semibold text-[var(--color-text)]">{label}</p>
      <p className="text-xs text-[var(--color-text-muted)] mt-0.5 font-medium">
        {description}
      </p>
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[var(--color-primary-light)] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-primary)]"></div>
    </label>
  </div>
);

export const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Super Admin',
    email: 'admin@reporthub.com',
    role: 'Super Administrator',
    notifications: {
      email: true,
      pendingAccounts: true,
      systemAlerts: true,
      weeklyReports: false,
    },
  });

  const handleSave = () => {
    // Here you would typically save to backend
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset form data to original values
    setIsEditing(false);
  };

  const handlePasswordUpdate = async (_currentPassword: string, _newPassword: string) => {
    // Here you would typically call your API to update the password
    // For now, we'll simulate a successful update
    console.log('Updating password...');

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // You can add success notification here
    console.log('Password updated successfully');
  };

  return (
    <div className="min-h-screen pb-8 animate-fadeIn">
      {/* Page Header - Flexbox for horizontal alignment */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 lg:mb-8">
        <div className="flex flex-col gap-1.5 sm:gap-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--color-title)] tracking-tight">
            Profile Settings
          </h1>
          <p className="text-sm sm:text-base text-[var(--color-text-secondary)] font-medium">
            Manage your account settings and preferences
          </p>
        </div>
      </header>

      {/* Main Layout - CSS Grid for responsive columns */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(300px,1fr)_2fr] gap-6">
        {/* Sidebar - Profile Overview & Stats */}
        <aside className="flex flex-col gap-6">
          {/* Profile Card */}
          <Card elevated>
            <div className="flex flex-col items-center text-center gap-3">
              {/* Avatar */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white text-3xl font-bold shadow-lg ring-4 ring-white/10">
                SA
              </div>

              {/* Profile Info */}
              <div className="flex flex-col gap-1">
                <h2 className="text-xl font-bold text-[var(--color-title)] tracking-tight">
                  {formData.name}
                </h2>
                <p className="text-sm text-[var(--color-text-muted)] font-medium">
                  {formData.role}
                </p>
              </div>

              {/* Email */}
              <div className="flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)]">
                <Mail size={14} />
                <span className="font-medium">{formData.email}</span>
              </div>

              {/* Access Badge */}
              <div className="flex items-center justify-center gap-2 mt-1 pt-4 border-t border-[var(--color-border)] w-full">
                <Shield size={16} className="text-[var(--color-primary)]" />
                <span className="text-xs font-semibold text-[var(--color-text-secondary)]">
                  Full System Access
                </span>
              </div>
            </div>
          </Card>

          {/* Account Information Card */}
          <Card elevated>
            <h3 className="text-sm font-bold text-[var(--color-title)] tracking-tight mb-4">
              Account Information
            </h3>
            <div className="flex flex-col">
              {[
                { label: 'Member Since', value: 'January 2024' },
                { label: 'Last Login', value: 'Today, 9:30 AM' },
                { label: 'Sessions Active', value: '2 devices' },
              ].map((item, index, array) => (
                <div
                  key={item.label}
                  className={`flex items-center justify-between py-2 ${
                    index < array.length - 1 ? 'border-b border-[var(--color-border)]' : ''
                  }`}
                >
                  <span className="text-xs font-semibold text-[var(--color-text-secondary)]">
                    {item.label}
                  </span>
                  <span className="text-xs font-bold text-[var(--color-text)]">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </aside>

        {/* Main Content - Settings Forms */}
        <main className="flex flex-col gap-6">
          {/* Personal Information Section */}
          <Card elevated>
            {/* Section Header with Actions */}
            <div className="flex items-center justify-between mb-5">
              <SectionHeader
                icon={<User size={20} className="text-[var(--color-primary)]" />}
                title="Personal Information"
              />
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 text-sm font-semibold text-[var(--color-primary)] border border-[var(--color-primary)] rounded-md hover:bg-[var(--color-primary)] hover:text-white transition-colors"
                >
                  Edit
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 text-sm font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-title)] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 text-sm font-semibold text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] rounded-md transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>

            {/* Form Fields */}
            <div className="flex flex-col gap-4">
              {/* Full Name Field */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-[var(--color-text)]">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-2.5 text-sm bg-[var(--color-panel)] border border-[var(--color-border)] rounded-md text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-light)] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>

              {/* Email Field */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-[var(--color-text)]">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-2.5 text-sm bg-[var(--color-panel)] border border-[var(--color-border)] rounded-md text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-light)] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>

              {/* Role Field (Read-only) */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-[var(--color-text)]">
                  Role
                </label>
                <input
                  type="text"
                  value={formData.role}
                  disabled
                  className="w-full px-4 py-2.5 text-sm bg-[var(--color-panel)] border border-[var(--color-border)] rounded-md text-[var(--color-text)] opacity-60 cursor-not-allowed"
                />
                <p className="text-xs text-[var(--color-text-muted)] font-medium">
                  Contact system administrator to change your role
                </p>
              </div>
            </div>
          </Card>

          {/* Security Settings Section */}
          <Card elevated>
            <SectionHeader
              icon={<Lock size={20} className="text-[var(--color-primary)]" />}
              title="Security Settings"
            />

            <div className="flex flex-col gap-4">
              {/* Password Change */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-[var(--color-text)]">
                  Change Password
                </label>
                <button
                  onClick={() => setIsPasswordModalOpen(true)}
                  className="self-start px-4 py-2 text-sm font-semibold text-[var(--color-primary)] border border-[var(--color-primary)] rounded-md hover:bg-[var(--color-primary)] hover:text-white transition-colors"
                >
                  Update Password
                </button>
              </div>

              {/* Two-Factor Authentication */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-[var(--color-border)]">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold text-[var(--color-text)]">
                    Two-Factor Authentication
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)] font-medium">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <button className="self-start sm:self-auto px-4 py-2 text-sm font-semibold text-[var(--color-primary)] border border-[var(--color-primary)] rounded-md hover:bg-[var(--color-primary)] hover:text-white transition-colors whitespace-nowrap">
                  Enable
                </button>
              </div>
            </div>
          </Card>

          {/* Notification Preferences Section */}
          <Card elevated>
            <SectionHeader
              icon={<Bell size={20} className="text-[var(--color-primary)]" />}
              title="Notification Preferences"
            />

            <div className="flex flex-col">
              <ToggleSwitch
                checked={formData.notifications.email}
                onChange={(checked) =>
                  setFormData({
                    ...formData,
                    notifications: { ...formData.notifications, email: checked },
                  })
                }
                label="Email Notifications"
                description="Receive notifications via email"
              />
              <ToggleSwitch
                checked={formData.notifications.pendingAccounts}
                onChange={(checked) =>
                  setFormData({
                    ...formData,
                    notifications: { ...formData.notifications, pendingAccounts: checked },
                  })
                }
                label="Pending Account Alerts"
                description="Get notified when new accounts need review"
              />
              <ToggleSwitch
                checked={formData.notifications.systemAlerts}
                onChange={(checked) =>
                  setFormData({
                    ...formData,
                    notifications: { ...formData.notifications, systemAlerts: checked },
                  })
                }
                label="System Alerts"
                description="Critical system updates and maintenance alerts"
              />
              <ToggleSwitch
                checked={formData.notifications.weeklyReports}
                onChange={(checked) =>
                  setFormData({
                    ...formData,
                    notifications: { ...formData.notifications, weeklyReports: checked },
                  })
                }
                label="Weekly Reports"
                description="Receive weekly summary of platform activity"
              />
            </div>
          </Card>

          {/* Language & Region Section */}
          <Card elevated>
            <SectionHeader
              icon={<Globe size={20} className="text-[var(--color-primary)]" />}
              title="Language & Region"
            />

            <div className="flex flex-col gap-4">
              {/* Language Selector */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-[var(--color-text)]">
                  Language
                </label>
                <select className="w-full px-4 py-2.5 text-sm bg-[var(--color-panel)] border border-[var(--color-border)] rounded-md text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-light)] transition-all">
                  <option>English (US)</option>
                  <option>English (UK)</option>
                  <option>Français</option>
                  <option>Deutsch</option>
                </select>
              </div>

              {/* Timezone Selector */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-[var(--color-text)]">
                  Timezone
                </label>
                <select className="w-full px-4 py-2.5 text-sm bg-[var(--color-panel)] border border-[var(--color-border)] rounded-md text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-light)] transition-all">
                  <option>UTC+1 (Central European Time)</option>
                  <option>UTC+0 (GMT)</option>
                  <option>UTC-5 (Eastern Time)</option>
                  <option>UTC-8 (Pacific Time)</option>
                </select>
              </div>
            </div>
          </Card>
        </main>
      </div>

      {/* Update Password Modal */}
      <UpdatePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSubmit={handlePasswordUpdate}
      />
    </div>
  );
};
