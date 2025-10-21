import { useState, useEffect } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { getUserSession, isAuthenticated } from '@/utils/auth';
import { User } from '@/types';
import Login from '@/pages/Login';
import AdminDashboard from '@/pages/AdminDashboard';
import StudentDashboard from '@/pages/StudentDashboard';
import TeacherDashboard from '@/pages/TeacherDashboard';

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    if (isAuthenticated()) {
      const currentUser = getUserSession();
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const renderDashboard = () => {
    if (!user) return <Login onLogin={handleLogin} />;

    switch (user.role) {
      case 'admin':
        return <AdminDashboard user={user} onLogout={handleLogout} />;
      case 'student':
        return <StudentDashboard user={user} onLogout={handleLogout} />;
      case 'teacher':
        return <TeacherDashboard user={user} onLogout={handleLogout} />;
      default:
        return <Login onLogin={handleLogin} />;
    }
  };

  return (
    <TooltipProvider>
      <Toaster />
      {renderDashboard()}
    </TooltipProvider>
  );
};

export default App;