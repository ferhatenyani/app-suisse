import React, { useState } from 'react';
import { FileText, Image, FileJson, Download, Check } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  dashboardTitle: string;
  onExport: (format: 'pdf' | 'image' | 'json') => void;
}

type ExportFormat = 'pdf' | 'image' | 'json';

interface FormatOption {
  id: ExportFormat;
  label: string;
  description: string;
  icon: React.ReactNode;
  fileExtension: string;
  color: string;
  gradient: string;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  dashboardTitle,
  onExport,
}) => {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('pdf');
  const [isExporting, setIsExporting] = useState(false);

  const formatOptions: FormatOption[] = [
    {
      id: 'pdf',
      label: 'PDF Document',
      description: 'Portable document format, ideal for printing and sharing',
      icon: <FileText size={24} strokeWidth={2} />,
      fileExtension: '.pdf',
      color: 'text-red-600',
      gradient: 'from-red-500 to-red-600',
    },
    {
      id: 'image',
      label: 'PNG Image',
      description: 'High-quality image format, perfect for presentations',
      icon: <Image size={24} strokeWidth={2} />,
      fileExtension: '.png',
      color: 'text-blue-600',
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      id: 'json',
      label: 'JSON Data',
      description: 'Raw data format for further processing and analysis',
      icon: <FileJson size={24} strokeWidth={2} />,
      fileExtension: '.json',
      color: 'text-green-600',
      gradient: 'from-green-500 to-green-600',
    },
  ];

  const handleExport = async () => {
    setIsExporting(true);

    // Simulate export delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));

    onExport(selectedFormat);
    setIsExporting(false);

    // Close modal after successful export
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const selectedOption = formatOptions.find(opt => opt.id === selectedFormat);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Export Dashboard" size="lg">
      <div className="flex flex-col">
        {/* Content */}
        <div className="flex-1">
          <div className="space-y-4 sm:space-y-5">
            {/* Dashboard Title */}
            <div>
              <p className="text-xs sm:text-sm font-semibold text-[var(--color-text-secondary)] break-words">
                {dashboardTitle}
              </p>
            </div>

            {/* Export Format Selection */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-[var(--color-text)] mb-3">
                Select Export Format
              </label>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {formatOptions.map((option) => {
                  const isSelected = selectedFormat === option.id;
                  return (
                    <button
                      key={option.id}
                      onClick={() => setSelectedFormat(option.id)}
                      className={`
                        relative group p-2 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-200
                        ${isSelected
                          ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5 shadow-md scale-[1.02]'
                          : 'border-[var(--color-border)] bg-white hover:border-[var(--color-primary)]/40 hover:shadow-sm'
                        }
                      `}
                    >
                      {/* Selected Check Mark */}
                      {isSelected && (
                        <div className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 bg-[var(--color-primary)] rounded-full flex items-center justify-center shadow-lg animate-scaleIn">
                          <Check size={12} className="sm:hidden text-white" strokeWidth={3} />
                          <Check size={14} className="hidden sm:block text-white" strokeWidth={3} />
                        </div>
                      )}

                      {/* Icon */}
                      <div className={`
                        w-8 h-8 sm:w-12 sm:h-12 rounded-md sm:rounded-lg bg-gradient-to-br ${option.gradient}
                        flex items-center justify-center mb-1.5 sm:mb-3 mx-auto
                        ${isSelected ? 'shadow-md' : 'opacity-80 group-hover:opacity-100'}
                        transition-all duration-200
                      `}>
                        <div className="text-white scale-75 sm:scale-100">
                          {option.icon}
                        </div>
                      </div>

                      {/* Label */}
                      <div className="text-center">
                        <p className={`
                          text-[2.5vw] sm:text-sm font-bold mb-0.5 sm:mb-1 transition-colors leading-tight
                          ${isSelected ? 'text-[var(--color-primary)]' : 'text-[var(--color-title)] group-hover:text-[var(--color-primary)]'}
                        `}>
                          {option.label}
                        </p>
                        <p className="text-[1.8vw] sm:text-xs text-[var(--color-text-secondary)] leading-tight sm:leading-relaxed hidden sm:block">
                          {option.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Export Preview Info */}
            {selectedOption && (
              <div className="pt-3 sm:pt-4 border-t border-[var(--color-border)] animate-fadeIn">
                <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-gradient-to-br from-[var(--color-surface)] to-white rounded-lg border border-[var(--color-border)]">
                  <div className={`mt-0.5 flex-shrink-0 ${selectedOption.color}`}>
                    {selectedOption.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-semibold text-[var(--color-text)] mb-1">
                      Ready to Export
                    </p>
                    <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-2">
                      Your dashboard will be exported as <span className="font-semibold text-[var(--color-text)]">{selectedOption.label}</span>
                    </p>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="px-2 py-1 bg-white rounded border border-[var(--color-border)] font-mono text-[var(--color-text-secondary)]">
                        {dashboardTitle.toLowerCase().replace(/\s+/g, '-')}{selectedOption.fileExtension}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Additional Options (Future Enhancement) */}
            <div className="pt-2 pb-2">
              <details className="group">
                <summary className="text-xs sm:text-sm font-semibold text-[var(--color-text-secondary)] cursor-pointer hover:text-[var(--color-primary)] transition-colors list-none flex items-center gap-2">
                  <span className="transform group-open:rotate-90 transition-transform">▶</span>
                  Advanced Options
                </summary>
                <div className="mt-3 pl-6 space-y-3 text-xs text-[var(--color-text-secondary)] animate-fadeIn">
                  <label className="flex items-center gap-2 cursor-pointer hover:text-[var(--color-text)] transition-colors">
                    <input type="checkbox" className="rounded border-[var(--color-border)]" defaultChecked />
                    <span>Include dashboard metadata</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-[var(--color-text)] transition-colors">
                    <input type="checkbox" className="rounded border-[var(--color-border)]" defaultChecked />
                    <span>Optimize for file size</span>
                  </label>
                </div>
              </details>
            </div>
          </div>
        </div>

        {/* Fixed Footer */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 pt-4 border-t border-[var(--color-border)] flex-shrink-0">
          <Button
            variant="outline"
            size="md"
            onClick={onClose}
            className="text-sm w-full sm:w-auto"
            disabled={isExporting}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={handleExport}
            icon={isExporting ? (
              <Download size={16} strokeWidth={2} className="animate-bounce" />
            ) : (
              <Download size={16} strokeWidth={2} />
            )}
            className="text-sm w-full sm:w-auto"
            disabled={isExporting}
          >
            {isExporting ? 'Exporting...' : 'Export Dashboard'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
