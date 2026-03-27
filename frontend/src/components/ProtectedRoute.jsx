import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <main className="min-h-screen grid place-items-center">
        <div className="w-8 h-8 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin" />
      </main>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
