import React, { useState } from 'react';
import { UserPlus, Search, Mail, Trash2, Users as UsersIcon, Shield, Eye, Edit3 } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Table } from '../components/ui/Table';
import { Avatar } from '../components/ui/Avatar';
import { Select } from '../components/ui/Select';
import { Badge } from '../components/ui/Badge';
import { InviteUserModal } from '../components/ui/InviteUserModal';
import { DeleteConfirmModal } from '../components/ui/DeleteConfirmModal';
import { Toast } from '../components/ui/Toast';
import { teamMembers } from '../data/teamMembers';
import type { TeamMember, TeamMemberRole, TeamMemberStatus } from '../types';
import { formatDate, pluralize } from '../utils/formatters';

export const Team: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [members, setMembers] = useState<TeamMember[]>(teamMembers);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || member.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleBadge = (role: TeamMemberRole) => {
    const configs: Record<TeamMemberRole, { variant: 'primary' | 'info' | 'neutral'; icon: React.ReactNode; label: string }> = {
      admin: { variant: 'primary', icon: <Shield size={10} strokeWidth={2} />, label: 'Admin' },
      editor: { variant: 'info', icon: <Edit3 size={10} strokeWidth={2} />, label: 'Editor' },
      viewer: { variant: 'neutral', icon: <Eye size={10} strokeWidth={2} />, label: 'Viewer' },
    };
    const config = configs[role];
    return <Badge variant={config.variant} size="sm" icon={config.icon}>{config.label}</Badge>;
  };

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  const handleEmailShare = (email: string) => {
      
    if (isMobile) {
      // On mobile devices, use mailto link
      window.location.href = `mailto:${email}`;
    } else {
      // On desktop: open Gmail web compose in a new tab
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;
      window.open(gmailUrl, '_blank');
    }
  };

  const getStatusBadge = (status: TeamMemberStatus) => {
    const configs: Record<TeamMemberStatus, { variant: 'success' | 'warning' | 'danger'; label: string }> = {
      active: { variant: 'success', label: 'Active' },
      pending: { variant: 'warning', label: 'Pending' },
      inactive: { variant: 'danger', label: 'Inactive' },
    };
    const config = configs[status];
    return <Badge variant={config.variant} size="sm" dot>{config.label}</Badge>;
  };

  const handleDeleteMember = (member: TeamMember) => {
    setSelectedMember(member);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedMember) {
      setMembers(members.filter(member => member.id !== selectedMember.id));
    }
    setSelectedMember(null);
  };

  const handleInviteUser = (email: string) => {
    setToastMessage(`Invitation sent successfully to ${email}!`);
    setShowToast(true);
  };

  // Corporate table columns with enhanced styling
  const columns = [
    {
      header: 'Team Member',
      accessor: (row: TeamMember) => (
        <div className="flex items-center gap-3">
          <Avatar src={row.avatar} name={row.name} size="md" />
          <div>
            <p className="font-semibold text-[var(--color-text)]">{row.name}</p>
            <p className="text-sm text-[var(--color-text-secondary)]">{row.email}</p>
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
      header: 'Joined on',
      accessor: (row: TeamMember) => (
        <span className="text-sm text-[var(--color-text-secondary)] whitespace-nowrap">{formatDate(row.joinedAt)}</span>
      ),
    },
    {
      header: 'Actions',
      accessor: (row: TeamMember) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="!p-2 hover:bg-[var(--color-info-light)] hover:text-[var(--color-info)]"
            onClick={() => handleEmailShare(row.email)}
            aria-label="Send email"
            title="Send email"
          >
            <Mail size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="!p-2 text-[var(--color-danger)] hover:bg-[var(--color-danger-light)]"
            onClick={() => handleDeleteMember(row)}
            aria-label="Remove member"
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
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4 mb-5">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wide mb-1">Total Members</p>
                <p className="text-2xl font-semibold text-[var(--color-title)] tracking-tight">{members.length}</p>
              </div>
              <div className="w-10 h-10 rounded-md bg-[var(--color-panel)] flex items-center justify-center">
                <UsersIcon size={18} className="text-[var(--color-text-muted)]" strokeWidth={1.5} />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs xs:text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide">Active</p>
                <p className="text-2xl xs:text-3xl font-bold text-[var(--color-title)] mt-1">
                  {members.filter(m => m.status === 'active').length}
                </p>
              </div>
              <div className="w-10 h-10 xs:w-12 xs:h-12 rounded-xl bg-[var(--color-success-light)] flex items-center justify-center">
                <Shield className="w-5 h-5 xs:w-6 xs:h-6 text-[var(--color-success)]" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs xs:text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide">Pending</p>
                <p className="text-2xl xs:text-3xl font-bold text-[var(--color-title)] mt-1">
                  {members.filter(m => m.status === 'pending').length}
                </p>
              </div>
              <div className="w-10 h-10 xs:w-12 xs:h-12 rounded-xl bg-[var(--color-warning-light)] flex items-center justify-center">
                <Mail className="w-5 h-5 xs:w-6 xs:h-6 text-[var(--color-warning)]" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs xs:text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide">Admins</p>
                <p className="text-2xl xs:text-3xl font-bold text-[var(--color-title)] mt-1">
                  {members.filter(m => m.role === 'admin').length}
                </p>
              </div>
              <div className="w-10 h-10 xs:w-12 xs:h-12 rounded-xl bg-[var(--color-info-light)] flex items-center justify-center">
                <Shield className="w-5 h-5 xs:w-6 xs:h-6 text-[var(--color-info)]" />
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-4">
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-4">
            <Input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search size={18} />}
              aria-label="Search team members"
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
              aria-label="Filter by role"
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
              aria-label="Filter by status"
            />
          </div>
        </Card>
      </div>

      {/* Results count */}
      {searchQuery && (
        <div className="mb-4">
          <p className="text-sm text-[var(--color-text-secondary)]">
            Found <span className="font-semibold text-[var(--color-text)]">{filteredMembers.length}</span> {pluralize(filteredMembers.length, 'member')}
          </p>
        </div>
      )}

      {/* Team Table */}
      <Table
        data={filteredMembers}
        columns={columns}
        emptyStateTitle="No team members found"
        emptyStateDescription="Try adjusting your search or filters"
      />

      <InviteUserModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onInvite={handleInviteUser}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Remove Team Member"
        message="Are you sure you want to remove this team member? They will immediately lose access to all reports and data."
        itemName={selectedMember?.name}
      />

      <Toast
        message={toastMessage}
        type="success"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
};
