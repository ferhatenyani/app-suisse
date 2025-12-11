import React, { useState, useRef, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Textarea } from '../ui/Textarea';
import { PriorityBadge } from './PriorityBadge';
import { StatusBadge } from './StatusBadge';
import {
  ArrowLeft,
  Send,
  Upload,
  Download,
  X,
  FileText,
  User,
  Headphones,
} from 'lucide-react';
import type { SupportTicket, TicketMessage } from '../../types';
import { format } from 'date-fns';

interface TicketThreadProps {
  ticket: SupportTicket;
  onBack: () => void;
  onSendMessage: (ticketId: string, message: string, attachments: File[]) => void;
  onCloseTicket?: (ticketId: string) => void;
  currentUserName: string;
}

const getCategoryLabel = (category: string, customCategory?: string): string => {
  if (category === 'other' && customCategory) {
    return customCategory;
  }

  const labels: Record<string, string> = {
    request_new_report: 'Request New Report',
    technical_issue: 'Technical Issue',
    feature_request: 'Feature Request',
    billing: 'Billing / Subscription',
    other: 'Other',
  };

  return labels[category] || category;
};

export const TicketThread: React.FC<TicketThreadProps> = ({
  ticket,
  onBack,
  onSendMessage,
  onCloseTicket,
  currentUserName,
}) => {
  const [newMessage, setNewMessage] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [ticket.messages]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      const maxSize = 10 * 1024 * 1024; // 10MB
      return file.size <= maxSize;
    });

    setAttachments(prev => [...prev, ...validFiles]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const handleSendMessage = () => {
    if (newMessage.trim() || attachments.length > 0) {
      onSendMessage(ticket.id, newMessage, attachments);
      setNewMessage('');
      setAttachments([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const canCloseTicket = ticket.status !== 'closed' && onCloseTicket;

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Header */}
      <Card>
        <div className="space-y-3 sm:space-y-4">
          {/* Back Button & Title */}
          <div className="flex items-start gap-2 sm:gap-3">
            <button
              onClick={onBack}
              className="p-1.5 sm:p-2 -ml-1.5 sm:-ml-2 rounded-lg hover:bg-[var(--color-panel)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
              aria-label="Back to ticket list"
            >
              <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
            </button>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 flex-wrap">
                <span className="text-[10px] sm:text-xs font-mono text-[var(--color-text-muted)] bg-[var(--color-panel)] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                  #{ticket.id}
                </span>
                <span className="text-[10px] sm:text-xs text-[var(--color-text-muted)]">
                  {getCategoryLabel(ticket.category, ticket.customCategory)}
                </span>
              </div>
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-[var(--color-text)] mb-2 sm:mb-3">
                {ticket.subject}
              </h1>
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <StatusBadge status={ticket.status} />
                <PriorityBadge priority={ticket.priority} />
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 sm:pt-4 border-t border-[var(--color-border)]">
            <div className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
              Created {format(new Date(ticket.createdAt), 'PPp')}
            </div>
            {canCloseTicket && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onCloseTicket(ticket.id)}
                className="w-full sm:w-auto"
              >
                Close Ticket
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Messages Thread */}
      <Card noPadding>
        <div className="p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4 max-h-[500px] sm:max-h-[600px] overflow-y-auto">
          {ticket.messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              isOwnMessage={message.sender === 'user'}
              currentUserName={currentUserName}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </Card>

      {/* Reply Section */}
      {ticket.status !== 'closed' && (
        <Card>
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-semibold text-[var(--color-text)]">Reply</h3>

            <Textarea
              placeholder="Type your message here..."
              rows={3}
              className="sm:rows-4"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            {/* Attachments */}
            {attachments.length > 0 && (
              <div className="space-y-2">
                {attachments.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-2 sm:gap-3 p-2 sm:p-3 bg-[var(--color-panel)] border border-[var(--color-border)] rounded-lg"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                      <FileText size={16} className="text-[var(--color-primary)] flex-shrink-0 sm:w-[18px] sm:h-[18px]" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm font-medium text-[var(--color-text)] truncate">
                          {file.name}
                        </p>
                        <p className="text-[10px] sm:text-xs text-[var(--color-text-muted)]">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeAttachment(index)}
                      className="p-1 sm:p-1.5 rounded-lg hover:bg-[var(--color-danger-light)] text-[var(--color-text-muted)] hover:text-[var(--color-danger)] transition-colors"
                      aria-label={`Remove ${file.name}`}
                    >
                      <X size={14} className="sm:w-4 sm:h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center sm:justify-between gap-2 sm:gap-3">
              <label className="cursor-pointer flex-1 sm:flex-initial">
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileUpload}
                  accept="image/*,.pdf,.doc,.docx,.txt,.log"
                />
                <Button
                  variant="secondary"
                  size="sm"
                  icon={<Upload size={14} className="sm:w-4 sm:h-4" />}
                  className="w-full sm:w-auto"
                >
                  <span className="text-xs sm:text-sm">Attach Files</span>
                </Button>
              </label>

              <Button
                variant="primary"
                onClick={handleSendMessage}
                disabled={!newMessage.trim() && attachments.length === 0}
                icon={<Send size={14} className="sm:w-4 sm:h-4" />}
                className="w-full sm:w-auto"
              >
                <span className="text-xs sm:text-sm">Send Message</span>
              </Button>
            </div>

            <p className="text-[10px] sm:text-xs text-[var(--color-text-muted)]">
              Press <kbd className="px-1 sm:px-1.5 py-0.5 bg-[var(--color-panel)] border border-[var(--color-border)] rounded text-[9px] sm:text-[10px]">Cmd</kbd> + <kbd className="px-1 sm:px-1.5 py-0.5 bg-[var(--color-panel)] border border-[var(--color-border)] rounded text-[9px] sm:text-[10px]">Enter</kbd> to send
            </p>
          </div>
        </Card>
      )}

      {ticket.status === 'closed' && (
        <Card className="text-center py-6 sm:py-8 bg-[var(--color-panel)]">
          <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] px-4">
            This ticket has been closed. Please create a new ticket if you need further assistance.
          </p>
        </Card>
      )}
    </div>
  );
};

// Message Bubble Component
interface MessageBubbleProps {
  message: TicketMessage;
  isOwnMessage: boolean;
  currentUserName: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isOwnMessage,
  currentUserName,
}) => {
  return (
    <div className={`flex gap-2 sm:gap-3 ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center ${
          isOwnMessage
            ? 'bg-[var(--color-primary-light)] text-[var(--color-primary)]'
            : 'bg-[var(--color-info-light)] text-[var(--color-info)]'
        }`}
      >
        {isOwnMessage ? <User size={14} className="sm:w-[18px] sm:h-[18px]" /> : <Headphones size={14} className="sm:w-[18px] sm:h-[18px]" />}
      </div>

      {/* Message Content */}
      <div className={`flex-1 min-w-0 ${isOwnMessage ? 'items-end' : 'items-start'} flex flex-col`}>
        <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1 flex-wrap">
          <span className="text-[10px] sm:text-xs font-semibold text-[var(--color-text)]">
            {isOwnMessage ? currentUserName : message.senderName}
          </span>
          <span className="text-[9px] sm:text-xs text-[var(--color-text-muted)]">
            {format(new Date(message.createdAt), 'PPp')}
          </span>
        </div>

        <div
          className={`p-2.5 sm:p-3 lg:p-4 rounded-lg max-w-full sm:max-w-[85%] ${
            isOwnMessage
              ? 'bg-[var(--color-primary)] text-white rounded-tr-none'
              : 'bg-[var(--color-panel)] text-[var(--color-text)] border border-[var(--color-border)] rounded-tl-none'
          }`}
        >
          <p className="text-xs sm:text-sm whitespace-pre-wrap break-words">{message.text}</p>

          {/* Attachments */}
          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-2 sm:mt-3 space-y-1.5 sm:space-y-2">
              {message.attachments.map((attachment) => (
                <a
                  key={attachment.id}
                  href={attachment.url}
                  download
                  className={`flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded transition-colors ${
                    isOwnMessage
                      ? 'bg-white/10 hover:bg-white/20'
                      : 'bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border)]'
                  }`}
                >
                  <FileText size={14} className="sm:w-4 sm:h-4" />
                  <span className="text-[10px] sm:text-xs flex-1 truncate">{attachment.name}</span>
                  <Download size={12} className="sm:w-3.5 sm:h-3.5" />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
