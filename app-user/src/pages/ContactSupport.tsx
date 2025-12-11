import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/Button';
import { CreateTicketModal } from '../components/support/CreateTicketModal';
import type { TicketFormData } from '../components/support/CreateTicketModal';
import { TicketList } from '../components/support/TicketList';
import { TicketThread } from '../components/support/TicketThread';
import { Plus, LifeBuoy } from 'lucide-react';
import type { SupportTicket, TicketMessage } from '../types';
import { currentUser } from '../data/currentUser';

// Mock data - will be replaced with API calls
const mockTickets: SupportTicket[] = [
  {
    id: 'TKT-001',
    category: 'request_new_report',
    priority: 'high',
    status: 'in_progress',
    subject: 'Need Sales Performance Dashboard',
    messages: [
      {
        id: 'msg-1',
        sender: 'user',
        senderName: currentUser.name,
        text: 'Hi, I need a new Power BI dashboard for tracking sales performance across different regions. It should include metrics like revenue, conversion rates, and top performing products.',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'msg-2',
        sender: 'admin',
        senderName: 'Support Team',
        text: "Thank you for reaching out! We've received your request for a Sales Performance Dashboard. Our team is reviewing the requirements and will get back to you within 24 hours with a timeline and any clarifying questions.",
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'TKT-002',
    category: 'technical_issue',
    priority: 'urgent',
    status: 'open',
    subject: 'Dashboard Not Loading - Error 500',
    messages: [
      {
        id: 'msg-3',
        sender: 'user',
        senderName: currentUser.name,
        text: 'The Marketing Analytics dashboard is showing an Error 500 when I try to load it. This is blocking my team from accessing critical data.',
        attachments: [
          {
            id: 'att-1',
            name: 'error-screenshot.png',
            size: 245678,
            type: 'image/png',
            url: '#',
          },
        ],
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      },
    ],
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'TKT-003',
    category: 'feature_request',
    priority: 'medium',
    status: 'resolved',
    subject: 'Add Export to Excel Feature',
    messages: [
      {
        id: 'msg-4',
        sender: 'user',
        senderName: currentUser.name,
        text: 'It would be great to have an option to export dashboard data directly to Excel format for offline analysis.',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'msg-5',
        sender: 'admin',
        senderName: 'Support Team',
        text: "Great suggestion! We've added this to our feature roadmap. The Excel export functionality is now available in the dashboard viewer. You can access it via the export button in the top-right corner.",
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'msg-6',
        sender: 'user',
        senderName: currentUser.name,
        text: 'Perfect! Just tested it and it works great. Thanks for the quick implementation!',
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const ContactSupport: React.FC = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>(mockTickets);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

  const selectedTicket = tickets.find(t => t.id === selectedTicketId);

  useEffect(() => {
    window.scrollTo(0, 0);
    const mainElement = document.querySelector('main');
    if (mainElement) mainElement.scrollTo(0, 0);
  }, []);

  // Generate a unique ticket ID
  const generateTicketId = (): string => {
    const maxId = tickets.reduce((max, ticket) => {
      const num = parseInt(ticket.id.split('-')[1]);
      return num > max ? num : max;
    }, 0);
    return `TKT-${String(maxId + 1).padStart(3, '0')}`;
  };

  const handleCreateTicket = (formData: TicketFormData) => {
    const newTicket: SupportTicket = {
      id: generateTicketId(),
      category: formData.category,
      customCategory: formData.customCategory,
      priority: formData.priority,
      status: 'new',
      subject: formData.subject,
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: 'user',
          senderName: currentUser.name,
          text: formData.description,
          attachments: formData.attachments.map((file, index) => ({
            id: `att-${Date.now()}-${index}`,
            name: file.name,
            size: file.size,
            type: file.type,
            url: URL.createObjectURL(file),
          })),
          createdAt: new Date().toISOString(),
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTickets(prev => [newTicket, ...prev]);
    setIsCreateModalOpen(false);

    // Auto-open the newly created ticket
    setTimeout(() => {
      setSelectedTicketId(newTicket.id);
    }, 300);
  };

  const handleSendMessage = (ticketId: string, messageText: string, attachments: File[]) => {
    setTickets(prev =>
      prev.map(ticket => {
        if (ticket.id === ticketId) {
          const newMessage: TicketMessage = {
            id: `msg-${Date.now()}`,
            sender: 'user',
            senderName: currentUser.name,
            text: messageText,
            attachments: attachments.map((file, index) => ({
              id: `att-${Date.now()}-${index}`,
              name: file.name,
              size: file.size,
              type: file.type,
              url: URL.createObjectURL(file),
            })),
            createdAt: new Date().toISOString(),
          };

          return {
            ...ticket,
            messages: [...ticket.messages, newMessage],
            updatedAt: new Date().toISOString(),
            status: ticket.status === 'new' ? 'open' : ticket.status,
          };
        }
        return ticket;
      })
    );
  };

  const handleCloseTicket = (ticketId: string) => {
    setTickets(prev =>
      prev.map(ticket =>
        ticket.id === ticketId
          ? { ...ticket, status: 'closed', updatedAt: new Date().toISOString() }
          : ticket
      )
    );
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
            <div className="p-1.5 sm:p-2 bg-[var(--color-primary-light)] rounded-lg">
              <LifeBuoy size={20} className="text-[var(--color-primary)] sm:w-6 sm:h-6" />
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[var(--color-title)]">
              Support Center
            </h1>
          </div>
          <p className="text-xs sm:text-sm lg:text-base text-[var(--color-text-secondary)] pl-8 sm:pl-0">
            Get help from our support team or track your existing tickets
          </p>
        </div>

        {!selectedTicket && (
          <Button
            variant="primary"
            icon={<Plus size={16} className="sm:w-[18px] sm:h-[18px]" />}
            onClick={() => setIsCreateModalOpen(true)}
            className="w-full sm:w-auto"
          >
            New Ticket
          </Button>
        )}
      </div>

      {/* Content */}
      {selectedTicket ? (
        <TicketThread
          ticket={selectedTicket}
          onBack={() => setSelectedTicketId(null)}
          onSendMessage={handleSendMessage}
          onCloseTicket={handleCloseTicket}
          currentUserName={currentUser.name}
        />
      ) : (
        <>
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-3 sm:p-4">
              <p className="text-[10px] sm:text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-1">
                Open Tickets
              </p>
              <p className="text-xl sm:text-2xl font-bold text-[var(--color-title)]">
                {tickets.filter(t => t.status !== 'closed' && t.status !== 'resolved').length}
              </p>
            </div>
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-3 sm:p-4">
              <p className="text-[10px] sm:text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-1">
                In Progress
              </p>
              <p className="text-xl sm:text-2xl font-bold text-[var(--color-title)]">
                {tickets.filter(t => t.status === 'in_progress').length}
              </p>
            </div>
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-3 sm:p-4">
              <p className="text-[10px] sm:text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-1">
                Resolved
              </p>
              <p className="text-xl sm:text-2xl font-bold text-[var(--color-title)]">
                {tickets.filter(t => t.status === 'resolved').length}
              </p>
            </div>
          </div>

          {/* Ticket List */}
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-[var(--color-text)] mb-3 sm:mb-4">
              Your Tickets
            </h2>
            <TicketList tickets={tickets} onTicketClick={setSelectedTicketId} />
          </div>
        </>
      )}

      {/* Create Ticket Modal */}
      <CreateTicketModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateTicket}
      />
    </div>
  );
};
