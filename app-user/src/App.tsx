import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { LoadingState } from './components/feedback/LoadingState';
import { NotificationProvider } from './contexts/NotificationContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Lazy load all page components for code splitting and better performance
const Login = lazy(() => import('./pages/Login').then(m => ({ default: m.Login })));
const Signup = lazy(() => import('./pages/Signup').then(m => ({ default: m.Signup })));
const Dashboard = lazy(() => import('./pages/Dashboard').then(m => ({ default: m.Dashboard })));
const Dashboards = lazy(() => import('./pages/Dashboards').then(m => ({ default: m.Dashboards })));
const DashboardViewer = lazy(() => import('./pages/DashboardViewer').then(m => ({ default: m.DashboardViewer })));
const Team = lazy(() => import('./pages/Team').then(m => ({ default: m.Team })));
const Profile = lazy(() => import('./pages/Profile').then(m => ({ default: m.Profile })));
const Notifications = lazy(() => import('./pages/Notifications').then(m => ({ default: m.Notifications })));
const ContactSupport = lazy(() => import('./pages/ContactSupport').then(m => ({ default: m.ContactSupport })));
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })));

// Protected Route wrapper for authenticated routes
const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Routes component that uses auth context
const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Root redirect to login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* App Routes - Protected */}
      <Route path="/app" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="/app/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="reports" element={<Dashboards />} />
        <Route path="reports/:id" element={<DashboardViewer />} />
        {user?.role === 'organization' && (
          <Route path="team" element={<Team />} />
        )}
        <Route path="profile" element={<Profile />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="support" element={<ContactSupport />} />
      </Route>

      {/* 404 - Catch all unknown routes */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <NotificationProvider>
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
              <LoadingState size="lg" text="Loading..." />
            </div>
          }>
            <AppRoutes />
          </Suspense>
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
