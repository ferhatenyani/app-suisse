// Mock data for Admin Dashboard

export interface PendingAccount {
  id: string;
  companyName: string;
  email: string;
  contactPerson: string;
  plan: 'Starter' | 'Professional' | 'Enterprise';
  requestedDate: string;
  status: 'pending' | 'reviewing' | 'approved' | 'rejected';
  workspaceId?: string | null;
  assignedDashboard?: string | null;
  selectedWorkspacePlan?: string | null;
}

export interface Client {
  id: string;
  name: string;
  type: 'Individual' | 'Organization';
  email: string;
  plan: 'Starter' | 'Professional' | 'Enterprise';
  status: 'active' | 'inactive' | 'suspended';
  joinedDate: string;
  dashboardCount: number;
  userCount: number;
  lastActive: string;
  workspaceId?: string;
  assignedDashboard?: string;
  paymentStatus?: 'paid' | 'unpaid';
}

export interface DataSource {
  id: string;
  client: string;
  type: 'Database' | 'API' | 'File' | 'Cloud';
  status: 'connected' | 'disconnected' | 'error';
  usedBy: number;
  lastSync: string;
  provider?: string;
}

export interface PublishedDashboard {
  id: string;
  title: string;
  owner: string;
  category: string;
  views: number;
  publishedDate: string;
  status: 'published' | 'draft' | 'archived';
  isPublic: boolean;
}

export interface Subscription {
  id: string;
  planName: string;
  price: number;
  billing: 'monthly' | 'yearly';
  features: string[];
  activeUsers: number;
  maxUsers: number;
  maxDashboards: number;
  storage: string;
}

export interface PlatformAnalytics {
  totalUsers: number;
  activeUsers: number;
  totalDashboards: number;
  totalViews: number;
  revenue: number;
  growthRate: number;
}

// Mock Pending Accounts
export const pendingAccounts: PendingAccount[] = [
  {
    id: '1',
    companyName: 'TechCorp Solutions',
    email: 'admin@techcorp.com',
    contactPerson: 'John Smith',
    plan: 'Enterprise',
    requestedDate: '2025-10-28',
    status: 'pending',
  },
  {
    id: '2',
    companyName: 'DataViz Analytics',
    email: 'contact@dataviz.io',
    contactPerson: 'Sarah Johnson',
    plan: 'Professional',
    requestedDate: '2025-10-29',
    status: 'reviewing',
  },
  {
    id: '3',
    companyName: 'Global Insights Inc',
    email: 'info@globalinsights.com',
    contactPerson: 'Michael Chen',
    plan: 'Enterprise',
    requestedDate: '2025-10-30',
    status: 'pending',
  },
  {
    id: '4',
    companyName: 'SmartMetrics',
    email: 'team@smartmetrics.co',
    contactPerson: 'Emma Williams',
    plan: 'Starter',
    requestedDate: '2025-10-31',
    status: 'pending',
  },
  {
    id: '5',
    companyName: 'FinanceFlow',
    email: 'accounts@financeflow.com',
    contactPerson: 'David Martinez',
    plan: 'Professional',
    requestedDate: '2025-11-01',
    status: 'reviewing',
  },
];

// Mock Clients (mutable for adding approved accounts)
export let clients: Client[] = [
  {
    id: '1',
    name: 'Acme Corporation',
    type: 'Organization',
    email: 'admin@acme.com',
    plan: 'Enterprise',
    status: 'active',
    joinedDate: '2025-01-15',
    dashboardCount: 24,
    userCount: 45,
    lastActive: '2025-11-01',
    workspaceId: 'ws-acme-001',
    assignedDashboard: 'Sales Performance Dashboard, Marketing Analytics, Financial Overview',
    paymentStatus: 'paid',
  },
  {
    id: '2',
    name: 'StartupXYZ',
    type: 'Organization',
    email: 'team@startupxyz.io',
    plan: 'Professional',
    status: 'active',
    joinedDate: '2025-03-20',
    dashboardCount: 12,
    userCount: 8,
    lastActive: '2025-10-31',
    workspaceId: 'ws-startup-002',
    assignedDashboard: 'Customer Insights, Operations Metrics',
    paymentStatus: 'paid',
  },
  {
    id: '3',
    name: 'John Doe',
    type: 'Individual',
    email: 'john.doe@email.com',
    plan: 'Starter',
    status: 'active',
    joinedDate: '2025-05-10',
    dashboardCount: 3,
    userCount: 1,
    lastActive: '2025-10-30',
    assignedDashboard: 'HR Analytics',
    paymentStatus: 'paid',
  },
  {
    id: '4',
    name: 'Enterprise Solutions Ltd',
    type: 'Organization',
    email: 'contact@entsol.com',
    plan: 'Enterprise',
    status: 'active',
    joinedDate: '2025-02-01',
    dashboardCount: 38,
    userCount: 120,
    lastActive: '2025-11-01',
  },
  {
    id: '5',
    name: 'Digital Agency Co',
    type: 'Organization',
    email: 'info@digitalagency.com',
    plan: 'Professional',
    status: 'inactive',
    joinedDate: '2025-04-15',
    dashboardCount: 8,
    userCount: 5,
    lastActive: '2025-09-20',
  },
  {
    id: '6',
    name: 'Jane Smith',
    type: 'Individual',
    email: 'jane.smith@email.com',
    plan: 'Starter',
    status: 'active',
    joinedDate: '2025-06-22',
    dashboardCount: 5,
    userCount: 1,
    lastActive: '2025-10-29',
  },
  {
    id: '7',
    name: 'MegaCorp Industries',
    type: 'Organization',
    email: 'admin@megacorp.com',
    plan: 'Enterprise',
    status: 'suspended',
    joinedDate: '2025-01-08',
    dashboardCount: 15,
    userCount: 25,
    lastActive: '2025-08-15',
  },
];

