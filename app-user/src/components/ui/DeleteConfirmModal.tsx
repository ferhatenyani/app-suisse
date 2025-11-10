import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { AlertTriangle, Trash2 } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  itemName?: string;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Deletion',
  message = 'Are you sure you want to delete this item? This action cannot be undone.',
  itemName,
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="lg"
      footer={
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 sm:flex-none sm:min-w-[160px] justify-center py-3 text-base"
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleConfirm}
            icon={<Trash2 size={20} />}
            className="flex-1 sm:flex-none sm:min-w-[220px] justify-center py-3 text-base"
          >
            Delete Permanently
          </Button>
        </div>
      }
    >
      <div className="space-y-7">
        {/* Warning Banner */}
        <div className="flex items-start gap-5 p-6 sm:p-7 bg-gradient-to-br from-[#FEE2E2] to-[#FEE2E2]/80 rounded-2xl border border-[#EF4444]/20 shadow-sm transition-all">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
            <AlertTriangle className="text-[#EF4444]" size={28} />
          </div>
          <div className="flex-1 min-w-0 pt-1.5">
            <p className="text-lg sm:text-xl font-semibold text-[#1E1E2E] mb-2.5 leading-tight">
              This action cannot be undone
            </p>
            <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        {/* Item Details */}
        {itemName && (
          <div className="p-6 sm:p-7 bg-gradient-to-br from-[#F8F9FB] to-[#F8F9FB]/60 rounded-2xl border border-[#E5E9F0] shadow-sm">
            <p className="text-sm sm:text-base text-[#64748B] mb-4 font-medium uppercase tracking-wider">
              You are about to delete:
            </p>
            <p className="text-lg sm:text-xl font-semibold text-[#1E1E2E] break-words leading-tight">
              {itemName}
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
};
