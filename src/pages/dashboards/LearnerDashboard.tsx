import React, { useState } from 'react';
import { BookOpen, Clock, Star, TrendingUp, Users, Award, Calendar, Search, MapPin, Video, Building, Filter, ChevronRight, Play, Globe, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const LearnerDashboard: React.FC = () => {
  const { userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'centers'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const recentSkills = [
    { name: 'Plumbing Basics', progress: 75, instructor: 'Alhaji Musa Ibrahim', nextSession: '2024-01-15', type: 'online' },
    { name: 'Tailoring Fundamentals', progress: 45, instructor: 'Mrs. Adunni Fashola', nextSession: '2024-01-16', type: 'physical' },
    { name: 'Electrical Wiring', progress: 90, instructor: 'Mallam Abdullahi Kano', nextSession: '2024-01-18', type: 'online' }
  ];

  const onlineCourses = [
    {
      id: 1,
      title: 'Complete Plumbing Fundamentals',
      instructor: 'Alhaji Musa Ibrahim',
      rating: 4.9,
      students: 85,
      duration: '8 hours',
      price: '₦15,000',
      level: 'Beginner',
      category: 'Plumbing',
      image: 'https://images.pexels.com/photos/5691659/pexels-photo-5691659.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Learn essential plumbing skills from pipe installation to leak repairs'
    },
    {
      id: 2,
      title: 'Professional Tailoring Masterclass',
      instructor: 'Mrs. Adunni Fashola',
      rating: 4.8,
      students: 67,
      duration: '12 hours',
      price: '₦18,000',
      level: 'Intermediate',
      category: 'Tailoring',
      image: 'https://images.pexels.com/photos/5710186/pexels-photo-5710186.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Master the art of tailoring from measurements to finished garments'
    },
    {
      id: 3,
      title: 'Welding Techniques & Safety',
      instructor: 'Engineer Chukwudi Okafor',
      rating: 4.9,
      students: 45,
      duration: '10 hours',
      price: '₦20,000',
      level: 'Beginner',
      category: 'Welding',
      image: 'https://images.pexels.com/photos/5691662/pexels-photo-5691662.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Learn safe welding practices and master different welding techniques'
    },
    {
      id: 4,
      title: 'Electrical Wiring Basics',
      instructor: 'Mallam Abdullahi Kano',
      rating: 4.7,
      students: 92,
      duration: '6 hours',
      price: '₦12,000',
      level: 'Beginner',
      category: 'Electrical',
      image: 'https://images.pexels.com/photos/5691661/pexels-photo-5691661.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Understand electrical systems and learn basic wiring techniques'
    },
    {
      id: 5,
      title: 'Carpentry Workshop Essentials',
      instructor: 'Chief Emeka Nwosu',
      rating: 4.8,
      students: 58,
      duration: '14 hours',
      price: '₦16,000',
      level: 'Beginner',
      category: 'Carpentry',
      image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Learn fundamental carpentry skills and woodworking techniques'
    },
    {
      id: 6,
      title: 'Shoe Making & Repair',
      instructor: 'Oga Tunde Adebayo',
      rating: 4.6,
      students: 42,
      duration: '10 hours',
      price: '₦14,000',
      level: 'Beginner',
      category: 'Crafts',
      image: 'https://images.pexels.com/photos/5710187/pexels-photo-5710187.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Learn traditional and modern shoe making techniques'
    }
  ];

  const trainingCenters = [
    {
      id: 1,
      name: 'Lagos Technical Institute',
      location: 'Victoria Island, Lagos',
      distance: '2.3 miles',
      rating: 4.8,
      specialties: ['Plumbing', 'Electrical', 'Welding'],
      image: 'https://images.pexels.com/photos/5691664/pexels-photo-5691664.jpeg?auto=compress&cs=tinysrgb&w=400',
      address: '15 Ahmadu Bello Way, Victoria Island, Lagos',
      phone: '(234) 801-234-5678',
      courses: 15,
      students: 450
    },
    {
      id: 2,
      name: 'Abuja Skills Development Center',
      location: 'Wuse 2, Abuja',
      distance: '1.8 miles',
      rating: 4.9,
      specialties: ['Tailoring', 'Fashion Design', 'Carpentry'],
      image: 'https://images.pexels.com/photos/5691665/pexels-photo-5691665.jpeg?auto=compress&cs=tinysrgb&w=400',
      address: '23 Adetokunbo Ademola Crescent, Wuse 2, Abuja',
      phone: '(234) 802-345-6789',
      courses: 12,
      students: 320
    },
    {
      id: 3,
      name: 'Kano Artisan Training Hub',
      location: 'Sabon Gari, Kano',
      distance: '3.1 miles',
      rating: 4.7,
      specialties: ['Masonry', 'Carpentry', 'Plumbing'],
      image: 'https://images.pexels.com/photos/5691666/pexels-photo-5691666.jpeg?auto=compress&cs=tinysrgb&w=400',
      address: '45 Ibrahim Taiwo Road, Sabon Gari, Kano',
      phone: '(234) 804-567-8901',
      courses: 18,
      students: 600
    },
    {
      id: 4,
      name: 'Port Harcourt Vocational Academy',
      location: 'GRA Phase 2, Port Harcourt',
      distance: '4.2 miles',
      rating: 4.6,
      specialties: ['Automotive', 'Welding', 'Electrical'],
      image: 'https://images.pexels.com/photos/5691667/pexels-photo-5691667.jpeg?auto=compress&cs=tinysrgb&w=400',
      address: '12 Aba Road, GRA Phase 2, Port Harcourt',
      phone: '(234) 803-456-7890',
      courses: 8,
      students: 180
    }
  ];

  const categories = ['all', 'Plumbing', 'Tailoring', 'Welding', 'Electrical', 'Carpentry', 'Crafts'];

  const achievements = [
    { title: 'First Course Completed', icon: Award, earned: true },
    { title: 'Week Streak', icon: TrendingUp, earned: true },
    { title: 'Community Helper', icon: Users, earned: false }
  ];

  const filteredCourses = onlineCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredCenters = trainingCenters.filter(center =>
    center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    center.specialties.some(specialty => specialty.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const renderOverview = () => (
    <>
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-50">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Courses</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-50">
              <Award className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-orange-50">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Hours Learned</p>
              <p className="text-2xl font-bold text-gray-900">48</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-purple-50">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Streak</p>
              <p className="text-2xl font-bold text-gray-900">7 days</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Current Learning */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Continue Learning</h2>
              <button className="text-blue-600 hover:text-blue-700 font-medium">View All</button>
            </div>
            
            <div className="space-y-4">
              {recentSkills.map((skill, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <h3 className="font-medium text-gray-900 mr-3">{skill.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        skill.type === 'online' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {skill.type === 'online' ? 'Online' : 'In-Person'}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">with {skill.instructor}</span>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{skill.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${skill.progress}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      Next: {skill.nextSession}
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                      Continue
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Access */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link 
              to="/courses"
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 hover:shadow-lg transition-shadow block"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-lg bg-blue-600">
                  <Video className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-blue-900">Online Courses</h3>
                  <p className="text-blue-700">Learn from anywhere</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-blue-900">{onlineCourses.length}+</span>
                <ChevronRight className="h-5 w-5 text-blue-600" />
              </div>
            </Link>

            <Link 
              to="/training-centers"
              className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 hover:shadow-lg transition-shadow block"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-lg bg-green-600">
                  <Building className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-green-900">Training Centers</h3>
                  <p className="text-green-700">Hands-on learning</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-green-900">{trainingCenters.length}</span>
                <ChevronRight className="h-5 w-5 text-green-600" />
              </div>
            </Link>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Achievements */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Achievements</h2>
            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <div key={index} className={`flex items-center p-3 rounded-lg ${achievement.earned ? 'bg-green-50' : 'bg-gray-50'}`}>
                  <div className={`p-2 rounded-lg ${achievement.earned ? 'bg-green-100' : 'bg-gray-100'}`}>
                    <achievement.icon className={`h-5 w-5 ${achievement.earned ? 'text-green-600' : 'text-gray-400'}`} />
                  </div>
                  <div className="ml-3">
                    <p className={`font-medium ${achievement.earned ? 'text-green-900' : 'text-gray-500'}`}>
                      {achievement.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link 
                to="/courses"
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors block text-center"
              >
                Browse Online Courses
              </Link>
              <Link 
                to="/training-centers"
                className="w-full bg-gray-100 text-gray-700 p-3 rounded-lg hover:bg-gray-200 transition-colors block text-center"
              >
                Find Training Centers
              </Link>
              <button className="w-full bg-gray-100 text-gray-700 p-3 rounded-lg hover:bg-gray-200 transition-colors">
                View Certificates
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderCourses = () => (
    <div>
      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
            <div className="relative">
              <img 
                src={course.image} 
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                  course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {course.level}
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <div className="bg-white rounded-full p-2">
                  <Play className="h-4 w-4 text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                  {course.category}
                </span>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600 ml-1">{course.rating}</span>
                </div>
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{course.description}</p>
              
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Users className="h-4 w-4 mr-1" />
                <span className="mr-4">{course.students} students</span>
                <Clock className="h-4 w-4 mr-1" />
                <span>{course.duration}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold text-gray-900">{course.price}</span>
                  <p className="text-sm text-gray-600">by {course.instructor}</p>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCenters = () => (
    <div>
      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search training centers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Centers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCenters.map((center) => (
          <div key={center.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
            <div className="relative">
              <img 
                src={center.image} 
                alt={center.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4">
                <div className="bg-white rounded-full px-3 py-1 flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span className="text-sm font-medium">{center.rating}</span>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{center.name}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{center.location} • {center.distance}</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Specialties:</p>
                <div className="flex flex-wrap gap-2">
                  {center.specialties.map((specialty, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  <span>{center.courses} courses</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  <span>{center.students} students</span>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <p>{center.address}</p>
                    <p>{center.phone}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                      View Details
                    </button>
                    <button className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {userProfile?.displayName}!
          </h1>
          <p className="text-gray-600 mt-2">Continue your learning journey</p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm p-1 mb-8">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'overview' 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center">
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Overview
              </div>
            </button>
            <button
              onClick={() => setActiveTab('courses')}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'courses' 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center">
                <Globe className="h-4 w-4 mr-2" />
                Online Courses
              </div>
            </button>
            <button
              onClick={() => setActiveTab('centers')}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'centers' 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center">
                <Building className="h-4 w-4 mr-2" />
                Training Centers
              </div>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'courses' && renderCourses()}
        {activeTab === 'centers' && renderCenters()}
      </div>
    </div>
  );
};

export default LearnerDashboard;