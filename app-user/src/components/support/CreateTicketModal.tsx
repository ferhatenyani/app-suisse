import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Select } from '../ui/Select';
import { Upload, X, FileText } from 'lucide-react';
import type { TicketCategory, TicketType } from '../../types';

interface CreateTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (ticketData: TicketFormData) => void;
  initialCategory?: string;
  initialType?: string;
}

export interface TicketFormData {
  type: TicketType;
  category: TicketCategory;
  customCategory?: string;
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

const ticketTypeOptions: { value: TicketType; label: string }[] = [
  { value: 'incident', label: 'Incident' },
  { value: 'request', label: 'Request' },
];

export const CreateTicketModal: React.FC<CreateTicketModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialCategory,
  initialType,
}) => {
  const [formData, setFormData] = useState<TicketFormData>({
    type: (initialType as TicketType) || 'incident',
    category: (initialCategory as TicketCategory) || 'technical_issue',
    subject: '',
    description: '',
    attachments: [],
  });

  const [errors, setErrors] = useState<Partial<Record<keyof TicketFormData, string>>>({});

  // Update type and category when initial props change
  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        ...(initialType && { type: initialType as TicketType }),
        ...(initialCategory && { category: initialCategory as TicketCategory }),
      }));
    }
  }, [initialCategory, initialType, isOpen]);

  const handleInputChange = (field: keyof TicketFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleTypeChange = (type: TicketType) => {
    setFormData(prev => ({
      ...prev,
      type,
      // When switching to incident, force category to technical_issue
      category: type === 'incident' ? 'technical_issue' : prev.category === 'technical_issue' ? 'request_new_report' : prev.category,
    }));
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
        type: 'incident',
        category: 'technical_issue',
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
      type: 'incident',
      category: 'technical_issue',
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
        {/* Ticket Type Toggle */}
        <div>
          <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">
            Type
          </label>
          <div className="flex gap-3">
            {ticketTypeOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleTypeChange(option.value)}
                className={`
                  flex-1 px-4 py-3 rounded-lg font-medium text-sm
                  transition-all duration-200 ease-in-out
                  border-2
                  ${
                    formData.type === option.value
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white shadow-md scale-[1.02]'
                      : 'border-[var(--color-border)] bg-[var(--color-panel)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-light)] hover:scale-[1.01]'
                  }
                  active:scale-[0.98]
                `}
                aria-pressed={formData.type === option.value}
                aria-label={`Select ${option.label}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Selector */}
        <Select
          label="Category"
          options={categoryOptions.map(opt => ({
            ...opt,
            disabled: formData.type === 'request' && opt.value === 'technical_issue',
          }))}
          value={formData.category}
          onChange={(e) => handleInputChange('category', e.target.value as TicketCategory)}
          disabled={formData.type === 'incident'}
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
