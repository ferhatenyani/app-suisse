import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-3xl',
    xl: 'max-w-5xl',
  };

  // Corporate design: enhanced backdrop, better shadows, smooth animations
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative bg-white rounded-2xl shadow-modal w-[calc(100%-2rem)] ${sizes[size]} min-w-[280px] sm:min-w-[400px] max-h-[90vh] overflow-hidden flex flex-col animate-scaleIn`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-[#E5E9F0]">
          <h2 className="text-2xl font-bold text-[#1E1E2E]">{title}</h2>
          <button
            onClick={onClose}
            className="text-[#64748B] hover:text-[#1E1E2E] transition-colors p-2 rounded-lg hover:bg-[#F8F9FB]"
          >
            <X size={22} />
          </button>
        </div>

        {/* Content */}
        <div className="px-8 py-8 overflow-y-auto flex-1">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="px-8 py-6 border-t border-[#E5E9F0] bg-[#FAFBFC] flex justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
