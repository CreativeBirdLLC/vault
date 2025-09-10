import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Crown, 
  Settings, 
  Users, 
  Shield, 
  LogOut,
  Menu,
  X,
  BarChart3
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../ui/Button';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if logout fails, redirect to admin login
      navigate('/admin/login');
    }
  };

  const adminNavItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: BarChart3 },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Settings', href: '/admin/email-settings', icon: Settings },
    { name: 'Profile', href: '/profile', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900">
      {/* Admin Header */}
      <header className="bg-black/40 backdrop-blur-xl border-b border-purple-500/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/admin/dashboard" className="flex items-center space-x-2 group">
                <div className="relative">
                  <Crown className="h-8 w-8 text-purple-400 transition-all duration-300 group-hover:text-purple-300 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-purple-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"></div>
                </div>
                <div>
                  <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    HeirGuard
                  </span>
                  <span className="block text-xs text-purple-300">Admin Portal</span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {adminNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="flex items-center space-x-2 text-gray-300 hover:text-purple-300 font-medium transition-colors duration-200 relative group px-3 py-2 rounded-lg hover:bg-purple-500/10"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                );
              })}
            </nav>

            {/* User Info & Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-white">{user?.username}</p>
                <p className="text-xs text-purple-300">Administrator</p>
              </div>
              
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="border-purple-500/30 text-purple-300 hover:border-purple-400 hover:bg-purple-500/10 transition-all duration-200 group"
              >
                <LogOut className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                <span>Sign out</span>
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-300 hover:text-white p-2 rounded-lg hover:bg-purple-500/10 transition-colors duration-200"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black/60 backdrop-blur-xl border-t border-purple-500/20">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {adminNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-3 text-gray-300 hover:text-purple-300 hover:bg-purple-500/10 px-3 py-2 rounded-lg font-medium transition-all duration-200"
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              
              <div className="border-t border-purple-500/20 pt-4">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium text-white">{user?.username}</p>
                  <p className="text-xs text-purple-300">Administrator</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 text-purple-300 hover:text-purple-200 hover:bg-purple-500/10 px-3 py-2 rounded-lg font-medium transition-all duration-200 w-full"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Admin Footer */}
      <footer className="bg-black/20 backdrop-blur-sm border-t border-purple-500/20 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Shield className="h-5 w-5 text-purple-400" />
              <span className="text-sm text-gray-300">
                HeirGuard Admin Portal - Secure & Monitored
              </span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>Version 1.0.0</span>
              <span>•</span>
              <Link to="/admin/help" className="hover:text-purple-300 transition-colors duration-200">
                Help
              </Link>
              <span>•</span>
              <Link to="/admin/security" className="hover:text-purple-300 transition-colors duration-200">
                Security
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminLayout;