// Mock Data Sources
export const dataSources: DataSource[] = [
  {
    id: '1',
    client: 'john doe',
    type: 'Database',
    status: 'connected',
    usedBy: 45,
    lastSync: '2025-11-01 14:30',
    provider: 'PostgreSQL 14',
  },
  {
    id: '2',
    client: 'exon lied',
    type: 'Database',
    status: 'connected',
    usedBy: 28,
    lastSync: '2025-11-01 13:45',
    provider: 'MongoDB Atlas',
  },
  {
    id: '3',
    client: 'ANC CORP',
    type: 'API',
    status: 'connected',
    usedBy: 67,
    lastSync: '2025-11-01 15:00',
  },
  {
    id: '4',
    client: 'FER INC',
    type: 'Cloud',
    status: 'connected',
    usedBy: 34,
    lastSync: '2025-11-01 12:20',
    provider: 'Amazon S3',
  },
  {
    id: '5',
    client: 'ouss ben',
    type: 'File',
    status: 'disconnected',
    usedBy: 12,
    lastSync: '2025-10-28 09:15',
  },
  {
    id: '6',
    client: 'sonatrad',
    type: 'Database',
    status: 'error',
    usedBy: 23,
    lastSync: '2025-10-31 18:30',
    provider: 'MySQL 8.0',
  },
  {
    id: '7',
    client: 'TRG INC',
    type: 'API',
    status: 'connected',
    usedBy: 19,
    lastSync: '2025-11-01 14:50',
  },
];

// Mock Published Dashboards
export const publishedDashboards: PublishedDashboard[] = [
  {
    id: '1',
    title: 'Q4 Sales Performance',
    owner: 'Acme Corporation',
    category: 'Sales',
    views: 1247,
    publishedDate: '2025-10-15',
    status: 'published',
    isPublic: true,
  },
  {
    id: '2',
    title: 'Marketing Analytics 2025',
    owner: 'StartupXYZ',
    category: 'Marketing',
    views: 823,
    publishedDate: '2025-10-20',
    status: 'published',
    isPublic: true,
  },
  {
    id: '3',
    title: 'Financial Overview',
    owner: 'Enterprise Solutions Ltd',
    category: 'Finance',
    views: 2156,
    publishedDate: '2025-09-10',
    status: 'published',
    isPublic: false,
  },
  {
    id: '4',
    title: 'Customer Insights Dashboard',
    owner: 'Digital Agency Co',
    category: 'Analytics',
    views: 567,
    publishedDate: '2025-10-25',
    status: 'draft',
    isPublic: false,
  },
  {
    id: '5',
    title: 'Operations Metrics',
    owner: 'MegaCorp Industries',
    category: 'Operations',
    views: 934,
    publishedDate: '2025-10-01',
    status: 'published',
    isPublic: true,
  },
  {
    id: '6',
    title: 'Product Performance Tracker',
    owner: 'Acme Corporation',
    category: 'Product',
    views: 1423,
    publishedDate: '2025-10-18',
    status: 'published',
    isPublic: true,
  },
];

// Mock Subscriptions
export const subscriptions: Subscription[] = [
  {
    id: '1',
    planName: 'Starter',
    price: 29,
    billing: 'monthly',
    features: ['Up to 5 dashboards', '1 user', '10GB storage', 'Email support', 'Basic analytics'],
    activeUsers: 47,
    maxUsers: 1,
    maxDashboards: 5,
    storage: '10GB',
  },
  {
    id: '2',
    planName: 'Professional',
    price: 99,
    billing: 'monthly',
    features: [
      'Up to 25 dashboards',
      'Up to 10 users',
      '100GB storage',
      'Priority support',
      'Advanced analytics',
      'Custom branding',
    ],
    activeUsers: 23,
    maxUsers: 10,
    maxDashboards: 25,
    storage: '100GB',
  },
  {
    id: '3',
    planName: 'Enterprise',
    price: 299,
    billing: 'monthly',
    features: [
      'Unlimited dashboards',
      'Unlimited users',
      '1TB storage',
      '24/7 dedicated support',
      'Advanced analytics',
      'Custom branding',
      'API access',
      'SSO integration',
      'Custom data sources',
    ],
    activeUsers: 15,
    maxUsers: -1,
    maxDashboards: -1,
    storage: '1TB',
  },
];

// Mock Platform Analytics
export const platformAnalytics: PlatformAnalytics = {
  totalUsers: 287,
  activeUsers: 234,
  totalDashboards: 456,
  totalViews: 12847,
  revenue: 18650,
  growthRate: 24.5,
};

// Helper function to add approved client
export const addApprovedClient = (pendingAccount: PendingAccount, onboardingData: { workspacePlan: string; workspaceId: string; assignedDashboards: string[] }) => {
  const newClient: Client = {
    id: `client-${Date.now()}`,
    name: pendingAccount.companyName,
    type: 'Organization', // Default to Organization, can be updated
    email: pendingAccount.email,
    plan: pendingAccount.plan,
    status: 'inactive', // Start as inactive until payment is confirmed
    joinedDate: new Date().toISOString().split('T')[0],
    dashboardCount: onboardingData.assignedDashboards.length,
    userCount: 1,
    lastActive: new Date().toISOString().split('T')[0],
    workspaceId: onboardingData.workspaceId,
    assignedDashboard: onboardingData.assignedDashboards.join(','), // Store multiple dashboards as comma-separated
    paymentStatus: 'unpaid',
  };

  clients.push(newClient);
  return newClient;
};
