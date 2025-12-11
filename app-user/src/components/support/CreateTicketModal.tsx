import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Select } from '../ui/Select';
import { Upload, X, FileText } from 'lucide-react';
import type { TicketCategory, TicketPriority } from '../../types';

interface CreateTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (ticketData: TicketFormData) => void;
}

export interface TicketFormData {
  category: TicketCategory;
  customCategory?: string;
  priority: TicketPriority;
  subject: string;
  description: string;
  attachments: File[];
}

const categoryOptions = [
  { value: 'request_new_report', label: 'Request New Report (Power BI Dashboard)' },
  { value: 'technical_issue', label: 'Technical Issue' },
  { value: 'feature_request', label: 'Feature Request' },
  { value: 'billing', label: 'Billing / Subscription' },
  { value: 'other', label: 'Other' },
];

const priorityOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' },
];

export const CreateTicketModal: React.FC<CreateTicketModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<TicketFormData>({
    category: 'technical_issue',
    priority: 'medium',
    subject: '',
    description: '',
    attachments: [],
  });

  const [errors, setErrors] = useState<Partial<Record<keyof TicketFormData, string>>>({});

  const handleInputChange = (field: keyof TicketFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      const maxSize = 10 * 1024 * 1024; // 10MB
      return file.size <= maxSize;
    });

    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...validFiles],
    }));
  };

  const removeAttachment = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof TicketFormData, string>> = {};

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (formData.category === 'other' && !formData.customCategory?.trim()) {
      newErrors.customCategory = 'Please specify the category';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
      // Reset form
      setFormData({
        category: 'technical_issue',
        priority: 'medium',
        subject: '',
        description: '',
        attachments: [],
      });
      setErrors({});
      onClose();
    }
  };

  const handleClose = () => {
    setFormData({
      category: 'technical_issue',
      priority: 'medium',
      subject: '',
      description: '',
      attachments: [],
    });
    setErrors({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create New Support Ticket"
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit Ticket
          </Button>
        </>
      }
    >
      <div className="space-y-5">
        {/* Category Selector */}
        <Select
          label="Category"
          options={categoryOptions}
          value={formData.category}
          onChange={(e) => handleInputChange('category', e.target.value as TicketCategory)}
          aria-label="Ticket category"
        />

        {/* Custom Category Input (shown when "Other" is selected) */}
        {formData.category === 'other' && (
          <Input
            label="Specify Category"
            placeholder="Please describe the category"
            value={formData.customCategory || ''}
            onChange={(e) => handleInputChange('customCategory', e.target.value)}
            error={errors.customCategory}
          />
        )}

        {/* Priority Selector */}
        <Select
          label="Priority"
          options={priorityOptions}
          value={formData.priority}
          onChange={(e) => handleInputChange('priority', e.target.value as TicketPriority)}
          aria-label="Ticket priority"
        />

        {/* Subject Input */}
        <Input
          label="Subject"
          placeholder="Brief description of your issue"
          value={formData.subject}
          onChange={(e) => handleInputChange('subject', e.target.value)}
          error={errors.subject}
        />

        {/* Description Textarea */}
        <Textarea
          label="Description"
          placeholder="Provide detailed information about your request or issue..."
          rows={6}
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          error={errors.description}
        />

        {/* File Upload */}
        <div>
          <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">
            Attachments (Optional)
          </label>
          <div className="space-y-3">
            <label className="cursor-pointer">
              <input
                type="file"
                multiple
                className="hidden"
                onChange={handleFileUpload}
                accept="image/*,.pdf,.doc,.docx,.txt,.log"
              />
              <div className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-[var(--color-border)] rounded-lg hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-light)] transition-colors">
                <Upload size={18} className="text-[var(--color-text-muted)]" />
                <span className="text-sm text-[var(--color-text-secondary)]">
                  Click to upload files (Max 10MB each)
                </span>
              </div>
            </label>

            {/* Uploaded Files List */}
            {formData.attachments.length > 0 && (
              <div className="space-y-2">
                {formData.attachments.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-3 p-3 bg-[var(--color-panel)] border border-[var(--color-border)] rounded-lg"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <FileText size={18} className="text-[var(--color-primary)] flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[var(--color-text)] truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-[var(--color-text-muted)]">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeAttachment(index)}
                      className="p-1.5 rounded-lg hover:bg-[var(--color-danger-light)] text-[var(--color-text-muted)] hover:text-[var(--color-danger)] transition-colors"
                      aria-label={`Remove ${file.name}`}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <p className="mt-1.5 text-xs text-[var(--color-text-muted)] font-medium">
            Supported formats: Images, PDF, DOC, TXT, LOG
          </p>
        </div>
      </div>
    </Modal>
  );
};
