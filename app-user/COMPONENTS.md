# Component Documentation

## UI Components (`src/components/ui/`)

### Button
**File**: [src/components/ui/Button.tsx](src/components/ui/Button.tsx)

Versatile button component with multiple variants and sizes.

**Props**:
- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
- `size`: 'sm' | 'md' | 'lg'
- All standard HTML button props

**Usage**:
```tsx
<Button variant="primary" size="md" onClick={handleClick}>
  Click Me
</Button>
```

---

### Input
**File**: [src/components/ui/Input.tsx](src/components/ui/Input.tsx)

Styled text input with label, error, and helper text support.

**Props**:
- `label`: Optional label text
- `error`: Error message to display
- `helperText`: Helper text below input
- All standard HTML input props

**Usage**:
```tsx
<Input
  label="Email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  helperText="We'll never share your email"
  error={emailError}
/>
```

---

### Select
**File**: [src/components/ui/Select.tsx](src/components/ui/Select.tsx)

Dropdown select component with options.

**Props**:
- `label`: Optional label text
- `options`: Array of `{value: string, label: string}`
- `error`: Error message
- `helperText`: Helper text
- All standard HTML select props

**Usage**:
```tsx
<Select
  label="Role"
  value={role}
  onChange={(e) => setRole(e.target.value)}
  options={[
    { value: 'admin', label: 'Admin' },
    { value: 'editor', label: 'Editor' },
  ]}
/>
```

---

### Card
**File**: [src/components/ui/Card.tsx](src/components/ui/Card.tsx)

Container component with consistent styling.

**Props**:
- `children`: Card content
- `className`: Additional CSS classes
- `onClick`: Click handler
- `hover`: Enable hover effect (boolean)

**Usage**:
```tsx
<Card hover onClick={() => console.log('clicked')}>
  <h3>Card Title</h3>
  <p>Card content</p>
</Card>
```

---

### Avatar
**File**: [src/components/ui/Avatar.tsx](src/components/ui/Avatar.tsx)

User avatar with initials fallback.

**Props**:
- `src`: Image URL (optional)
- `name`: User name (required, for initials)
- `alt`: Alt text
- `size`: 'sm' | 'md' | 'lg' | 'xl'
- `className`: Additional CSS classes

**Usage**:
```tsx
<Avatar
  src={user.avatar}
  name={user.name}
  size="md"
/>
```

---

### Table
**File**: [src/components/ui/Table.tsx](src/components/ui/Table.tsx)

Generic table component with custom columns.

**Props**:
- `data`: Array of objects with `id` field
- `columns`: Array of column definitions
- `className`: Additional CSS classes

**Column Definition**:
```typescript
{
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
}
```

**Usage**:
```tsx
<Table
  data={users}
  columns={[
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    {
      header: 'Actions',
      accessor: (row) => <button>Edit</button>
    },
  ]}
/>
```

---

### Modal
**File**: [src/components/ui/Modal.tsx](src/components/ui/Modal.tsx)

Base modal component with header, content, and footer.

**Props**:
- `isOpen`: Boolean to control visibility
- `onClose`: Close handler
- `title`: Modal title
- `children`: Modal content
- `footer`: Optional footer content (React.ReactNode)
- `size`: 'sm' | 'md' | 'lg' | 'xl'

**Usage**:
```tsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
  footer={
    <>
      <Button variant="secondary" onClick={onClose}>Cancel</Button>
      <Button variant="primary" onClick={onSave}>Save</Button>
    </>
  }
>
  <p>Modal content here</p>
</Modal>
```

---

### InviteUserModal
**File**: [src/components/ui/InviteUserModal.tsx](src/components/ui/InviteUserModal.tsx)

Specialized modal for inviting team members.

**Props**:
- `isOpen`: Boolean
- `onClose`: Close handler

**Features**:
- Email input
- Role selection (Admin/Editor/Viewer)
- Form validation
- Auto-close on submit

**Usage**:
```tsx
<InviteUserModal
  isOpen={isInviteModalOpen}
  onClose={() => setIsInviteModalOpen(false)}
/>
```

---

### DeleteConfirmModal
**File**: [src/components/ui/DeleteConfirmModal.tsx](src/components/ui/DeleteConfirmModal.tsx)

Confirmation dialog for destructive actions.

**Props**:
- `isOpen`: Boolean
- `onClose`: Close handler
- `onConfirm`: Confirm handler
- `title`: Optional title (default: "Confirm Deletion")
- `message`: Optional message
- `itemName`: Optional item name to display

**Usage**:
```tsx
<DeleteConfirmModal
  isOpen={isDeleteModalOpen}
  onClose={() => setIsDeleteModalOpen(false)}
  onConfirm={handleDelete}
  title="Remove Team Member"
  message="Are you sure you want to remove this member?"
  itemName={member.name}
/>
```

