# Quick Setup Guide

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

## Installation Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The app will be available at: **http://localhost:5173**

## First Login

The login page is purely UI - any credentials will work. Just click "Sign In" to access the app.

## Testing Different User Types

### To Test Organization Account (with Team Management)
1. Open [src/data/currentUser.ts](src/data/currentUser.ts)
2. Ensure the exported `currentUser` has `role: 'organization'`
3. Refresh the browser
4. You'll see the "Team" menu item in the sidebar

### To Test Individual Account (no Team)
1. Open [src/data/currentUser.ts](src/data/currentUser.ts)
2. Change to:
```typescript
export const currentUser = individualUser; // Pre-configured individual user
```
3. Refresh the browser
4. The "Team" menu item will be hidden

## Exploring the App

### Pages Available
1. **Login** (`/login`) - Start here
2. **Signup** (`/signup`) - Toggle between Individual/Organization
3. **Dashboards** (`/app/dashboards`) - Grid of 8 mock dashboards
4. **Dashboard Viewer** (`/app/dashboards/:id`) - Click any dashboard card
5. **Team** (`/app/team`) - Only visible for organization users
6. **Profile** (`/app/profile`) - Click your avatar → Profile Settings

### Try These Features

#### Dashboard Page
- Search for dashboards by name or description
- Click any dashboard card to open viewer
- Click "New Dashboard" button (UI only)

#### Team Page (Organization Only)
- Filter by role (Admin/Editor/Viewer)
- Filter by status (Active/Pending/Inactive)
- Search members by name or email
- Click "Invite Member" to open modal
- Click trash icon to open delete confirmation

#### Profile Page
- Click "Edit Profile" button
- Modify fields
- Click "Save Changes" (logs to console, no persistence)
- Click "Cancel" to revert changes

#### Mobile Experience
- Resize browser to mobile width
- Click hamburger menu (top-left) to open sidebar
- Navigate between pages
- Close menu by clicking overlay

## Building for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

## Preview Production Build

```bash
npm run preview
```

## Troubleshooting

### Port Already in Use
If port 5173 is taken, Vite will automatically use the next available port.

### Tailwind Styles Not Loading
1. Ensure `npm install` completed successfully
2. Check that [src/index.css](src/index.css) has Tailwind directives
3. Restart dev server

### TypeScript Errors
Run type check:
```bash
npm run build
```

## Next Steps (Backend Integration)

When ready to add backend:
1. Replace mock data in `src/data/` with API calls
2. Add authentication context/hooks
3. Implement proper route protection
4. Add form validation and error handling
5. Connect to real database

## Support

For questions or issues, refer to:
- [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md) - Detailed documentation
- [Vite Documentation](https://vitejs.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
