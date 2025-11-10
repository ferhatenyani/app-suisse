import React, { useState } from 'react';
import { UserPlus, Search, Mail, Trash2, Users as UsersIcon, Shield, Eye, Edit3 } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Table } from '../components/ui/Table';
import { Avatar } from '../components/ui/Avatar';
import { Select } from '../components/ui/Select';
import { InviteUserModal } from '../components/ui/InviteUserModal';
import { DeleteConfirmModal } from '../components/ui/DeleteConfirmModal';
import { teamMembers } from '../data/teamMembers';
import { TeamMember } from '../types';

export const Team: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || member.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getRoleBadge = (role: string) => {
    const configs = {
      admin: {
        bg: 'bg-[var(--color-primary-light)]',
        text: 'text-[var(--color-primary)]',
        icon: <Shield size={10} strokeWidth={2} />,
        label: 'Admin'
      },
      editor: {
        bg: 'bg-[var(--color-info-light)]',
        text: 'text-[var(--color-info)]',
        icon: <Edit3 size={10} strokeWidth={2} />,
        label: 'Editor'
      },
      viewer: {
        bg: 'bg-[var(--color-panel)]',
        text: 'text-[var(--color-text-secondary)]',
        icon: <Eye size={10} strokeWidth={2} />,
        label: 'Viewer'
      }
    };
    const config = configs[role as keyof typeof configs] || configs.viewer;

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border border-transparent text-xs font-medium ${config.bg} ${config.text}`}>
        {config.icon}
        {config.label}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    const configs = {
      active: {
        bg: 'bg-[var(--color-success-light)]',
        text: 'text-[var(--color-success)]',
        border: 'border-[var(--color-success-border)]',
        dot: 'bg-[var(--color-success)]',
        label: 'Active'
      },
      pending: {
        bg: 'bg-[var(--color-warning-light)]',
        text: 'text-[var(--color-warning)]',
        border: 'border-[var(--color-warning-border)]',
        dot: 'bg-[var(--color-warning)]',
        label: 'Pending'
      },
      inactive: {
        bg: 'bg-[var(--color-danger-light)]',
        text: 'text-[var(--color-danger)]',
        border: 'border-[var(--color-danger-border)]',
        dot: 'bg-[var(--color-danger)]',
        label: 'Inactive'
      }
    };
    const config = configs[status as keyof typeof configs] || configs.inactive;

    return (
      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded border text-xs font-medium ${config.bg} ${config.text} ${config.border}`}>
        <span className={`w-1 h-1 rounded-full ${config.dot}`}></span>
        {config.label}
      </span>
    );
  };

  const handleDeleteMember = (member: TeamMember) => {
    setSelectedMember(member);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    console.log('Deleting member:', selectedMember);
    setSelectedMember(null);
  };

  // Corporate table columns with enhanced styling
  const columns = [
    {
      header: 'Team Member',
      accessor: (row: TeamMember) => (
        <div className="flex items-center gap-3">
          <Avatar src={row.avatar} name={row.name} size="md" />
          <div>
            <p className="font-semibold text-[#1E1E2E]">{row.name}</p>
            <p className="text-sm text-[#64748B]">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Role',
      accessor: (row: TeamMember) => getRoleBadge(row.role),
    },
    {
      header: 'Status',
      accessor: (row: TeamMember) => getStatusBadge(row.status),
    },
    {
      header: 'Joined Date',
      accessor: (row: TeamMember) => (
        <span className="text-sm text-[#64748B]">{formatDate(row.joinedAt)}</span>
      ),
    },
    {
      header: 'Actions',
      accessor: (row: TeamMember) => (
        <div className="flex items-center gap-2">
          {row.status === 'pending' && (
            <Button
              variant="ghost"
              size="sm"
              className="!p-2 hover:bg-[#DBEAFE] hover:text-[#1D4ED8]"
              title="Resend invitation"
            >
              <Mail size={16} />
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="!p-2 text-[#EF4444] hover:bg-[#FEE2E2]"
            onClick={() => handleDeleteMember(row)}
            title="Remove member"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
          <div>
            <h1 className="text-2xl font-semibold text-[var(--color-title)] tracking-tight">Team</h1>
            <p className="text-sm text-[var(--color-text-secondary)] mt-1">
              Manage members and permissions
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={() => setIsInviteModalOpen(true)}
            icon={<UserPlus size={16} strokeWidth={2} />}
          >
            Invite Member
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-5">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wide mb-1">Total Members</p>
                <p className="text-2xl font-semibold text-[var(--color-title)] tracking-tight">{teamMembers.length}</p>
              </div>
              <div className="w-10 h-10 rounded-md bg-[var(--color-panel)] flex items-center justify-center">
                <UsersIcon size={18} className="text-[var(--color-text-muted)]" strokeWidth={1.5} />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-[#64748B] uppercase tracking-wide">Active</p>
                <p className="text-3xl font-bold text-[#1E1E2E] mt-1">
                  {teamMembers.filter(m => m.status === 'active').length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[#D1FAE5] flex items-center justify-center">
                <Shield className="w-6 h-6 text-[#10B981]" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-[#64748B] uppercase tracking-wide">Pending</p>
                <p className="text-3xl font-bold text-[#1E1E2E] mt-1">
                  {teamMembers.filter(m => m.status === 'pending').length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[#FEF3C7] flex items-center justify-center">
                <Mail className="w-6 h-6 text-[#F59E0B]" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-[#64748B] uppercase tracking-wide">Admins</p>
                <p className="text-3xl font-bold text-[#1E1E2E] mt-1">
                  {teamMembers.filter(m => m.role === 'admin').length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[#CFFAFE] flex items-center justify-center">
                <Shield className="w-6 h-6 text-[#06B6D4]" />
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search size={18} />}
            />
            <Select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              options={[
                { value: 'all', label: 'All Roles' },
                { value: 'admin', label: 'Admin' },
                { value: 'editor', label: 'Editor' },
                { value: 'viewer', label: 'Viewer' },
              ]}
            />
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: 'all', label: 'All Status' },
                { value: 'active', label: 'Active' },
                { value: 'pending', label: 'Pending' },
                { value: 'inactive', label: 'Inactive' },
              ]}
            />
          </div>
        </Card>
      </div>

      {/* Results count */}
      {searchQuery && (
        <div className="mb-4">
          <p className="text-sm text-[#64748B]">
            Found <span className="font-semibold text-[#1E1E2E]">{filteredMembers.length}</span> member{filteredMembers.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}

      {/* Team Table */}
      {filteredMembers.length === 0 ? (
        <Card className="text-center py-16">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-[#F8F9FB] flex items-center justify-center mb-4">
              <UsersIcon className="w-8 h-8 text-[#94A3B8]" />
            </div>
            <p className="text-[#1E1E2E] text-lg font-semibold mb-2">No team members found</p>
            <p className="text-[#64748B] text-sm">
              Try adjusting your search or filters
            </p>
          </div>
        </Card>
      ) : (
        <Table data={filteredMembers} columns={columns} />
      )}

      <InviteUserModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Remove Team Member"
        message="Are you sure you want to remove this team member? They will immediately lose access to all reports and data."
        itemName={selectedMember?.name}
      />
    </div>
  );
};
