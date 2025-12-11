import React, { useState } from 'react';
import { Copy, Check, Mail, Link2 } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  dashboardTitle: string;
  dashboardUrl: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  dashboardTitle,
  dashboardUrl,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(dashboardUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  const handleEmailShare = () => {
    const subject = `Check\ out\ this\ dashboard:\ ${dashboardTitle}`;
    const body = `I\ wanted\ to\ share\ this\ dashboard\ with\ you:\n\n${dashboardTitle}\n${dashboardUrl}`;
      
    if (isMobile) {
      // On mobile devices, use mailto link
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    } else {
      // On desktop: open Gmail web compose in a new tab
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.open(gmailUrl, '_blank');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Share Dashboard" size="md">
      <div className="space-y-5">
        {/* Dashboard Title */}
        <div>
          <p className="text-sm font-semibold text-[var(--color-text-secondary)]">
            {dashboardTitle}
          </p>
        </div>

        {/* Copy Link */}
        <div>
          <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">
            Dashboard Link
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={dashboardUrl}
              readOnly
              className="flex-1 px-4 py-2.5 text-sm bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg text-[var(--color-text)] font-medium"
            />
            <Button
              variant={copied ? 'primary' : 'outline'}
              size="md"
              onClick={handleCopyLink}
              icon={copied ? <Check size={16} strokeWidth={2} /> : <Copy size={16} strokeWidth={2} />}
              aria-label={copied ? 'Link copied' : 'Copy link'}
              className="flex-shrink-0"
            >
              {copied ? 'Copied' : 'Copy'}
            </Button>
          </div>
        </div>

        {/* Share via Email */}
        <div>
          <Button
            variant="outline"
            size="lg"
            onClick={handleEmailShare}
            icon={<Mail size={18} strokeWidth={2} />}
            className="w-full justify-center"
          >
            Share via Email
          </Button>
        </div>

        {/* Quick Share Info */}
        <div className="pt-4 border-t border-[var(--color-border)]">
          <div className="flex items-start gap-3 p-3 bg-[var(--color-surface)] rounded-lg">
            <Link2 size={18} className="text-[var(--color-primary)] mt-0.5 flex-shrink-0" strokeWidth={2} />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-[var(--color-text)] mb-1">
                Share Access
              </p>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Anyone with this link can view the dashboard
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-2">
          <Button variant="outline" size="md" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};
