// User & Authentication Types
export type UserRole = 'individual' | 'organization';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  companyName?: string;
  createdAt: string;
}

// Dashboard Types
export interface Dashboard {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
}

// Team Member Types
export type TeamMemberRole = 'admin' | 'editor' | 'viewer';
export type TeamMemberStatus = 'active' | 'pending' | 'inactive';

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: TeamMemberRole;
  avatar?: string;
  joinedAt: string;
  status: TeamMemberStatus;
}

// Activity Types
export type ActivityType = 'report' | 'share' | 'comment' | 'update';

export interface ActivityItem {
  id: number;
  title: string;
  time: string;
  user: string;
  type: ActivityType;
}

// Badge & UI Component Types
export type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'primary';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
  variant: BadgeVariant;
  size?: BadgeSize;
  children: React.ReactNode;
  icon?: React.ReactNode;
  dot?: boolean;
  className?: string;
}

// Button Types
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

// Utility Types
export type WithRequired<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type Nullable<T> = T | null | undefined;
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
