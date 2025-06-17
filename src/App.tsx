import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AdminProvider, useAdmin } from './contexts/AdminContext';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import LearnSkillPage from './pages/LearnSkillPage';
import LearnerDashboard from './pages/dashboards/LearnerDashboard';
import ProfessionalDashboard from './pages/dashboards/ProfessionalDashboard';
import CustomerDashboard from './pages/dashboards/CustomerDashboard';
import CoursesPage from './pages/courses/CoursesPage';
import TrainingCentersPage from './pages/training/TrainingCentersPage';
import ProfessionalRegistrationPage from './pages/professionals/ProfessionalRegistrationPage';
import ProfessionalsDirectoryPage from './pages/professionals/ProfessionalsDirectoryPage';
import ProfessionalProfilePage from './pages/professionals/ProfessionalProfilePage';
import AdminDashboard from './pages/admin/AdminDashboard';

const AppContent: React.FC = () => {
  const { currentUser, userProfile, loading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdmin();
  const navigate = useNavigate();

  // Dashboard routing based on user role with admin priority
  const getDashboardRoute = () => {
    // PRIORITY 1: Check if user is admin first
    if (isAdmin) {
      return '/admin';
    }
    
    // PRIORITY 2: Check user role
    if (!currentUser || !userProfile?.role) return '/';
    
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

  // Show loading state while auth is initializing
  if (loading || adminLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/learn" element={<LearnSkillPage />} />
        
        {/* Course and Training Routes */}
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/training-centers" element={<TrainingCentersPage />} />
        
        {/* Professional Routes - Combined "Find Professionals" and "Join as Professional" */}
        <Route path="/professionals/register" element={<ProfessionalRegistrationPage />} />
        <Route path="/professionals/directory" element={<ProfessionalsDirectoryPage />} />
        <Route path="/professionals/:id" element={<ProfessionalProfilePage />} />
        
        {/* Admin Routes - Protected by admin check */}
        <Route 
          path="/admin" 
          element={
            isAdmin ? 
              <AdminDashboard /> : 
              <Navigate to="/" replace />
          } 
        />
        
        {/* Dashboard Routes */}
        <Route 
          path="/dashboard" 
          element={
            currentUser ? 
              <Navigate to={getDashboardRoute()} replace /> : 
              <Navigate to="/" replace />
          } 
        />
        <Route 
          path="/dashboard/learner" 
          element={
            currentUser && (userProfile?.role === 'learner' || isAdmin) ? 
              <LearnerDashboard /> : 
              <Navigate to="/" replace />
          } 
        />
        <Route 
          path="/dashboard/professional" 
          element={
            currentUser && (userProfile?.role === 'skilled-professional' || isAdmin) ? 
              <ProfessionalDashboard /> : 
              <Navigate to="/" replace />
          } 
        />
        <Route 
          path="/dashboard/customer" 
          element={
            currentUser && (userProfile?.role === 'customer' || isAdmin) ? 
              <CustomerDashboard /> : 
              <Navigate to="/" replace />
          } 
        />

        {/* Redirect old routes to new combined routes */}
        <Route path="/offer" element={<Navigate to="/professionals/register" replace />} />
        <Route path="/fix" element={<Navigate to="/professionals/directory" replace />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AdminProvider>
        <Router>
          <AppContent />
        </Router>
      </AdminProvider>
    </AuthProvider>
  );
}

export default App;