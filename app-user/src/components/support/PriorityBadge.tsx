import React from 'react';
import { Badge } from '../ui/Badge';
import { AlertCircle, AlertTriangle, Info, Minus } from 'lucide-react';
import type { TicketPriority, BadgeVariant } from '../../types';

interface PriorityBadgeProps {
  priority: TicketPriority;
  size?: 'sm' | 'md';
}

const priorityConfig: Record<
  TicketPriority,
  { label: string; variant: BadgeVariant; icon: React.ReactNode }
> = {
  low: {
    label: 'Low',
    variant: 'neutral',
    icon: <Minus size={12} />,
  },
  medium: {
    label: 'Medium',
    variant: 'info',
    icon: <Info size={12} />,
  },
  high: {
    label: 'High',
    variant: 'warning',
    icon: <AlertTriangle size={12} />,
  },
  urgent: {
    label: 'Urgent',
    variant: 'danger',
    icon: <AlertCircle size={12} />,
  },
};

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority, size = 'md' }) => {
  const config = priorityConfig[priority];

  return (
    <Badge variant={config.variant} size={size} icon={config.icon}>
      {config.label}
    </Badge>
  );
};
