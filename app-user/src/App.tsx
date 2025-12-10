import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { LoadingState } from './components/feedback/LoadingState';
import { currentUser } from './data/currentUser';

// Lazy load all page components for code splitting and better performance
const Login = lazy(() => import('./pages/Login').then(m => ({ default: m.Login })));
const Signup = lazy(() => import('./pages/Signup').then(m => ({ default: m.Signup })));
const Dashboard = lazy(() => import('./pages/Dashboard').then(m => ({ default: m.Dashboard })));
const Dashboards = lazy(() => import('./pages/Dashboards').then(m => ({ default: m.Dashboards })));
const DashboardViewer = lazy(() => import('./pages/DashboardViewer').then(m => ({ default: m.DashboardViewer })));
const Team = lazy(() => import('./pages/Team').then(m => ({ default: m.Team })));
const Profile = lazy(() => import('./pages/Profile').then(m => ({ default: m.Profile })));
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
          <LoadingState size="lg" text="Loading..." />
        </div>
      }>
        <Routes>
          {/* Root redirect to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* App Routes */}
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Navigate to="/app/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="reports" element={<Dashboards />} />
            <Route path="reports/:id" element={<DashboardViewer />} />
            {currentUser.role === 'organization' && (
              <Route path="team" element={<Team />} />
            )}
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* 404 - Catch all unknown routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
