import type { Dashboard } from '../types';

export const dashboards: Dashboard[] = [
  {
    id: '1',
    title: 'Customer Experience Snapshot',
    description: 'Comprehensive overview of customer satisfaction metrics, Net Promoter Scores, and journey analytics across all touchpoints.',
    thumbnailUrl: '/dashboards/Customer experience snapshot.webp',
    createdAt: '2024-01-10T09:00:00Z',
    updatedAt: '2024-10-28T15:30:00Z',
    isPublic: true,
  },
  {
    id: '2',
    title: 'Helpdesk Performance Dashboard',
    description: 'Real-time monitoring of support tickets, resolution times, agent performance metrics, and customer satisfaction trends.',
    thumbnailUrl: '/dashboards/Helpdesk dashboard.webp',
    createdAt: '2024-02-15T10:30:00Z',
    updatedAt: '2024-10-29T11:20:00Z',
    isPublic: false,
  },
  {
    id: '3',
    title: 'Internal Email Communication Analysis',
    description: 'Deep insights into organizational communication patterns, email response times, and internal collaboration efficiency metrics.',
    thumbnailUrl: '/dashboards/Internal email communication analysis.webp',
    createdAt: '2024-03-05T14:00:00Z',
    updatedAt: '2024-10-30T09:45:00Z',
    isPublic: false,
  },
  {
    id: '4',
    title: 'Movie Industry Insights',
    description: 'Strategic analysis of box office performance, audience demographics, genre trends, and entertainment market dynamics.',
    thumbnailUrl: '/dashboards/Movie industry insights.webp',
    createdAt: '2024-04-20T08:15:00Z',
    updatedAt: '2024-10-27T16:00:00Z',
    isPublic: true,
  },
];
