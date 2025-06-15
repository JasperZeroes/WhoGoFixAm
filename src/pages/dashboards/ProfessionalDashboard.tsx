import React from 'react';
import { Users, DollarSign, Calendar, Star, TrendingUp, MessageSquare, Clock, Plus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const ProfessionalDashboard: React.FC = () => {
  const { userProfile } = useAuth();

  const upcomingSessions = [
    { 
      id: 1, 
      title: 'Laptop Screen Repair', 
      category: 'Electronics', 
      status: 'In Progress', 
      customer: 'Mrs. Chioma Okeke',
      estimatedTime: '2 hours',
      price: '₦8,000'
    },
    { 
      id: 2, 
      title: 'Bathroom Plumbing', 
      category: 'Home Repair', 
      status: 'Pending', 
      customer: 'Alhaji Bello Kano',
      estimatedTime: '1 hour',
      price: '₦5,500'
    }
  ];

  const recentEarnings = [
    { amount: '₦12,000', customer: 'Mrs. Adunni Fashola', skill: 'Plumbing', date: 'Jan 12' },
    { amount: '₦8,500', customer: 'Chief Emeka Nwosu', skill: 'Electrical', date: 'Jan 11' },
    { amount: '₦15,000', customer: 'Mama Ngozi Okwu', skill: 'Welding', date: 'Jan 10' }
  ];

  const skillsOffered = [
    { name: 'Plumbing', students: 45, rating: 4.9, earnings: '₦185,000' },
    { name: 'Electrical Work', students: 23, rating: 4.8, earnings: '₦92,000' },
    { name: 'Welding', students: 12, rating: 4.7, earnings: '₦48,000' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {userProfile?.displayName}!
          </h1>
          <p className="text-gray-600 mt-2">Manage your teaching and grow your impact</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-50">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">₦325,000</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-50">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Clients</p>
                <p className="text-2xl font-bold text-gray-900">80</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-yellow-50">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-900">4.8</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-purple-50">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Growth</p>
                <p className="text-2xl font-bold text-gray-900">+23%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Upcoming Sessions */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Active Jobs</h2>
                <button className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Service
                </button>
              </div>
              
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-gray-900">{session.title}</h3>
                        <p className="text-sm text-gray-600">{session.category}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        session.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {session.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        Est. Time: {session.estimatedTime}
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-lg font-semibold text-green-600">{session.price}</span>
                        <div className="flex space-x-2">
                          <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                            Message
                          </button>
                          <button className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Performance */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Your Skills Performance</h2>
                <button className="text-blue-600 hover:text-blue-700 font-medium">View Analytics</button>
              </div>
              
              <div className="space-y-4">
                {skillsOffered.map((skill, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-gray-900">{skill.name}</h3>
                      <span className="text-lg font-semibold text-green-600">{skill.earnings}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">{skill.students} students</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-2" />
                        <span className="text-gray-600">{skill.rating} rating</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Earnings */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Earnings</h2>
              <div className="space-y-3">
                {recentEarnings.map((earning, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{earning.amount}</p>
                      <p className="text-sm text-gray-600">{earning.customer}</p>
                      <p className="text-xs text-gray-500">{earning.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">{earning.skill}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-blue-600 hover:text-blue-700 font-medium">
                View All Transactions
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Skill
                </button>
                <button className="w-full bg-gray-100 text-gray-700 p-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message Students
                </button>
                <button className="w-full bg-gray-100 text-gray-700 p-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Manage Schedule
                </button>
              </div>
            </div>

            {/* Profile Completion */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
              <h3 className="font-semibold text-blue-900 mb-2">Complete Your Profile</h3>
              <p className="text-sm text-blue-700 mb-4">85% complete - Add more skills to attract students</p>
              <div className="w-full bg-blue-200 rounded-full h-2 mb-4">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }} />
              </div>
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                Complete Profile →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDashboard;