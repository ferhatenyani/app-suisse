# DashHub - Dashboard Management SaaS

A modern, responsive SaaS dashboard management platform built with React, TypeScript, Vite, and Tailwind CSS.

![Tech Stack](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Vite](https://img.shields.io/badge/Vite-7-purple)
![Tailwind](https://img.shields.io/badge/Tailwind-3-cyan)

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Visit: **http://localhost:5173**

## Features

### Authentication (UI Only)
- Login page with "Remember Me" and "Forgot Password"
- Signup with Individual/Organization account toggle
- Mock authentication (no backend)

### Dashboard Management
- Grid view of dashboards with search
- Dashboard viewer with placeholder
- Responsive card layout
- Public/private indicators

### Team Management (Organization Accounts)
- Team member table with filtering
- Invite user modal
- Role management (Admin/Editor/Viewer)
- Status tracking (Active/Pending/Inactive)

### User Profile
- Editable profile with Save/Cancel
- Avatar upload (UI only)
- Password change section
- Account type display

### UI Components
- 10 reusable components
- Responsive design (mobile-first)
- Accessible and keyboard-friendly
- Consistent design system

## Tech Stack

- **React 18** - UI library
- **TypeScript 5** - Type safety
- **Vite 7** - Build tool with SWC
- **Tailwind CSS 3** - Utility-first CSS
- **React Router 6** - Client-side routing
- **Lucide React** - Icon library

## Project Structure

```
src/
├── components/
│   ├── ui/           # 10 reusable UI components
│   └── layout/       # Sidebar, TopNav, AppLayout
├── pages/            # 6 route pages
├── data/             # Mock data (currentUser, dashboards, teamMembers)
├── types/            # TypeScript type definitions
├── App.tsx           # Main app with routing
└── main.tsx          # Entry point
```

## Documentation

- **[SETUP.md](SETUP.md)** - Quick setup guide and first steps
- **[PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md)** - Comprehensive project documentation
- **[COMPONENTS.md](COMPONENTS.md)** - Component API documentation

## Design System

### Colors (Corporate Clean)
- Primary: `#2563EB` (Blue)
- Background: `#F8FAFC` (Light gray)
- Panel: `#FFFFFF` (White)
- Text: `#334155` (Dark gray)
- Subtle: `#64748B` (Medium gray)
- Border: `#E2E8F0` (Light border)

### Typography
- Font: **Inter** (Google Fonts)
- Headers: font-semibold
- Body: text-base

### Components
- Cards: White with subtle shadow
- Buttons: Solid primary with variants
- Inputs: Clean with focus states
- Layout: Inspired by Stripe/HubSpot

## Routes

### Public Routes
- `/` → Redirects to `/login`
- `/login` → Login page
- `/signup` → Signup page

### Protected Routes
- `/app/dashboards` → Dashboard list (default)
- `/app/dashboards/:id` → Dashboard viewer
- `/app/team` → Team management (organization only)
- `/app/profile` → User profile settings

## Key Features

### Role-Based Access
- Organization accounts see Team page
- Individual accounts have Team page hidden
- Easy switching via `src/data/currentUser.ts`

### Responsive Design
- Mobile hamburger menu
- Collapsible sidebar
- Responsive grids (1→2→3 columns)
- Touch-friendly navigation

### Mock Data
- 8 pre-configured dashboards
- 12 pre-configured team members
- 2 user types (individual/organization)
- Easy to modify in `src/data/`

## Development

### Available Scripts

```bash
# Development server with HMR
npm run dev

# Type checking
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Testing User Types

Edit `src/data/currentUser.ts`:

```typescript
// For organization user (shows Team menu)
export const currentUser: User = {
  role: 'organization',
  // ...
};

// For individual user (hides Team menu)
export const currentUser: User = {
  role: 'individual',
  // ...
};
```

## What's Included

### UI Components
1. Button (5 variants)
2. Input (with validation)
3. Select (dropdown)
4. Card (with hover)
5. Avatar (with fallback)
6. Table (generic)
7. Modal (base)
8. InviteUserModal
9. DeleteConfirmModal
10. SettingsModal

### Pages
1. Login - Authentication form
2. Signup - Registration with role toggle
3. Dashboards - Grid view with search
4. DashboardViewer - Placeholder viewer
5. Team - Management table (org only)
6. Profile - Editable settings

### Layout
- Sidebar - Responsive navigation
- TopNav - User menu and actions
- AppLayout - Main app wrapper

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS/Android)

## Notes

- **No Backend**: All data is mocked
- **No State Management**: Uses local React state only
- **No Authentication**: Login redirects directly to app
- **UI Only**: Forms don't persist data

## Next Steps (Backend Integration)

When ready to add backend:

1. Replace mock data with API calls
2. Add authentication context/provider
3. Implement route protection
4. Add form validation
5. Connect to database
6. Add error handling
7. Implement real-time updates

## License

MIT

---

**Built with** ❤️ **using React + TypeScript + Vite + Tailwind CSS**
