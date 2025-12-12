import React from 'react';
import { Badge } from '../ui/Badge';
import { AlertCircle, FileText } from 'lucide-react';
import type { TicketType, BadgeVariant } from '../../types';

interface TypeBadgeProps {
  type: TicketType;
  size?: 'sm' | 'md';
}

const typeConfig: Record<
  TicketType,
  { label: string; variant: BadgeVariant; icon: React.ReactNode }
> = {
  incident: {
    label: 'Incident',
    variant: 'danger',
    icon: <AlertCircle size={12} />,
  },
  request: {
    label: 'Request',
    variant: 'info',
    icon: <FileText size={12} />,
  },
};

export const TypeBadge: React.FC<TypeBadgeProps> = ({ type, size = 'md' }) => {
  const config = typeConfig[type];

  return (
    <Badge variant={config.variant} size={size} icon={config.icon}>
      {config.label}
    </Badge>
  );
};
