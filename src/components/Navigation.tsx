import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Wrench, User, LogOut, LayoutDashboard, Users, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useAdmin } from '../contexts/AdminContext';
import AuthModal from './auth/AuthModal';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, userProfile, logout, loading } = useAuth();
  const { isAdmin, adminUser, loading: adminLoading } = useAdmin();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/learn', label: 'Learn a Skill' },
    { path: '/professionals/directory', label: 'Need a Fix?' },
    { path: '/professionals/register', label: 'Offer a Service' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleAuthClick = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'learner': return 'Learner';
      case 'skilled-professional': return 'Professional';
      case 'customer': return 'Customer';
      default: return 'User';
    }
  };

  const getDashboardPath = () => {
    // PRIORITY 1: Check if user is admin first
    if (isAdmin) {
      return '/admin';
    }
    
    // PRIORITY 2: Check user role
    if (!userProfile?.role) return '/';
    
    switch (userProfile.role) {
      case 'learner':
        return '/dashboard/learner';
      case 'skilled-professional':
        return '/dashboard/professional';
      case 'customer':
        return '/dashboard/customer';
      default:
        return '/';
    }
  };

  const getDashboardLabel = () => {
    if (isAdmin) {
      return 'Admin Dashboard';
    }
    return 'Dashboard';
  };

  const getUserDisplayInfo = () => {
    if (isAdmin && adminUser) {
      return {
        name: adminUser.displayName,
        role: adminUser.role === 'super-admin' ? 'Super Admin' : 'Admin',
        roleColor: 'bg-red-100 text-red-800'
      };
    }
    
    return {
      name: userProfile?.displayName || currentUser?.email,
      role: userProfile?.role ? getRoleDisplayName(userProfile.role) : 'User',
      roleColor: 'bg-blue-100 text-blue-800'
    };
  };

  const userInfo = getUserDisplayInfo();

  return (
    <>
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
              <Wrench className="h-8 w-8" />
              <span className="font-bold text-xl">WhoGoFixAm</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive(link.path)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Auth Section */}
              {!loading && !adminLoading && currentUser ? (
                <div className="flex items-center space-x-4">
                  {/* Dashboard Link - Show for authenticated users */}
                  <Link
                    to={getDashboardPath()}
                    className={`flex items-center space-x-1 transition-colors px-3 py-2 rounded-lg ${
                      isAdmin 
                        ? 'text-red-600 hover:text-red-700 bg-red-50' 
                        : 'text-blue-600 hover:text-blue-700 bg-blue-50'
                    }`}
                  >
                    {isAdmin ? (
                      <Shield className="h-4 w-4" />
                    ) : (
                      <LayoutDashboard className="h-4 w-4" />
                    )}
                    <span className="text-sm font-medium">{getDashboardLabel()}</span>
                  </Link>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <User className="h-4 w-4" />
                    <span>{userInfo.name}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${userInfo.roleColor}`}>
                      {userInfo.role}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="text-sm">Logout</span>
                  </button>
                </div>
              ) : !loading && !adminLoading ? (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleAuthClick('login')}
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleAuthClick('signup')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Sign Up
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <div className="animate-pulse bg-gray-200 h-8 w-16 rounded"></div>
                  <div className="animate-pulse bg-gray-200 h-8 w-20 rounded"></div>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-600 hover:text-blue-600 focus:outline-none focus:text-blue-600 transition-colors"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 rounded-lg mb-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                      isActive(link.path)
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Mobile Auth Section */}
                {!loading && !adminLoading && currentUser ? (
                  <div className="border-t pt-3 mt-3">
                    {/* Dashboard Link */}
                    <Link
                      to={getDashboardPath()}
                      onClick={() => setIsOpen(false)}
                      className={`block px-3 py-2 rounded-md transition-colors flex items-center space-x-2 ${
                        isAdmin 
                          ? 'text-red-600 hover:bg-red-50' 
                          : 'text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      {isAdmin ? (
                        <Shield className="h-4 w-4" />
                      ) : (
                        <LayoutDashboard className="h-4 w-4" />
                      )}
                      <span>{getDashboardLabel()}</span>
                    </Link>
                    
                    <div className="px-3 py-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-2 mb-2">
                        <User className="h-4 w-4" />
                        <span>{userInfo.name}</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${userInfo.roleColor}`}>
                        {userInfo.role}
                      </span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors flex items-center space-x-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : !loading && !adminLoading ? (
                  <div className="border-t pt-3 mt-3 space-y-2">
                    <button
                      onClick={() => {
                        handleAuthClick('login');
                        setIsOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-white rounded-md transition-colors"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        handleAuthClick('signup');
                        setIsOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Sign Up
                    </button>
                  </div>
                ) : (
                  <div className="border-t pt-3 mt-3">
                    <div className="animate-pulse bg-gray-200 h-8 w-full rounded mb-2"></div>
                    <div className="animate-pulse bg-gray-200 h-8 w-full rounded"></div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </>
  );
};

export default Navigation;