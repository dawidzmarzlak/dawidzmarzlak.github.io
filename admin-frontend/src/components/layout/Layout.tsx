import { Outlet, Navigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { authService } from '../../services/auth';

export function Layout() {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="pl-64">
        <main className="min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
