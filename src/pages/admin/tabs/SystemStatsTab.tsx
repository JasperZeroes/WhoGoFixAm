import React from 'react';
import { 
  TrendingUp, 
  Users, 
  UserCheck, 
  Building, 
  AlertTriangle,
  BarChart3,
  PieChart,
  Activity,
  Calendar,
  MapPin,
  Award
} from 'lucide-react';
import { useAdmin } from '../../../contexts/AdminContext';

const SystemStatsTab: React.FC = () => {
  const { systemStats, users, professionals, trainingCenters, reports } = useAdmin();

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
      title: 'Training Centers',
      value: trainingCenters.length,
      change: '+5%',
      changeType: 'positive' as const,
      icon: Building,
      color: 'bg-purple-500'
    },
    {
      title: 'Active Reports',
      value: reports.filter(r => r.status === 'pending' || r.status === 'investigating').length,
      change: '-15%',
      changeType: 'negative' as const,
      icon: AlertTriangle,
      color: 'bg-red-500'
    }
  ];

  const usersByRole = [
    { role: 'Learners', count: users.filter(u => u.role === 'learner').length, color: 'bg-blue-500' },
    { role: 'Professionals', count: users.filter(u => u.role === 'skilled-professional').length, color: 'bg-green-500' },
    { role: 'Customers', count: users.filter(u => u.role === 'customer').length, color: 'bg-orange-500' }
  ];

  const verificationStats = [
    { status: 'Verified', count: professionals.filter(p => p.verificationStatus === 'verified').length, color: 'bg-green-500' },
    { status: 'Pending', count: professionals.filter(p => p.verificationStatus === 'pending').length, color: 'bg-yellow-500' },
    { status: 'Rejected', count: professionals.filter(p => p.verificationStatus === 'rejected').length, color: 'bg-red-500' }
  ];

  const reportsByType = [
    { type: 'User Complaints', count: reports.filter(r => r.reportType === 'user-complaint').length },
    { type: 'Professional Disputes', count: reports.filter(r => r.reportType === 'professional-dispute').length },
    { type: 'Quality Issues', count: reports.filter(r => r.reportType === 'quality-issue').length },
    { type: 'Fraud Reports', count: reports.filter(r => r.reportType === 'fraud-report').length }
  ];

  const topSkills = systemStats?.topSkills || [
    { skill: 'Plumbing', count: 45 },
    { skill: 'Electrical', count: 38 },
    { skill: 'Tailoring', count: 32 },
    { skill: 'Carpentry', count: 28 },
    { skill: 'Welding', count: 25 }
  ];

  const topLocations = systemStats?.topLocations || [
    { location: 'Lagos', count: 120 },
    { location: 'Abuja', count: 85 },
    { location: 'Kano', count: 67 },
    { location: 'Port Harcourt', count: 54 },
    { location: 'Ibadan', count: 48 }
  ];

  return (
    <div className="space-y-8">
      {/* Overview Stats */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-6">System Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
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
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Users by Role */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-semibold text-gray-900">Users by Role</h4>
            <PieChart className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {usersByRole.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full ${item.color} mr-3`}></div>
                  <span className="text-sm font-medium text-gray-700">{item.role}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-bold text-gray-900 mr-2">{item.count}</span>
                  <span className="text-xs text-gray-500">
                    ({users.length > 0 ? Math.round((item.count / users.length) * 100) : 0}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Verification Status */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-semibold text-gray-900">Professional Verification</h4>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {verificationStats.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full ${item.color} mr-3`}></div>
                  <span className="text-sm font-medium text-gray-700">{item.status}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-bold text-gray-900 mr-2">{item.count}</span>
                  <span className="text-xs text-gray-500">
                    ({professionals.length > 0 ? Math.round((item.count / professionals.length) * 100) : 0}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reports Overview */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-semibold text-gray-900">Reports by Type</h4>
          <Activity className="h-5 w-5 text-gray-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reportsByType.map((item, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-gray-900">{item.count}</p>
              <p className="text-sm text-gray-600">{item.type}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Top Skills and Locations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Skills */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-semibold text-gray-900">Top Skills</h4>
            <Award className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {topSkills.map((skill, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{skill.skill}</span>
                <div className="flex items-center">
                  <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(skill.count / Math.max(...topSkills.map(s => s.count))) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{skill.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Locations */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-semibold text-gray-900">Top Locations</h4>
            <MapPin className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {topLocations.map((location, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{location.location}</span>
                <div className="flex items-center">
                  <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${(location.count / Math.max(...topLocations.map(l => l.count))) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{location.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-semibold text-gray-900">Recent Activity</h4>
          <Calendar className="h-5 w-5 text-gray-400" />
        </div>
        <div className="space-y-4">
          <div className="flex items-center p-3 bg-blue-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
            <span className="text-sm text-gray-700">5 new professionals registered today</span>
          </div>
          <div className="flex items-center p-3 bg-green-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
            <span className="text-sm text-gray-700">3 professionals verified this week</span>
          </div>
          <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
            <span className="text-sm text-gray-700">2 reports pending review</span>
          </div>
          <div className="flex items-center p-3 bg-purple-50 rounded-lg">
            <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
            <span className="text-sm text-gray-700">1 new training center added</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemStatsTab;