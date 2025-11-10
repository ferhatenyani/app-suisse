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

export interface Dashboard {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  avatar?: string;
  joinedAt: string;
  status: 'active' | 'pending' | 'inactive';
}
