import React, { useState, useEffect } from 'react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Table } from '../components/common/Table';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { Search, Building2, Users, User, Eye, Trash2 } from 'lucide-react';
import { clients as initialClients, Client } from '../data/mockData';
import { EditClientModal, EditClientData } from '../components/modals/EditClientModal';
import { DeleteConfirmationModal } from '../components/modals/DeleteConfirmationModal';

export const Clients: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'Individual' | 'Organization'>('all');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);
  const [clients, setClients] = useState<Client[]>(initialClients);

  // Poll for updates to clients list (check every 500ms for demo purposes)
  useEffect(() => {
    const interval = setInterval(() => {
      setClients([...initialClients]);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || client.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleViewClick = (client: Client) => {
    setSelectedClient(client);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (client: Client) => {
    setClientToDelete(client);
    setIsDeleteModalOpen(true);
  };

  const handleSaveClient = (clientId: string, data: EditClientData) => {
    // Update the client in the clients array
    setClients((prevClients) =>
      prevClients.map((client) => {
        if (client.id === clientId) {
          // Map dashboard values to labels for display
          const mockDashboards = [
            { value: 'sales-dashboard', label: 'Sales Performance Dashboard' },
            { value: 'marketing-analytics', label: 'Marketing Analytics' },
            { value: 'financial-overview', label: 'Financial Overview' },
            { value: 'customer-insights', label: 'Customer Insights' },
            { value: 'operations-metrics', label: 'Operations Metrics' },
            { value: 'hr-analytics', label: 'HR Analytics' },
            { value: 'product-performance', label: 'Product Performance' },
            { value: 'inventory-tracking', label: 'Inventory Tracking' },
          ];

          const dashboardLabels = data.dashboards
            .map((dashboardValue) => {
              const dashboard = mockDashboards.find((d) => d.value === dashboardValue);
              return dashboard ? dashboard.label : null;
            })
            .filter((label): label is string => label !== null);

          return {
            ...client,
            name: data.name,
            email: data.email,
            type: data.type,
            plan: data.plan,
            status: data.status,
            dashboardCount: data.dashboards.length, // Sync dashboard count with assigned dashboards
            assignedDashboard: dashboardLabels.join(', '), // Join dashboard labels
          };
        }
        return client;
      })
    );

    // Also update the initialClients array to persist changes
    const clientIndex = initialClients.findIndex((c) => c.id === clientId);
    if (clientIndex !== -1) {
      const mockDashboards = [
        { value: 'sales-dashboard', label: 'Sales Performance Dashboard' },
        { value: 'marketing-analytics', label: 'Marketing Analytics' },
        { value: 'financial-overview', label: 'Financial Overview' },
        { value: 'customer-insights', label: 'Customer Insights' },
        { value: 'operations-metrics', label: 'Operations Metrics' },
        { value: 'hr-analytics', label: 'HR Analytics' },
        { value: 'product-performance', label: 'Product Performance' },
        { value: 'inventory-tracking', label: 'Inventory Tracking' },
      ];

      const dashboardLabels = data.dashboards
        .map((dashboardValue) => {
          const dashboard = mockDashboards.find((d) => d.value === dashboardValue);
          return dashboard ? dashboard.label : null;
        })
        .filter((label): label is string => label !== null);

      initialClients[clientIndex] = {
        ...initialClients[clientIndex],
        name: data.name,
        email: data.email,
        type: data.type,
        plan: data.plan,
        status: data.status,
        dashboardCount: data.dashboards.length,
        assignedDashboard: dashboardLabels.join(', '),
      };
    }

    console.log('Saving client:', clientId, data);
    alert(`Client updated successfully!\nName: ${data.name}\nPlan: ${data.plan}\nStatus: ${data.status}\nDashboards: ${data.dashboards.length}`);
  };

  const handleDeleteClient = () => {
    // Mock delete logic
    if (clientToDelete) {
      console.log('Deleting client:', clientToDelete.id);
      alert(`Client "${clientToDelete.name}" has been deleted`);
    }
  };

  const columns = [
    {
      key: 'name',
      header: 'Client',
      render: (client: Client) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            {client.name.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-[var(--color-title)]">{client.name}</p>
            <p className="text-xs text-[var(--color-text-muted)]">{client.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'type',
      header: 'Type',
      render: (client: Client) => (
        <div className="flex items-center gap-2">
          {client.type === 'Organization' ? (
            <Building2 size={14} className="text-[var(--color-text-muted)]" />
          ) : (
            <User size={14} className="text-[var(--color-text-muted)]" />
          )}
          <span className="text-sm font-medium">{client.type}</span>
        </div>
      ),
    },
    {
      key: 'plan',
      header: 'Plan',
      render: (client: Client) => {
        const variants = {
          Starter: 'default' as const,
          Professional: 'info' as const,
          Enterprise: 'success' as const,
        };
        return <Badge variant={variants[client.plan]}>{client.plan}</Badge>;
      },
    },
    {
      key: 'workspace',
      header: 'Workspace',
      render: (client: Client) => (
        <div className="text-xs">
          {client.workspaceId ? (
            <>
              <p className="font-mono font-medium text-[var(--color-title)]">{client.workspaceId}</p>
              {client.assignedDashboard && (
                <p className="text-[var(--color-text-muted)] mt-1">{client.assignedDashboard}</p>
              )}
            </>
          ) : (
            <span className="text-[var(--color-text-muted)]">-</span>
          )}
        </div>
      ),
    },
    {
      key: 'lastActive',
      header: 'Last Active',
      render: (client: Client) => (
        <span className="text-sm">
          {new Date(client.lastActive).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          })}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (client: Client) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={<Eye size={14} />}
            onClick={() => handleViewClick(client)}
          >
            View
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={<Trash2 size={14} />}
            onClick={() => handleDeleteClick(client)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const stats = [
    {
      label: 'Total Clients',
      value: clients.length,
      icon: <Users size={16} />,
    },
    {
      label: 'Organizations',
      value: clients.filter((c) => c.type === 'Organization').length,
      icon: <Building2 size={16} />,
    },
    {
      label: 'Individuals',
      value: clients.filter((c) => c.type === 'Individual').length,
      icon: <User size={16} />,
    },
    {
      label: 'Active',
      value: clients.filter((c) => c.status === 'active').length,
      icon: <Users size={16} />,
    },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[var(--color-title)] tracking-tight">
          Clients & Organizations
        </h1>
        <p className="text-base text-[var(--color-text-secondary)] mt-2 font-medium">
          Manage all platform clients and organizations
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
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
                {stat.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters and Table */}
      <Card elevated>
        <div className="flex flex-col md:flex-row gap-4 mb-5">
          <div className="flex-1">
            <Input
              placeholder="Search clients..."
              icon={<Search size={16} />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterType === 'all' ? 'primary' : 'secondary'}
              onClick={() => setFilterType('all')}
            >
              All
            </Button>
            <Button
              variant={filterType === 'Organization' ? 'primary' : 'secondary'}
              onClick={() => setFilterType('Organization')}
            >
              Organizations
            </Button>
            <Button
              variant={filterType === 'Individual' ? 'primary' : 'secondary'}
              onClick={() => setFilterType('Individual')}
            >
              Individuals
            </Button>
          </div>
        </div>
        <Table data={filteredClients} columns={columns} />
      </Card>

      {/* Edit Client Modal */}
      <EditClientModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        client={selectedClient}
        onSave={handleSaveClient}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteClient}
        title="Delete Client"
        message="Are you sure you want to delete this client? All their data, dashboards, and settings will be permanently removed."
        itemName={clientToDelete?.name}
      />
    </div>
  );
};
