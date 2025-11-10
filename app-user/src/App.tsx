import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { Dashboards } from './pages/Dashboards';
import { DashboardViewer } from './pages/DashboardViewer';
import { Team } from './pages/Team';
import { Profile } from './pages/Profile';
import { NotFound } from './pages/NotFound';
import { AppLayout } from './components/layout/AppLayout';
import { currentUser } from './data/currentUser';

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
