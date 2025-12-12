import React from 'react';
import { Card } from '../ui/Card';
import { TypeBadge } from './TypeBadge';
import { StatusBadge } from './StatusBadge';
import { Clock, MessageSquare } from 'lucide-react';
import type { SupportTicket } from '../../types';
import { formatDistanceToNow } from 'date-fns';

interface TicketListProps {
  tickets: SupportTicket[];
  onTicketClick: (ticketId: string) => void;
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

export const TicketList: React.FC<TicketListProps> = ({ tickets, onTicketClick }) => {
  if (tickets.length === 0) {
    return (
      <Card className="text-center py-12">
        <MessageSquare
          size={48}
          className="mx-auto mb-4 text-[var(--color-text-muted)]"
        />
        <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">
          No support tickets yet
        </h3>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Create your first ticket to get help from our support team
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {tickets.map((ticket) => {
        const lastMessage = ticket.messages[ticket.messages.length - 1];
        const messageCount = ticket.messages.length;
        const timeAgo = formatDistanceToNow(new Date(ticket.updatedAt), { addSuffix: true });

        return (
          <Card
            key={ticket.id}
            hover
            noPadding
            onClick={() => onTicketClick(ticket.id)}
            className="cursor-pointer"
            aria-label={`Open ticket ${ticket.id}: ${ticket.subject}`}
          >
            <div className="p-4 sm:p-5 md:p-6">
              {/* Header Section */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-xs font-mono text-[var(--color-text-muted)] bg-[var(--color-panel)] px-2 py-1 rounded">
                      #{ticket.id}
                    </span>
                    <span className="text-xs text-[var(--color-text-muted)]">
                      {getCategoryLabel(ticket.category, ticket.customCategory)}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-[var(--color-text)] mb-1 line-clamp-1">
                    {ticket.subject}
                  </h3>
                </div>

                {/* Badges */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <StatusBadge status={ticket.status} size="sm" />
                  <TypeBadge type={ticket.type} size="sm" />
                </div>
              </div>

              {/* Last Message Preview */}
              {lastMessage && (
                <div className="mb-3 p-3 bg-[var(--color-panel)] rounded-lg border border-[var(--color-border)]">
                  <p className="text-xs text-[var(--color-text-muted)] mb-1">
                    {lastMessage.sender === 'admin' ? 'Support Team' : 'You'}
                  </p>
                  <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2">
                    {lastMessage.text}
                  </p>
                </div>
              )}

              {/* Footer Section */}
              <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <MessageSquare size={14} />
                    <span>
                      {messageCount} {messageCount === 1 ? 'message' : 'messages'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} />
                    <span>Updated {timeAgo}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
