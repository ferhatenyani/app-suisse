import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'success',
  isVisible,
  onClose,
  duration = 1000,
}) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const icons = {
    success: <CheckCircle size={20} />,
    error: <AlertCircle size={20} />,
    info: <Info size={20} />,
    warning: <AlertTriangle size={20} />,
  };

  const styles = {
    success: {
      bg: 'bg-gradient-to-r from-[#10B981] to-[#059669]',
      border: 'border-[#10B981]',
      text: 'text-white',
    },
    error: {
      bg: 'bg-gradient-to-r from-[#EF4444] to-[#DC2626]',
      border: 'border-[#EF4444]',
      text: 'text-white',
    },
    info: {
      bg: 'bg-gradient-to-r from-[#3B82F6] to-[#2563EB]',
      border: 'border-[#3B82F6]',
      text: 'text-white',
    },
    warning: {
      bg: 'bg-gradient-to-r from-[#F59E0B] to-[#D97706]',
      border: 'border-[#F59E0B]',
      text: 'text-white',
    },
  };

  const currentStyle = styles[type];

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border ${currentStyle.bg} ${currentStyle.border} ${currentStyle.text} min-w-[300px] max-w-md animate-slide-in-from-top`}
      role="alert"
    >
      <div className="flex-shrink-0">
        {icons[type]}
      </div>
      <p className="flex-1 text-sm font-medium">
        {message}
      </p>
      <button
        onClick={onClose}
        className="flex-shrink-0 p-1 rounded-md hover:bg-white/20 transition-colors"
        aria-label="Close notification"
      >
        <X size={16} />
      </button>
    </div>
  );
};