---

### SettingsModal
**File**: [src/components/ui/SettingsModal.tsx](src/components/ui/SettingsModal.tsx)

App settings modal with theme, language, and notification preferences.

**Props**:
- `isOpen`: Boolean
- `onClose`: Close handler

**Features**:
- Theme selection (Light/Dark/System)
- Language selection
- Email notification toggle

**Usage**:
```tsx
<SettingsModal
  isOpen={isSettingsOpen}
  onClose={() => setIsSettingsOpen(false)}
/>
```

---

## Layout Components (`src/components/layout/`)

### Sidebar
**File**: [src/components/layout/Sidebar.tsx](src/components/layout/Sidebar.tsx)

Responsive navigation sidebar.

**Features**:
- Role-based navigation filtering
- Mobile hamburger menu
- Active route highlighting
- Collapsible on mobile

**Navigation Items**:
- Dashboards (all users)
- Team (organization only)
- Profile (all users)

---

### TopNav
**File**: [src/components/layout/TopNav.tsx](src/components/layout/TopNav.tsx)

Top navigation bar with user menu.

**Features**:
- User avatar and name
- Dropdown menu
- Profile settings link
- App settings modal
- Sign out button

---

### AppLayout
**File**: [src/components/layout/AppLayout.tsx](src/components/layout/AppLayout.tsx)

Main app layout wrapper combining sidebar and top nav.

**Features**:
- Flexbox layout
- Sidebar + main content area
- Overflow handling
- Responsive design

---

## Pages (`src/pages/`)

### Login
**File**: [src/pages/Login.tsx](src/pages/Login.tsx)

Login page with authentication form.

**Features**:
- Email/password inputs
- Remember me checkbox
- Forgot password link
- Sign up link
- Mock authentication (redirects to /app/dashboards)

---

### Signup
**File**: [src/pages/Signup.tsx](src/pages/Signup.tsx)

User registration page.

**Features**:
- Individual/Organization toggle
- Conditional company name field
- Form validation (UI only)
- Password confirmation
- Sign in link

---

### Dashboards
**File**: [src/pages/Dashboards.tsx](src/pages/Dashboards.tsx)

Dashboard list page with grid layout.

**Features**:
- Search by title/description
- Card grid (responsive: 1→2→3 columns)
- Dashboard thumbnails
- Public badge for public dashboards
- Click to view dashboard

---

### DashboardViewer
**File**: [src/pages/DashboardViewer.tsx](src/pages/DashboardViewer.tsx)

Dashboard viewer page with placeholder.

**Features**:
- Back navigation
- Dashboard title and description
- Action buttons (Share, Export, Settings)
- Placeholder content area
- Not found handling

---

### Team
**File**: [src/pages/Team.tsx](src/pages/Team.tsx)

Team management page (organization only).

**Features**:
- Member table with avatars
- Search by name/email
- Filter by role
- Filter by status
- Invite member modal
- Delete confirmation
- Role and status badges

---

### Profile
**File**: [src/pages/Profile.tsx](src/pages/Profile.tsx)

User profile settings page.

**Features**:
- Edit mode toggle
- Avatar upload (UI only)
- Personal information fields
- Account type display
- Password change section
- Save/Cancel buttons

---

## Data Layer (`src/data/`)

### currentUser.ts
**File**: [src/data/currentUser.ts](src/data/currentUser.ts)

Mock current user data. Exports:
- `currentUser`: Main user object (organization by default)
- `individualUser`: Alternative individual user

**To Switch User Types**: Change the exported `currentUser` constant.

---

### dashboards.ts
**File**: [src/data/dashboards.ts](src/data/dashboards.ts)

8 mock dashboards with:
- Title and description
- Thumbnail URLs (placeholder images)
- Public/private status
- Timestamps

---

### teamMembers.ts
**File**: [src/data/teamMembers.ts](src/data/teamMembers.ts)

12 mock team members with:
- Names and emails
- Avatars (UI Avatars service)
- Roles (Admin/Editor/Viewer)
- Status (Active/Pending/Inactive)
- Join dates

---

## Types (`src/types/`)

### index.ts
**File**: [src/types/index.ts](src/types/index.ts)

TypeScript type definitions:

**UserRole**: 'individual' | 'organization'

**User**:
```typescript
{
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  companyName?: string;
  createdAt: string;
}
```

**Dashboard**:
```typescript
{
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
}
```

**TeamMember**:
```typescript
{
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  avatar?: string;
  joinedAt: string;
  status: 'active' | 'pending' | 'inactive';
}
```
