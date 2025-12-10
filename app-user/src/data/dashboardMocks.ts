import { DollarSign, Users, ShoppingCart, TrendingUp, BarChart3, PieChart, Activity, Target } from 'lucide-react';
import React from 'react';

interface MockMetric {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: number;
}

interface DashboardMock {
  metrics: MockMetric[];
  imageSrc?: string;
}

export const mockDashboardData: Record<string, DashboardMock> = {
  'q4-financial': {
    metrics: [
      {
        label: 'Total Revenue',
        value: '$2.4M',
        icon: React.createElement(DollarSign, { size: 18, className: 'text-[var(--color-success)]' }),
        trend: 12.5
      },
      {
        label: 'Active Customers',
        value: '1,234',
        icon: React.createElement(Users, { size: 18, className: 'text-[var(--color-info)]' }),
        trend: 8.3
      },
      {
        label: 'Conversion Rate',
        value: '18.2%',
        icon: React.createElement(Target, { size: 18, className: 'text-[var(--color-primary)]' }),
        trend: 3.1
      },
      {
        label: 'Avg. Order Value',
        value: '$487',
        icon: React.createElement(ShoppingCart, { size: 18, className: 'text-[var(--color-accent)]' }),
        trend: -2.4
      },
    ],
  },
  'sales-dashboard': {
    metrics: [
      {
        label: 'Monthly Sales',
        value: '$845K',
        icon: React.createElement(TrendingUp, { size: 18, className: 'text-[var(--color-success)]' }),
        trend: 15.2
      },
      {
        label: 'New Leads',
        value: '342',
        icon: React.createElement(Users, { size: 18, className: 'text-[var(--color-info)]' }),
        trend: 22.6
      },
      {
        label: 'Deals Closed',
        value: '87',
        icon: React.createElement(Target, { size: 18, className: 'text-[var(--color-primary)]' }),
        trend: 11.4
      },
      {
        label: 'Pipeline Value',
        value: '$3.2M',
        icon: React.createElement(BarChart3, { size: 18, className: 'text-[var(--color-accent)]' }),
        trend: 8.7
      },
    ],
  },
  'marketing-report': {
    metrics: [
      {
        label: 'Campaign ROI',
        value: '284%',
        icon: React.createElement(TrendingUp, { size: 18, className: 'text-[var(--color-success)]' }),
        trend: 34.2
      },
      {
        label: 'Total Impressions',
        value: '2.8M',
        icon: React.createElement(Activity, { size: 18, className: 'text-[var(--color-info)]' }),
        trend: 18.5
      },
      {
        label: 'Click-Through Rate',
        value: '4.2%',
        icon: React.createElement(Target, { size: 18, className: 'text-[var(--color-primary)]' }),
        trend: 2.1
      },
      {
        label: 'Cost Per Lead',
        value: '$42',
        icon: React.createElement(DollarSign, { size: 18, className: 'text-[var(--color-accent)]' }),
        trend: -6.3
      },
    ],
  },
  'customer-insights': {
    metrics: [
      {
        label: 'Customer Lifetime Value',
        value: '$1,840',
        icon: React.createElement(DollarSign, { size: 18, className: 'text-[var(--color-success)]' }),
        trend: 9.2
      },
      {
        label: 'Churn Rate',
        value: '2.1%',
        icon: React.createElement(Users, { size: 18, className: 'text-[var(--color-danger)]' }),
        trend: -1.4
      },
      {
        label: 'NPS Score',
        value: '72',
        icon: React.createElement(Target, { size: 18, className: 'text-[var(--color-success)]' }),
        trend: 5.8
      },
      {
        label: 'Support Tickets',
        value: '156',
        icon: React.createElement(Activity, { size: 18, className: 'text-[var(--color-info)]' }),
        trend: -12.3
      },
    ],
  },
  'product-analytics': {
    metrics: [
      {
        label: 'Active Users',
        value: '4,582',
        icon: React.createElement(Users, { size: 18, className: 'text-[var(--color-info)]' }),
        trend: 14.7
      },
      {
        label: 'Session Duration',
        value: '8m 42s',
        icon: React.createElement(Activity, { size: 18, className: 'text-[var(--color-primary)]' }),
        trend: 6.2
      },
      {
        label: 'Feature Adoption',
        value: '67%',
        icon: React.createElement(PieChart, { size: 18, className: 'text-[var(--color-success)]' }),
        trend: 11.3
      },
      {
        label: 'Engagement Rate',
        value: '42%',
        icon: React.createElement(Target, { size: 18, className: 'text-[var(--color-accent)]' }),
        trend: 4.9
      },
    ],
  },
  'operations-dashboard': {
    metrics: [
      {
        label: 'Orders Processed',
        value: '2,847',
        icon: React.createElement(ShoppingCart, { size: 18, className: 'text-[var(--color-info)]' }),
        trend: 18.4
      },
      {
        label: 'Fulfillment Rate',
        value: '96.2%',
        icon: React.createElement(Target, { size: 18, className: 'text-[var(--color-success)]' }),
        trend: 2.8
      },
      {
        label: 'Avg. Processing Time',
        value: '2.4hrs',
        icon: React.createElement(Activity, { size: 18, className: 'text-[var(--color-primary)]' }),
        trend: -8.6
      },
      {
        label: 'Inventory Turnover',
        value: '6.8x',
        icon: React.createElement(BarChart3, { size: 18, className: 'text-[var(--color-accent)]' }),
        trend: 12.1
      },
    ],
  },
  // Default fallback for any dashboard without specific mock data
  default: {
    metrics: [
      {
        label: 'Total Records',
        value: '1,523',
        icon: React.createElement(BarChart3, { size: 18, className: 'text-[var(--color-info)]' }),
        trend: 7.2
      },
      {
        label: 'Growth Rate',
        value: '12.5%',
        icon: React.createElement(TrendingUp, { size: 18, className: 'text-[var(--color-success)]' }),
        trend: 3.4
      },
      {
        label: 'Active Items',
        value: '892',
        icon: React.createElement(Activity, { size: 18, className: 'text-[var(--color-primary)]' }),
        trend: 5.8
      },
      {
        label: 'Performance Score',
        value: '8.4/10',
        icon: React.createElement(Target, { size: 18, className: 'text-[var(--color-accent)]' }),
        trend: 1.9
      },
    ],
  },
};

// Helper function to get mock data for a dashboard
export function getMockDataForDashboard(dashboardId: string): DashboardMock {
  return mockDashboardData[dashboardId] || mockDashboardData.default;
}
