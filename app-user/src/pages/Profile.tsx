import React, { useState, useEffect } from 'react';
import { Camera, Save, X, User as UserIcon, Mail, Building2, Lock, Calendar, Shield, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Avatar } from '../components/ui/Avatar';
import { currentUser } from '../data/currentUser';
import { formatDate } from '../utils/formatters';

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingMainContent, setIsEditingMainContent] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    companyName: currentUser.companyName || '',
    avatar: currentUser.avatar || '',
  });
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const mainElement = document.querySelector('main');
    if (mainElement) mainElement.scrollTo(0, 0);
  }, []);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSaveProfile = () => {
    // Mock save logic for profile picture card
    console.log('Saving profile picture:', formData.avatar);
    setIsEditingProfile(false);
  };

  const handleCancelProfile = () => {
    setFormData({
      ...formData,
      avatar: currentUser.avatar || '',
    });
    setIsEditingProfile(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          avatar: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleSaveMainContent = () => {
    // Mock save logic for main content
    console.log('Saving main content:', formData);
    setIsEditingMainContent(false);
  };

  const handleCancelMainContent = () => {
    setFormData({
      name: currentUser.name,
      email: currentUser.email,
      companyName: currentUser.companyName || '',
      avatar: currentUser.avatar || '',
    });
    setIsEditingMainContent(false);
  };

  const handleLogout = () => {
    // Clear any user session data here if needed
    navigate('/login');
  };

  return (
    <div className="min-h-screen pb-8 animate-fadeIn">
      {/* Header - Centered */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl lg:text-5xl font-bold text-[var(--color-title)] tracking-tight">Profile</h1>
        <p className="text-lg text-[var(--color-text-secondary)] mt-3 font-medium">
          Manage account settings and preferences
        </p>
      </div>

      {/* Top Cards - Side by side on large screens, centered */}
      <div className="mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          {/* Profile Picture Card */}
          <Card className="flex flex-col">
            <div className="flex flex-col h-full items-center text-center">
              <div className="flex flex-col items-center gap-4 flex-1">
                <div className="relative">
                  <Avatar
                    src={formData.avatar}
                    name={formData.name}
                    size="xl"
                    className="lg:w-25 lg:h-25"
                  />
                  {isEditingProfile && (
                    <>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        aria-label="Upload profile picture"
                      />
                      <button
                        onClick={handleCameraClick}
                        aria-label="Change profile picture"
                        className="absolute bottom-0 right-0 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-200 hover:shadow-lg hover:scale-105"
                      >
                        <Camera size={16} strokeWidth={2} />
                      </button>
                    </>
                  )}
                </div>
                <div className="flex-1 min-w-0 w-full">
                  <h3 className="text-xl font-bold text-[var(--color-title)] mb-1.5 truncate">
                    {formData.name}
                  </h3>
                  <p className="text-base text-[var(--color-text-muted)] mb-2 truncate font-medium">
                    {formData.email}
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-4 w-full">
                {!isEditingProfile ? (
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={() => setIsEditingProfile(true)}
                    aria-label="Edit profile picture"
                    className="text-base w-full py-4 px-10 hover:bg-slate-100 hover:border-slate-300 transition-all duration-200"
                  >
                    Edit Profile Picture
                  </Button>
                ) : (
                  <div className="flex items-center gap-3">
                    <Button
                      variant="secondary"
                      size="md"
                      onClick={handleCancelProfile}
                      aria-label="Cancel changes"
                      className="flex-1 text-base py-2.5"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      size="md"
                      onClick={handleSaveProfile}
                      aria-label="Save profile picture"
                      className="flex-1 text-base py-2.5"
                    >
                      Save
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Account Information Card */}
          <Card className="flex flex-col ">
            <div className="flex flex-col h-full">
              <h3 className="text-base font-bold text-[var(--color-title)] tracking-tight mb-5">
                Account Details
              </h3>

              <div className="space-y-0 flex-1">
                {/* Account Type */}
                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-3.5 min-w-0 flex-1">
                    <Shield size={20} className="text-emerald-600 flex-shrink-0" strokeWidth={1.5} />
                    <div className="min-w-0">
                      <p className="text-base font-semibold text-[var(--color-text)]">Account Type</p>
                      <p className="text-sm text-[var(--color-text-muted)] mt-1 truncate font-medium">
                        {currentUser.role === 'organization' ? 'Organization account' : 'Personal account'}
                      </p>
                    </div>
                  </div>
                  <span className={`px-4 py-2 rounded-md border text-sm font-semibold flex-shrink-0 ml-2 transition-all duration-200 ${
                    currentUser.role === 'organization'
                      ? 'bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200 text-purple-700'
                      : 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 text-blue-700'
                  }`}>
                    {currentUser.role === 'organization' ? 'Enterprise' : 'Personal'}
                  </span>
                </div>

                {/* Member Since */}
                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-3.5">
                    <Calendar size={20} className="text-emerald-600 flex-shrink-0" strokeWidth={1.5} />
                    <div>
                      <p className="text-base font-semibold text-[var(--color-text)]">Member Since</p>
                      <p className="text-sm text-[var(--color-text-muted)] mt-1 font-medium">
                        {formatDate(currentUser.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Main Content - Settings Forms - Centered */}
      <div className="w-full">
        <Card>
            <div className="space-y-7">
              {/* Header with Edit Button */}
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-[var(--color-title)] tracking-tight">
                  Personal Information & Security
                </h3>
                {!isEditingMainContent && (
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={() => setIsEditingMainContent(true)}
                    aria-label="Edit personal information"
                    className="text-base py-2.5 px-5 hover:border-slate-400 hover:text-slate-700 transition-all duration-200"
                  >
                    Edit
                  </Button>
                )}
              </div>

              {/* Personal Information Section */}
              <div className="border-l-4 border-l-slate-400 pl-5">
                <h4 className="text-base font-semibold text-[var(--color-text)] mb-5">Personal Information</h4>
                <div className="space-y-5">
                  <Input
                    label="Full Name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    disabled={!isEditingMainContent}
                    icon={<UserIcon size={18} strokeWidth={1.5} className="text-slate-600" />}
                    aria-label="Full name"
                  />

                  <Input
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    disabled={!isEditingMainContent}
                    icon={<Mail size={18} strokeWidth={1.5} className="text-slate-600" />}
                    aria-label="Email address"
                  />

                  {currentUser.role === 'organization' && (
                    <Input
                      label="Company Name"
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => handleChange('companyName', e.target.value)}
                      disabled={!isEditingMainContent}
                      icon={<Building2 size={18} strokeWidth={1.5} className="text-slate-600" />}
                      aria-label="Company name"
                    />
                  )}
                </div>
              </div>

              {/* Security Section - Always Visible */}
              <div className="pt-5 border-l-4 border-l-amber-500 pl-5">
                <h4 className="text-base font-semibold text-[var(--color-text)] mb-5">Security</h4>
                <div className="space-y-5">
                  <Input
                    label="Current Password"
                    type="password"
                    placeholder="Enter current password"
                    disabled={!isEditingMainContent}
                    icon={<Lock size={18} strokeWidth={1.5} className="text-amber-600" />}
                    aria-label="Current password"
                  />
                  <Input
                    label="New Password"
                    type="password"
                    placeholder="Create a strong password"
                    disabled={!isEditingMainContent}
                    icon={<Lock size={18} strokeWidth={1.5} className="text-amber-600" />}
                    helperText="Minimum 8 characters"
                    aria-label="New password"
                  />
                  <Input
                    label="Confirm Password"
                    type="password"
                    placeholder="Re-enter new password"
                    disabled={!isEditingMainContent}
                    icon={<Lock size={18} strokeWidth={1.5} className="text-amber-600" />}
                    aria-label="Confirm new password"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              {isEditingMainContent && (
                <div className="flex items-center justify-end gap-4 pt-5 border-t border-[var(--color-border)]">
                  <Button
                    variant="secondary"
                    onClick={handleCancelMainContent}
                    size="md"
                    aria-label="Cancel changes"
                    className="text-base py-2.5 px-6 hover:border-red-300 hover:text-red-600 transition-all duration-200"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleSaveMainContent}
                    size="md"
                    aria-label="Save changes"
                    className="text-base py-2.5 px-6 bg-emerald-600 hover:bg-emerald-700 transition-all duration-200 hover:shadow-lg hover:scale-105"
                  >
                    Save Changes
                  </Button>
                </div>
              )}
            </div>
          </Card>
      </div>

      {/* Logout Button - Bottom of page */}
      <div className="w-full mt-8">
        <Card className="bg-red-50 border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-red-900 mb-1">Log Out</h3>
              <p className="text-sm text-red-700 font-medium">Sign out of your account</p>
            </div>
            <Button
              variant="secondary"
              onClick={handleLogout}
              size="md"
              icon={<LogOut size={18} strokeWidth={1.5} />}
              iconPosition="right"
              aria-label="Log out of your account"
              className="text-base py-2.5 px-6 !bg-red-700 text-white !border-red-700 hover:!bg-red-800 hover:!border-red-800 transition-all duration-200 hover:shadow-lg hover:scale-105"
            >
              Log Out
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
