import React, { useState } from 'react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Table } from '../components/common/Table';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { Search, Eye, Globe, Archive } from 'lucide-react';
import { publishedDashboards, PublishedDashboard } from '../data/mockData';

export const Publishing: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDashboards = publishedDashboards.filter(
    (dashboard) =>
      dashboard.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dashboard.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      key: 'title',
      header: 'Dashboard',
      render: (dashboard: PublishedDashboard) => (
        <div>
          <p className="font-semibold text-[var(--color-title)]">{dashboard.title}</p>
          <p className="text-xs text-[var(--color-text-muted)]">{dashboard.category}</p>
        </div>
      ),
    },
    {
      key: 'owner',
      header: 'Owner',
    },
    {
      key: 'status',
      header: 'Status',
      render: (dashboard: PublishedDashboard) => {
        const variants = {
          published: 'success' as const,
          draft: 'warning' as const,
          archived: 'default' as const,
        };
        return <Badge variant={variants[dashboard.status]}>{dashboard.status}</Badge>;
      },
    },
    {
      key: 'isPublic',
      header: 'Visibility',
      render: (dashboard: PublishedDashboard) => (
        <div className="flex items-center gap-2">
          {dashboard.isPublic ? (
            <>
              <Globe size={14} className="text-[var(--color-success)]" />
              <span className="text-sm font-medium text-[var(--color-success)]">Public</span>
            </>
          ) : (
            <>
              <Eye size={14} className="text-[var(--color-text-muted)]" />
              <span className="text-sm font-medium text-[var(--color-text-muted)]">Private</span>
            </>
          )}
        </div>
      ),
    },
    {
      key: 'views',
      header: 'Views',
      render: (dashboard: PublishedDashboard) => (
        <span className="font-semibold">{dashboard.views.toLocaleString()}</span>
      ),
    },
    {
      key: 'publishedDate',
      header: 'Published Date',
      render: (dashboard: PublishedDashboard) => (
        <span className="text-sm">
          {new Date(dashboard.publishedDate).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: () => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" icon={<Eye size={14} />}>
            View
          </Button>
          <Button variant="secondary" size="sm" icon={<Archive size={14} />}>
            Archive
          </Button>
        </div>
      ),
    },
  ];

  const stats = [
    {
      label: 'Total Published',
      value: publishedDashboards.length,
    },
    {
      label: 'Public',
      value: publishedDashboards.filter((d) => d.isPublic).length,
    },
    {
      label: 'Total Views',
      value: publishedDashboards.reduce((sum, d) => sum + d.views, 0).toLocaleString(),
    },
    {
      label: 'Avg. Views',
      value: Math.round(
        publishedDashboards.reduce((sum, d) => sum + d.views, 0) / publishedDashboards.length
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[var(--color-title)] tracking-tight">
          Dashboard Publishing
        </h1>
        <p className="text-base text-[var(--color-text-secondary)] mt-2 font-medium">
          Manage published dashboards and their visibility
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {stats.map((stat, index) => (
          <Card key={index} elevated>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-1">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-[var(--color-title)]">{stat.value}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)]">
                <Globe size={16} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Table */}
      <Card elevated>
        <div className="mb-5">
          <Input
            placeholder="Search dashboards..."
            icon={<Search size={16} />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Table data={filteredDashboards} columns={columns} />
      </Card>
    </div>
  );
};
