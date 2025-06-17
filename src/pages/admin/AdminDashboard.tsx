import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserCheck, 
  Building, 
  AlertTriangle, 
  TrendingUp, 
  Shield, 
  BarChart3,
  Settings,
  Bell,
  Search,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import UsersTab from './tabs/UsersTab';
import ProfessionalsTab from './tabs/ProfessionalsTab';
import TrainingCentersTab from './tabs/TrainingCentersTab';
import ReportsTab from './tabs/ReportsTab';
import SystemStatsTab from './tabs/SystemStatsTab';

type AdminTab = 'overview' | 'users' | 'professionals' | 'training-centers' | 'reports' | 'settings';

const AdminDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const { 
    isAdmin, 
    adminUser, 
    loading, 
    users, 
    professionals, 
    trainingCenters, 
    reports, 
    systemStats,
    loadUsers,
    loadProfessionals,
    loadTrainingCenters,
    loadReports,
    loadSystemStats
  } = useAdmin();
  
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [refreshing, setRefreshing] = useState(false);

  // Load all data on component mount
  useEffect(() => {
    if (isAdmin) {
      loadAllData();
    }
  }, [isAdmin]);

  const loadAllData = async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        loadUsers(),
        loadProfessionals(),
        loadTrainingCenters(),
        loadReports(),
        loadSystemStats()
      ]);
    } catch (error) {
      console.error('Error loading admin data:', error);
    }
    setRefreshing(false);
  };

  // Show loading while checking admin status
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking admin access...</p>
        </div>
      </div>
    );
  }

  // Redirect if not admin
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users, count: users.length },
    { id: 'professionals', label: 'Professionals', icon: UserCheck, count: professionals.length },
    { id: 'training-centers', label: 'Training Centers', icon: Building, count: trainingCenters.length },
    { id: 'reports', label: 'Reports', icon: AlertTriangle, count: reports.filter(r => r.status === 'pending').length },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const quickStats = [
    {
      title: 'Total Users',
      value: users.length,
      change: '+12%',
      changeType: 'positive' as const,
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Verified Professionals',
      value: professionals.filter(p => p.verificationStatus === 'verified').length,
      change: '+8%',
      changeType: 'positive' as const,
      icon: UserCheck,
      color: 'bg-green-500'
    },
    {
      title: 'Pending Verifications',
      value: professionals.filter(p => p.verificationStatus === 'pending').length,
      change: '-5%',
      changeType: 'negative' as const,
      icon: Shield,
      color: 'bg-yellow-500'
    },
    {
      title: 'Active Reports',
      value: reports.filter(r => r.status === 'pending' || r.status === 'investigating').length,
      change: '+3%',
      changeType: 'neutral' as const,
      icon: AlertTriangle,
      color: 'bg-red-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome back, {adminUser?.displayName}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={loadAllData}
                disabled={refreshing}
                className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              
              <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {adminUser?.displayName?.charAt(0) || 'A'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats - Only show on overview */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {quickStats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className={`h-4 w-4 mr-1 ${
                        stat.changeType === 'positive' ? 'text-green-500' :
                        stat.changeType === 'negative' ? 'text-red-500' : 'text-gray-500'
                      }`} />
                      <span className={`text-sm ${
                        stat.changeType === 'positive' ? 'text-green-600' :
                        stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {stat.change} from last month
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as AdminTab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="h-4 w-4 mr-2" />
                  {tab.label}
                  {tab.count !== undefined && tab.count > 0 && (
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                      activeTab === tab.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && <SystemStatsTab />}
            {activeTab === 'users' && <UsersTab />}
            {activeTab === 'professionals' && <ProfessionalsTab />}
            {activeTab === 'training-centers' && <TrainingCentersTab />}
            {activeTab === 'reports' && <ReportsTab />}
            {activeTab === 'settings' && <AdminSettings />}
          </div>
        </div>
      </div>
    </div>
  );
};

// Admin Settings Component
const AdminSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Admin Settings</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="font-medium text-gray-900 mb-4">System Configuration</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Auto-approve professionals</span>
              <input type="checkbox" className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Email notifications</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Maintenance mode</span>
              <input type="checkbox" className="rounded" />
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="font-medium text-gray-900 mb-4">Data Management</h4>
          <div className="space-y-3">
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              Export User Data
            </button>
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
              Backup Database
            </button>
            <button className="w-full bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-colors">
              Generate Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;