import React from 'react';
import { Wrench, Clock, CheckCircle, AlertCircle, Plus, Search, MapPin, Star } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const CustomerDashboard: React.FC = () => {
  const { userProfile } = useAuth();

  const activeRequests = [
    { 
      id: 1, 
      title: 'Fix Laptop Screen', 
      category: 'Electronics', 
      status: 'In Progress', 
      professional: 'Oga Kemi Adebisi',
      estimatedTime: '2 hours',
      price: '₦8,000'
    },
    { 
      id: 2, 
      title: 'Plumbing Repair', 
      category: 'Home Repair', 
      status: 'Pending', 
      professional: 'Alhaji Musa Ibrahim',
      estimatedTime: '1 hour',
      price: '₦5,500'
    }
  ];

  const recentlyCompleted = [
    { 
      title: 'Car Oil Change', 
      professional: 'Alhaji Garba Sokoto', 
      rating: 5, 
      date: 'Jan 10', 
      price: '₦6,000' 
    },
    { 
      title: 'Garden Cleanup', 
      professional: 'Chief Emeka Nwosu', 
      rating: 4, 
      date: 'Jan 8', 
      price: '₦8,500' 
    },
    { 
      title: 'Computer Setup', 
      professional: 'Mrs. Adunni Fashola', 
      rating: 5, 
      date: 'Jan 5', 
      price: '₦12,000' 
    }
  ];

  const nearbyProfessionals = [
    { name: 'Oga Tunde Adebayo', skill: 'Electronics Repair', rating: 4.9, distance: '0.5 mi', price: '₦7,000/hr' },
    { name: 'Mama Ngozi Okwu', skill: 'Home Cleaning', rating: 4.8, distance: '1.2 mi', price: '₦5,000/hr' },
    { name: 'Mallam Abdullahi Kano', skill: 'Handyman Services', rating: 4.7, distance: '2.1 mi', price: '₦6,500/hr' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'In Progress': return Clock;
      case 'Pending': return AlertCircle;
      case 'Completed': return CheckCircle;
      default: return Clock;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {userProfile?.displayName}!
          </h1>
          <p className="text-gray-600 mt-2">Get help with your problems quickly and efficiently</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-orange-50">
                <Wrench className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Requests</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-50">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">15</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-50">
                <Star className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Rating Given</p>
                <p className="text-2xl font-bold text-gray-900">4.8</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-purple-50">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Response</p>
                <p className="text-2xl font-bold text-gray-900">12 min</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Active Requests */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Active Requests</h2>
                <button className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
                  <Plus className="h-4 w-4 mr-1" />
                  New Request
                </button>
              </div>
              
              <div className="space-y-4">
                {activeRequests.map((request) => {
                  const StatusIcon = getStatusIcon(request.status);
                  return (
                    <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-medium text-gray-900">{request.title}</h3>
                          <p className="text-sm text-gray-600">{request.category}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor(request.status)}`}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {request.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                        <div>Professional: {request.professional}</div>
                        <div>Est. Time: {request.estimatedTime}</div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-green-600">{request.price}</span>
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
                  );
                })}
              </div>
            </div>

            {/* Recently Completed */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Recently Completed</h2>
                <button className="text-blue-600 hover:text-blue-700 font-medium">View All</button>
              </div>
              
              <div className="space-y-4">
                {recentlyCompleted.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{item.title}</h3>
                      <span className="text-lg font-semibold text-gray-900">{item.price}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">by {item.professional}</p>
                        <p className="text-xs text-gray-500">{item.date}</p>
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < item.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="ml-1 text-sm text-gray-600">({item.rating})</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full bg-orange-600 text-white p-3 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center">
                  <Plus className="h-4 w-4 mr-2" />
                  Post New Request
                </button>
                <button className="w-full bg-gray-100 text-gray-700 p-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
                  <Search className="h-4 w-4 mr-2" />
                  Browse Professionals
                </button>
                <button className="w-full bg-gray-100 text-gray-700 p-3 rounded-lg hover:bg-gray-200 transition-colors">
                  Emergency Help
                </button>
              </div>
            </div>

            {/* Nearby Professionals */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Nearby Professionals</h2>
              <div className="space-y-3">
                {nearbyProfessionals.map((pro, index) => (
                  <div key={index} className="p-3 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{pro.name}</h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">{pro.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{pro.skill}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {pro.distance}
                      </div>
                      <span className="font-medium">{pro.price}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-blue-600 hover:text-blue-700 font-medium">
                View All Professionals
              </button>
            </div>

            {/* Help Center */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6">
              <h3 className="font-semibold text-orange-900 mb-2">Need Help?</h3>
              <p className="text-sm text-orange-700 mb-4">Our support team is here to assist you 24/7</p>
              <button className="text-orange-600 hover:text-orange-700 font-medium text-sm">
                Contact Support →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;