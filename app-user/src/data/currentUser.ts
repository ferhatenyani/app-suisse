import type { User } from '../types';

// Mock current user - change this to switch between individual and organization views
export const currentUser: User = {
  id: '1',
  name: 'John Anderson',
  email: 'john.anderson@example.com',
  role: 'organization', // Change to 'individual' to test individual user view
  avatar: 'https://ui-avatars.com/api/?name=John+Anderson&background=2563EB&color=fff',
  companyName: 'Acme Corporation',
  createdAt: '2024-01-15T10:00:00Z',
};

// Alternative individual user for testing
export const individualUser: User = {
  id: '2',
  name: 'Sarah Mitchell',
  email: 'sarah.mitchell@example.com',
  role: 'individual',
  avatar: 'https://ui-avatars.com/api/?name=Sarah+Mitchell&background=2563EB&color=fff',
  createdAt: '2024-03-20T14:30:00Z',
};
