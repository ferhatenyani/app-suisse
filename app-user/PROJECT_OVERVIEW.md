# DashHub - User App Frontend

A modern SaaS dashboard management platform built with React, TypeScript, and Tailwind CSS.

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite 7 with SWC
- **Styling**: Tailwind CSS v3 (with custom design system)
- **Routing**: React Router v6
- **Icons**: Lucide React
- **State**: Local state only (no global state management)

## Design System: "Corporate Clean"

### Colors
- Background: `#F8FAFC`
- Panels: `#FFFFFF`
- Titles: `#0F172A`
- Text: `#334155`
- Subtle: `#64748B`
- Borders: `#E2E8F0`
- Primary: `#2563EB`

### Typography
- Font Family: Inter
- Headers: font-semibold
- Body: text-base

### Components Style
- Cards: `bg-white rounded-xl border border-slate-200 shadow-sm p-6`
- Buttons: Solid primary (#2563EB) with hover states
- Layout: Clean, balanced spacing inspired by Stripe/HubSpot

## Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Card.tsx
│   │   ├── Avatar.tsx
│   │   ├── Table.tsx
│   │   ├── Modal.tsx
│   │   ├── InviteUserModal.tsx
│   │   ├── DeleteConfirmModal.tsx
│   │   └── SettingsModal.tsx
│   └── layout/             # Layout components
│       ├── Sidebar.tsx     # Responsive sidebar with mobile menu
│       ├── TopNav.tsx      # Top navigation bar
│       └── AppLayout.tsx   # Main app layout wrapper
├── pages/                  # Route pages
│   ├── Login.tsx           # Login page with Remember Me
│   ├── Signup.tsx          # Signup with individual/organization toggle
│   ├── Dashboards.tsx      # Dashboard grid with search
│   ├── DashboardViewer.tsx # Dashboard viewer placeholder
│   ├── Team.tsx            # Team management (org only)
│   └── Profile.tsx         # Profile page with edit mode
├── data/                   # Mock data
│   ├── currentUser.ts      # Current user data
│   ├── dashboards.ts       # 8 mock dashboards
│   └── teamMembers.ts      # 12 mock team members
├── types/                  # TypeScript types
│   └── index.ts            # User, Dashboard, TeamMember types
├── App.tsx                 # Main app with routing
├── main.tsx                # App entry point
└── index.css               # Tailwind CSS imports
```

## Features Implemented

### Authentication (UI Only)
- [Login.tsx](src/pages/Login.tsx) - Email/password login with "Remember me" and "Forgot password"
- [Signup.tsx](src/pages/Signup.tsx) - Account creation with Individual/Organization toggle

### Dashboard Management
- [Dashboards.tsx](src/pages/Dashboards.tsx) - Grid view of all dashboards with search
- [DashboardViewer.tsx](src/pages/DashboardViewer.tsx) - Placeholder viewer page

### Team Management (Organization Only)
- [Team.tsx](src/pages/Team.tsx) - Team member table with filters
- Invite user modal
- Delete confirmation modal
- Role management (Admin, Editor, Viewer)

### User Profile
- [Profile.tsx](src/pages/Profile.tsx) - Editable profile with Save/Cancel
- Avatar upload (UI only)
- Password change section
- Account type display

### UI Components
- **Button**: 5 variants (primary, secondary, outline, ghost, danger)
- **Input**: Labels, errors, helper text
- **Select**: Dropdown with custom styling
- **Card**: Hover effects optional
- **Avatar**: Initials fallback
- **Table**: Generic table with custom columns
- **Modal**: Base modal with 3 specialized versions

### Responsive Design
- Mobile-first approach
- Collapsible sidebar on mobile
- Responsive grid layouts (1→2→3 columns)
- Touch-friendly navigation

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Visit: http://localhost:5173

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

## Routes

### Public Routes
- `/` - Redirects to login
- `/login` - Login page
- `/signup` - Signup page

### Protected Routes (under `/app`)
- `/app/dashboards` - Dashboard list (default)
- `/app/dashboards/:id` - Dashboard viewer
- `/app/team` - Team management (organization accounts only)
- `/app/profile` - User profile settings

## Mock Data

### Switching User Types
Edit [src/data/currentUser.ts](src/data/currentUser.ts):

```typescript
// For organization user (shows Team page in sidebar)
export const currentUser: User = {
  role: 'organization',
  // ...
};

// For individual user (hides Team page)
export const currentUser: User = {
  role: 'individual',
  // ...
};
```

### Mock Dashboards
8 pre-configured dashboards in [src/data/dashboards.ts](src/data/dashboards.ts)

### Mock Team Members
12 pre-configured team members in [src/data/teamMembers.ts](src/data/teamMembers.ts)

## Key Features

### Role-Based Navigation
- Team page only visible for organization accounts
- Sidebar automatically filters based on user role

### Search & Filters
- Dashboard search by title/description
- Team member filters by role and status

### Modals
- Invite user modal with email and role selection
- Delete confirmation with warning message
- Settings modal with theme/language options

### Profile Edit Mode
- Toggle between view and edit modes
- Visual Save/Cancel buttons
- No actual data persistence (UI only)

### Responsive Design
- Mobile hamburger menu
- Collapsible sidebar
- Responsive tables with horizontal scroll
- Touch-friendly interactive elements

## Notes

- **No Backend**: All data is mocked in TypeScript files
- **No State Management**: Uses local React state only
- **No Authentication**: Login/signup redirect directly to app
- **UI Only**: Forms don't persist data, just console.log actions

## Customization

### Changing Colors
Edit [tailwind.config.js](tailwind.config.js):
```javascript
theme: {
  extend: {
    colors: {
      primary: '#2563EB', // Your brand color
      // ...
    }
  }
}
```

### Adding New Pages
1. Create component in `src/pages/`
2. Add route in [src/App.tsx](src/App.tsx)
3. Add nav item in [src/components/layout/Sidebar.tsx](src/components/layout/Sidebar.tsx)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

MIT
