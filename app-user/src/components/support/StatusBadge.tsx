import React from 'react';
import { Badge } from '../ui/Badge';
import { Circle, Clock, Play, CheckCircle, XCircle } from 'lucide-react';
import type { TicketStatus, BadgeVariant } from '../../types';

interface StatusBadgeProps {
  status: TicketStatus;
  size?: 'sm' | 'md';
}

const statusConfig: Record<
  TicketStatus,
  { label: string; variant: BadgeVariant; icon: React.ReactNode }
> = {
  new: {
    label: 'New',
    variant: 'primary',
    icon: <Circle size={12} />,
  },
  open: {
    label: 'Open',
    variant: 'info',
    icon: <Clock size={12} />,
  },
  in_progress: {
    label: 'In Progress',
    variant: 'warning',
    icon: <Play size={12} />,
  },
  resolved: {
    label: 'Resolved',
    variant: 'success',
    icon: <CheckCircle size={12} />,
  },
  closed: {
    label: 'Closed',
    variant: 'neutral',
    icon: <XCircle size={12} />,
  },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} size={size} icon={config.icon}>
      {config.label}
    </Badge>
  );
};
