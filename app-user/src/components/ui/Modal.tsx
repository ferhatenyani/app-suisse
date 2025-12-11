import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
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
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    '2xl': 'max-w-7xl',
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
        className={`relative bg-white rounded-xl sm:rounded-2xl shadow-modal w-full ${sizes[size]} min-w-[320px] sm:min-w-[500px] md:min-w-[600px] max-h-[90vh] overflow-hidden flex flex-col animate-scaleIn mx-auto`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 border-b border-[#E5E9F0]">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#1E1E2E]">{title}</h2>
          <button
            onClick={onClose}
            className="text-[#64748B] hover:text-[#1E1E2E] transition-colors p-1.5 sm:p-2 rounded-lg hover:bg-[#F8F9FB]"
          >
            <X size={20} className="sm:w-[22px] sm:h-[22px]" />
          </button>
        </div>

        {/* Content */}
        <div className="px-4 sm:px-6 md:px-8 py-5 sm:py-6 md:py-8 overflow-y-auto flex-1">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 border-t border-[#E5E9F0] bg-[#FAFBFC] flex justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
