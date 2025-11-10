import React, { useState } from 'react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Table } from '../components/common/Table';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Search, Eye, X, Clock } from 'lucide-react';
import { pendingAccounts as initialPendingAccounts, PendingAccount, addApprovedClient } from '../data/mockData';
import { ClientOnboardingModal, OnboardingData } from '../components/modals/ClientOnboardingModal';
import { DeleteConfirmationModal } from '../components/modals/DeleteConfirmationModal';

export const PendingAccounts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pendingAccounts, setPendingAccounts] = useState<PendingAccount[]>(initialPendingAccounts);
  const [selectedAccount, setSelectedAccount] = useState<PendingAccount | null>(null);
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState<PendingAccount | null>(null);

  const filteredAccounts = pendingAccounts.filter(
    (account) =>
      account.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewClick = (account: PendingAccount) => {
    setSelectedAccount(account);
    setIsOnboardingModalOpen(true);
  };

  const handleUpdateAccount = (accountId: string, updates: Partial<PendingAccount>) => {
    setPendingAccounts((prev) =>
      prev.map((acc) =>
        acc.id === accountId ? { ...acc, ...updates } : acc
      )
    );
    // Update selected account if it's the one being modified
    if (selectedAccount?.id === accountId) {
      setSelectedAccount((prev) => prev ? { ...prev, ...updates } : null);
    }
  };

  const handleApprove = (accountId: string, data: OnboardingData) => {
    // Find the pending account
    const pendingAccount = pendingAccounts.find((acc) => acc.id === accountId);

    if (pendingAccount) {
      // Add to active clients list using helper function
      addApprovedClient(pendingAccount, data);

      // Remove from pending accounts
      setPendingAccounts((prev) => prev.filter((acc) => acc.id !== accountId));

      console.log('Approved client added to Active Clients:', {
        accountId,
        data,
        companyName: pendingAccount.companyName
      });
    }
  };

  const handleDeleteClick = (account: PendingAccount) => {
    setAccountToDelete(account);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteAccount = () => {
    if (accountToDelete) {
      setPendingAccounts((prev) => prev.filter((acc) => acc.id !== accountToDelete.id));
      console.log('Deleted account:', accountToDelete.id);
    }
  };

  const columns = [
    {
      key: 'companyName',
      header: 'Company Name',
      render: (account: PendingAccount) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            {account.companyName.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-[var(--color-title)]">{account.companyName}</p>
            <p className="text-xs text-[var(--color-text-muted)]">{account.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'contactPerson',
      header: 'Contact Person',
    },
    {
      key: 'plan',
      header: 'Requested Plan',
      render: (account: PendingAccount) => <Badge variant="info">{account.plan}</Badge>,
    },
    {
      key: 'requestedDate',
      header: 'Request Date',
      render: (account: PendingAccount) => (
        <span className="text-sm">
          {new Date(account.requestedDate).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (account: PendingAccount) => {
        const variants = {
          pending: 'warning' as const,
          reviewing: 'info' as const,
          approved: 'success' as const,
          rejected: 'danger' as const,
        };
        return <Badge variant={variants[account.status]}>{account.status}</Badge>;
      },
    },
    {
      key: 'onboardingStage',
      header: 'Onboarding Stage',
      render: (account: PendingAccount) => {
        if (!account.workspaceId) {
          return <Badge variant="default">Plan Pending</Badge>;
        } else if (!account.assignedDashboard) {
          return <Badge variant="info">Workspace Generated</Badge>;
        } else {
          return <Badge variant="success">Ready for Approval</Badge>;
        }
      },
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (account: PendingAccount) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={<Eye size={14} />}
            onClick={() => handleViewClick(account)}
          >
            View
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={<X size={14} />}
            onClick={() => handleDeleteClick(account)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const stats = [
    {
      label: 'Total Requests',
      value: pendingAccounts.length,
      icon: <Clock size={16} />,
      color: 'info',
    },
    {
      label: 'Pending',
      value: pendingAccounts.filter((a) => a.status === 'pending').length,
      icon: <Clock size={16} />,
      color: 'warning',
    },
    {
      label: 'Under Review',
      value: pendingAccounts.filter((a) => a.status === 'reviewing').length,
      icon: <Clock size={16} />,
      color: 'info',
    },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[var(--color-title)] tracking-tight">
          Pending Account Requests
        </h1>
        <p className="text-base text-[var(--color-text-secondary)] mt-2 font-medium">
          Review and approve new account registration requests
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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

      {/* Table */}
      <Card elevated>
        <div className="mb-5">
          <Input
            placeholder="Search by company, email, or contact person..."
            icon={<Search size={16} />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Table data={filteredAccounts} columns={columns} />
      </Card>

      {/* Client Onboarding Modal */}
      <ClientOnboardingModal
        isOpen={isOnboardingModalOpen}
        onClose={() => setIsOnboardingModalOpen(false)}
        account={selectedAccount}
        onApprove={handleApprove}
        onUpdateAccount={handleUpdateAccount}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteAccount}
        title="Delete Pending Account"
        message="Are you sure you want to delete this pending account request? This action cannot be undone."
        itemName={accountToDelete?.companyName}
      />
    </div>
  );
};
