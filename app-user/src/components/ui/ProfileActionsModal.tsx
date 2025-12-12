import React, { useEffect, useRef } from 'react';
import { User, LogOut } from 'lucide-react';

interface ProfileActionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToProfile: () => void;
  onLogout: () => void;
  userName?: string;
  isExpanded?: boolean;
}

export const ProfileActionsModal: React.FC<ProfileActionsModalProps> = ({
  isOpen,
  onClose,
  onNavigateToProfile,
  onLogout,
  userName = 'User',
  isExpanded = false,
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    // Add a small delay to prevent immediate closure from the button click
    setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 0);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Position based on sidebar state: collapsed (80px) or expanded (256px)
  const leftPosition = isExpanded ? '16px' : '16px';
  const bottomPosition = '64px';

  return (
    <div
      ref={popoverRef}
      className="fixed z-50 w-48 bg-white rounded-lg shadow-lg border border-[var(--color-border)] animate-fadeIn"
      style={{
        left: leftPosition,
        bottom: bottomPosition,
        animation: 'fadeIn 0.15s ease-out',
      }}
    >
      {/* User info header */}
      <div className="px-3 py-2.5 border-b border-[var(--color-border)]">
        <p className="text-xs font-semibold text-[var(--color-title)] truncate">
          {userName}
        </p>
      </div>

      {/* Actions */}
      <div className="py-1">
        <button
          onClick={onNavigateToProfile}
          className="w-full flex items-center gap-2.5 px-3 py-2 text-left text-sm text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] transition-colors"
        >
          <User size={16} strokeWidth={1.5} className="text-[var(--color-text-secondary)]" />
          <span className="font-medium">Profile</span>
        </button>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut size={16} strokeWidth={1.5} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};
