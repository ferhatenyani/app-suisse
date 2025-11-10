# Admin Panel - ReportHub

A professional, corporate-style Super Admin dashboard for managing the ReportHub platform.

## Features

- **Dashboard Overview**: Platform KPIs, pending requests, and recent activity
- **Pending Accounts**: Review and approve new account registration requests
- **Clients & Organizations**: Manage all platform clients with filtering and search
- **Data Sources**: Configure and monitor platform data sources
- **Dashboard Publishing**: Manage published dashboards and visibility settings
- **Subscription Plans**: View and manage pricing tiers
- **Platform Analytics**: Comprehensive platform performance metrics

## Technology Stack

- React 19
- TypeScript
- Tailwind CSS v4
- React Router v7
- Vite
- Lucide React (icons)

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Design System

The admin app follows a corporate monochrome design system:

- **Primary Color**: #0F172A (dark slate)
- **Accent Color**: #475569 (slate gray)
- **Background**: #FFFFFF (white)
- **Panel Background**: #FAFAFA (light gray)

### Components

All reusable components are located in `src/components/common/`:

- **Card**: Flexible card container with hover effects
- **Button**: Multiple variants (primary, secondary, outline, ghost, danger)
- **Input**: Form input with label and error handling
- **Table**: Data table with customizable columns
- **Badge**: Status badges with color variants

### Layout Components

Located in `src/components/layout/`:

- **AppLayout**: Main application layout wrapper
- **Sidebar**: Collapsible navigation sidebar (expands on hover)
- **Topbar**: Top navigation bar with search and actions

## Pages

All pages are located in `src/pages/`:

1. **Dashboard** (`/admin/dashboard`): Platform overview with KPIs and quick actions
2. **Pending Accounts** (`/admin/pending-accounts`): Account approval management
3. **Clients** (`/admin/clients`): Client and organization management
4. **Data Sources** (`/admin/data-sources`): Data source configuration
5. **Publishing** (`/admin/publishing`): Dashboard publishing management
6. **Subscriptions** (`/admin/subscriptions`): Subscription plan management
7. **Analytics** (`/admin/analytics`): Platform analytics and metrics

## Mock Data

All mock data is centralized in `src/data/mockData.ts`. This includes:

- Pending account requests
- Client information
- Data sources
- Published dashboards
- Subscription plans
- Platform analytics

## Responsive Design

The app is fully responsive:

- **Mobile**: Hamburger menu, stacked cards
- **Tablet**: 2-column grid layout
- **Desktop**: Full sidebar, multi-column layouts

## Code Structure

```
app-admin/
├── public/              # Static assets
├── src/
│   ├── components/
│   │   ├── common/      # Reusable UI components
│   │   └── layout/      # Layout components
│   ├── data/            # Mock data
│   ├── pages/           # Page components
│   ├── App.tsx          # Main app with routing
│   ├── main.tsx         # App entry point
│   └── index.css        # Global styles & theme
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Notes

- This is a frontend-only application with mock data
- No API integration or backend logic is included
- All data is static and for demonstration purposes
- Authentication and authorization are not implemented
