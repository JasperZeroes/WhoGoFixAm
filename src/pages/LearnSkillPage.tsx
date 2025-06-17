import React, { useState } from 'react';
import { Play, Clock, Users, Star, Award, BookOpen, Filter, Search, ChevronRight, CheckCircle, User, ArrowRight, Heart, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from '../components/auth/AuthModal';

const LearnSkillPage: React.FC = () => {
  const { currentUser, userProfile } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [completedCourses, setCompletedCourses] = useState<number[]>([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');

  const categories = [
    { id: 'all', name: 'All Categories', count: 24 },
    { id: 'plumbing', name: 'Plumbing', count: 6 },
    { id: 'tailoring', name: 'Tailoring', count: 4 },
    { id: 'welding', name: 'Welding', count: 5 },
    { id: 'electrical', name: 'Electrical', count: 4 },
    { id: 'carpentry', name: 'Carpentry', count: 3 },
    { id: 'automotive', name: 'Automotive', count: 2 }
  ];

  const courses = [
    {
      id: 1,
      title: 'Complete Plumbing Fundamentals',
      instructor: 'Alhaji Musa Ibrahim',
      category: 'plumbing',
      duration: '8 hours',
      lessons: 24,
      students: 85,
      rating: 4.9,
      price: '₦15,000',
      level: 'Beginner',
      image: 'https://images.pexels.com/photos/5691659/pexels-photo-5691659.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Learn essential plumbing skills from pipe installation to leak repairs',
      skills: ['Pipe Installation', 'Leak Detection', 'Fixture Repair', 'Water Systems'],
      videoUrl: 'sample-plumbing-intro'
    },
    {
      id: 2,
      title: 'Professional Tailoring Masterclass',
      instructor: 'Mrs. Adunni Fashola',
      category: 'tailoring',
      duration: '12 hours',
      lessons: 36,
      students: 67,
      rating: 4.8,
      price: '₦25,000',
      level: 'Intermediate',
      image: 'https://images.pexels.com/photos/5710186/pexels-photo-5710186.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Master the art of tailoring from measurements to finished garments',
      skills: ['Pattern Making', 'Fabric Selection', 'Sewing Techniques', 'Alterations'],
      videoUrl: 'sample-tailoring-intro'
    },
    {
      id: 3,
      title: 'Welding Techniques & Safety',
      instructor: 'Engineer Chukwudi Okafor',
      category: 'welding',
      duration: '10 hours',
      lessons: 28,
      students: 45,
      rating: 4.9,
      price: '₦30,000',
      level: 'Beginner',
      image: 'https://images.pexels.com/photos/5691662/pexels-photo-5691662.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Learn safe welding practices and master different welding techniques',
      skills: ['Arc Welding', 'MIG Welding', 'Safety Protocols', 'Metal Preparation'],
      videoUrl: 'sample-welding-intro'
    },
    {
      id: 4,
      title: 'Electrical Wiring Basics',
      instructor: 'Mallam Abdullahi Kano',
      category: 'electrical',
      duration: '6 hours',
      lessons: 18,
      students: 92,
      rating: 4.7,
      price: '₦18,000',
      level: 'Beginner',
      image: 'https://images.pexels.com/photos/5691661/pexels-photo-5691661.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Understand electrical systems and learn basic wiring techniques',
      skills: ['Circuit Design', 'Wire Installation', 'Safety Standards', 'Troubleshooting'],
      videoUrl: 'sample-electrical-intro'
    },
    {
      id: 5,
      title: 'Advanced Plumbing Systems',
      instructor: 'Alhaji Musa Ibrahim',
      category: 'plumbing',
      duration: '15 hours',
      lessons: 42,
      students: 34,
      rating: 4.9,
      price: '₦45,000',
      level: 'Advanced',
      image: 'https://images.pexels.com/photos/5691659/pexels-photo-5691659.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Master complex plumbing installations and commercial systems',
      skills: ['Commercial Systems', 'Pipe Welding', 'System Design', 'Code Compliance'],
      videoUrl: 'sample-advanced-plumbing'
    },
    {
      id: 6,
      title: 'Carpentry Workshop Essentials',
      instructor: 'Chief Emeka Nwosu',
      category: 'carpentry',
      duration: '14 hours',
      lessons: 35,
      students: 58,
      rating: 4.8,
      price: '₦22,000',
      level: 'Beginner',
      image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Learn fundamental carpentry skills and woodworking techniques',
      skills: ['Tool Usage', 'Wood Selection', 'Joinery', 'Finishing'],
      videoUrl: 'sample-carpentry-intro'
    },
    {
      id: 7,
      title: 'Shoe Making & Repair',
      instructor: 'Oga Tunde Adebayo',
      category: 'crafts',
      duration: '10 hours',
      lessons: 25,
      students: 42,
      rating: 4.6,
      price: '₦20,000',
      level: 'Beginner',
      image: 'https://images.pexels.com/photos/5710187/pexels-photo-5710187.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Learn traditional and modern shoe making techniques',
      skills: ['Leather Working', 'Sole Attachment', 'Design', 'Repair Techniques'],
      videoUrl: 'sample-shoemaking-intro'
    },
    {
      id: 8,
      title: 'Beads Making & Jewelry Design',
      instructor: 'Mama Ngozi Okwu',
      category: 'crafts',
      duration: '8 hours',
      lessons: 20,
      students: 73,
      rating: 4.7,
      price: '₦12,000',
      level: 'Beginner',
      image: 'https://images.pexels.com/photos/5710188/pexels-photo-5710188.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Create beautiful jewelry and decorative items with beads',
      skills: ['Bead Selection', 'Pattern Design', 'Stringing', 'Finishing'],
      videoUrl: 'sample-beads-intro'
    },
    {
      id: 9,
      title: 'Professional Photography',
      instructor: 'Mr. Kemi Adebisi',
      category: 'creative',
      duration: '12 hours',
      lessons: 30,
      students: 89,
      rating: 4.8,
      price: '₦35,000',
      level: 'Intermediate',
      image: 'https://images.pexels.com/photos/5710189/pexels-photo-5710189.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Master photography techniques for portraits, events, and commercial work',
      skills: ['Camera Settings', 'Composition', 'Lighting', 'Post-Processing'],
      videoUrl: 'sample-photography-intro'
    },
    {
      id: 10,
      title: 'Vehicle Repair & Maintenance',
      instructor: 'Alhaji Garba Sokoto',
      category: 'automotive',
      duration: '20 hours',
      lessons: 45,
      students: 56,
      rating: 4.9,
      price: '₦50,000',
      level: 'Intermediate',
      image: 'https://images.pexels.com/photos/5691663/pexels-photo-5691663.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Complete vehicle maintenance and repair course for cars and motorcycles',
      skills: ['Engine Diagnostics', 'Brake Systems', 'Electrical Systems', 'Preventive Maintenance'],
      videoUrl: 'sample-vehicle-intro'
    },
    {
      id: 11,
      title: 'Professional Barbing & Hair Styling',
      instructor: 'Baba Tony Ogundimu',
      category: 'beauty',
      duration: '16 hours',
      lessons: 38,
      students: 71,
      rating: 4.8,
      price: '₦28,000',
      level: 'Beginner',
      image: 'https://images.pexels.com/photos/5710190/pexels-photo-5710190.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Learn modern barbing techniques and hair styling for men and women',
      skills: ['Cutting Techniques', 'Styling', 'Beard Grooming', 'Customer Service'],
      videoUrl: 'sample-barbing-intro'
    },
    {
      id: 12,
      title: 'Catering & Food Business',
      instructor: 'Mama Hauwa Yusuf',
      category: 'culinary',
      duration: '18 hours',
      lessons: 40,
      students: 63,
      rating: 4.7,
      price: '₦32,000',
      level: 'Beginner',
      image: 'https://images.pexels.com/photos/5710191/pexels-photo-5710191.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Start your own catering business with Nigerian and continental cuisine',
      skills: ['Menu Planning', 'Food Safety', 'Costing', 'Event Catering'],
      videoUrl: 'sample-catering-intro'
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCourseComplete = (courseId: number) => {
    setCompletedCourses(prev => [...prev, courseId]);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const benefits = [
    {
      icon: Users,
      title: 'Learn from Locals',
      description: 'Connect with skilled people wey dey your area — people wey understand your hustle'
    },
    {
      icon: Clock,
      title: 'Flexible Schedule',
      description: 'Learn when e convenient for you — morning, afternoon, or night. Your time, your pace'
    },
    {
      icon: Star,
      title: 'Quality Instructors',
      description: 'All our instructors na verified professionals wey community don rate well well'
    },
    {
      icon: Heart,
      title: 'Hands-on Learning',
      description: 'No just theory — you go practice the work with your hand until you sabi am proper'
    }
  ];

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
  };

  const checkLearnerAccess = () => {
    if (!currentUser) {
      return { hasAccess: false, reason: 'not-logged-in' };
    }
    
    if (!userProfile?.role || userProfile.role !== 'learner') {
      return { hasAccess: false, reason: 'wrong-role' };
    }
    
    return { hasAccess: true, reason: null };
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-blue-50 mb-6">
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Learn a New Skill
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              You wan learn handwork? You don come the right place! We get plenty skilled people wey go teach you proper proper. 
              From plumbing to tailoring, welding to barbing — make we help you learn wetin go put money for your pocket.
            </p>
          </div>

          {/* Benefits Section */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8 border-l-4 border-green-500">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Why You Go Love Learning with WhoGoFixAm</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-50 mb-4 group-hover:bg-blue-100 transition-colors">
                    <benefit.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for courses, instructors, or skills wey you wan learn..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex items-center space-x-4">
                <Filter className="h-5 w-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[200px]"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name} ({category.count})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <CourseCard 
                key={course.id} 
                course={course} 
                isCompleted={completedCourses.includes(course.id)}
                onComplete={() => handleCourseComplete(course.id)}
                onAuthRequired={(mode) => {
                  setAuthMode(mode);
                  setShowAuthModal(true);
                }}
                checkAccess={checkLearnerAccess}
              />
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
              <p className="text-gray-600">Try adjust your search or filter — maybe wetin you dey find dey another category</p>
            </div>
          )}

          {/* Training Centers CTA */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 mt-12 border-l-4 border-green-500">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-green-200 mb-6">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-green-900 mb-4">
                You Prefer Hands-on Learning?
              </h2>
              <p className="text-green-700 mb-6 max-w-3xl mx-auto text-lg leading-relaxed">
                If you be person wey like touch and feel before you learn, visit our verified training centers. 
                You go get proper equipment, face-to-face teaching, and other students wey dey learn with you. 
                E dey sweet pass when you dey learn with people!
              </p>
              <Link
                to="/training-centers"
                className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors font-medium inline-flex items-center text-lg"
              >
                Find Training Centers Near Me
                <ChevronRight className="h-5 w-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
        initialMode={authMode}
      />
    </>
  );
};

interface CourseCardProps {
  course: any;
  isCompleted: boolean;
  onComplete: () => void;
  onAuthRequired: (mode: 'login' | 'signup') => void;
  checkAccess: () => { hasAccess: boolean; reason: string | null };
}

const CourseCard: React.FC<CourseCardProps> = ({ course, isCompleted, onComplete, onAuthRequired, checkAccess }) => {
  const [showDemo, setShowDemo] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showAccessDenied, setShowAccessDenied] = useState(false);

  const handleEnroll = () => {
    const access = checkAccess();
    if (!access.hasAccess) {
      setShowAccessDenied(true);
      return;
    }
    setIsEnrolled(true);
  };

  const handleWatchDemo = () => {
    const access = checkAccess();
    if (!access.hasAccess) {
      setShowAccessDenied(true);
      return;
    }
    setShowDemo(true);
  };

  const handleCompleteDemo = () => {
    setShowDemo(false);
    onComplete();
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
        {/* Course Image */}
        <div className="relative">
          <img 
            src={course.image} 
            alt={course.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
              {course.level}
            </span>
          </div>
          <div className="absolute top-4 right-4">
            {isCompleted ? (
              <div className="bg-green-500 rounded-full p-2">
                <Award className="h-4 w-4 text-white" />
              </div>
            ) : (
              <button
                onClick={handleWatchDemo}
                className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200"
              >
                <Play className="h-4 w-4 text-blue-600" />
              </button>
            )}
          </div>
          {isCompleted && (
            <div className="absolute inset-0 bg-green-500 bg-opacity-20 flex items-center justify-center">
              <div className="bg-white rounded-full p-3">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </div>
          )}
        </div>

        {/* Course Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded capitalize">
              {course.category}
            </span>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600 ml-1">{course.rating}</span>
            </div>
          </div>

          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{course.description}</p>

          {/* Skills */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {course.skills.slice(0, 3).map((skill: string, index: number) => (
                <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                  {skill}
                </span>
              ))}
              {course.skills.length > 3 && (
                <span className="text-xs text-gray-500">+{course.skills.length - 3} more</span>
              )}
            </div>
          </div>

          {/* Course Stats */}
          <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center">
              <BookOpen className="h-4 w-4 mr-1" />
              <span>{course.lessons} lessons</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>{course.students}</span>
            </div>
          </div>

          {/* Instructor and Price */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600">by {course.instructor}</p>
            </div>
            <div className="text-right">
              <span className="text-lg font-bold text-gray-900">{course.price}</span>
            </div>
          </div>

          {/* Action Button */}
          <div className="space-y-2">
            {isCompleted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                <div className="flex items-center justify-center text-green-700">
                  <Award className="h-5 w-5 mr-2" />
                  <span className="font-medium">Course Completed!</span>
                </div>
                <p className="text-sm text-green-600 mt-1">Badge earned</p>
              </div>
            ) : isEnrolled ? (
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Continue Learning
              </button>
            ) : (
              <button
                onClick={handleEnroll}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Enroll Now
              </button>
            )}
            <button
              onClick={handleWatchDemo}
              className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm"
            >
              Watch Demo
            </button>
          </div>
        </div>
      </div>

      {/* Demo Modal */}
      {showDemo && (
        <DemoModal 
          course={course} 
          onClose={() => setShowDemo(false)}
          onComplete={handleCompleteDemo}
        />
      )}

      {/* Access Denied Modal */}
      {showAccessDenied && (
        <AccessDeniedModal 
          onClose={() => setShowAccessDenied(false)}
          onAuthRequired={onAuthRequired}
          checkAccess={checkAccess}
        />
      )}
    </>
  );
};

interface AccessDeniedModalProps {
  onClose: () => void;
  onAuthRequired: (mode: 'login' | 'signup') => void;
  checkAccess: () => { hasAccess: boolean; reason: string | null };
}

const AccessDeniedModal: React.FC<AccessDeniedModalProps> = ({ onClose, onAuthRequired, checkAccess }) => {
  const access = checkAccess();
  
  const getContent = () => {
    switch (access.reason) {
      case 'not-logged-in':
        return {
          title: 'Login Required',
          message: 'Oga/Madam, you need create account or login as Learner make you fit access courses and demos. E no hard at all!',
          actions: [
            { 
              text: 'Sign Up as Learner', 
              action: () => {
                onClose();
                onAuthRequired('signup');
              }, 
              primary: true 
            },
            { 
              text: 'Login', 
              action: () => {
                onClose();
                onAuthRequired('login');
              }, 
              primary: false 
            }
          ]
        };
      case 'wrong-role':
        return {
          title: 'Learner Account Required',
          message: 'You need register or login as Learner make you fit access this page. Create learner account make you fit enroll for courses and watch demos.',
          actions: [
            { 
              text: 'Create Learner Account', 
              action: () => {
                onClose();
                onAuthRequired('signup');
              }, 
              primary: true 
            },
            { 
              text: 'Browse Professionals', 
              action: () => {
                onClose();
                window.location.href = '/professionals/directory';
              }, 
              primary: false 
            }
          ]
        };
      default:
        return {
          title: 'Access Denied',
          message: 'You need register or login as Learner make you fit access this page.',
          actions: [
            { 
              text: 'Sign Up as Learner', 
              action: () => {
                onClose();
                onAuthRequired('signup');
              }, 
              primary: true 
            }
          ]
        };
    }
  };

  const content = getContent();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">{content.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          <div className="text-center mb-6">
            <div className="bg-red-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <User className="h-10 w-10 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Access Denied</h3>
            <p className="text-gray-600">{content.message}</p>
          </div>

          <div className="space-y-3">
            {content.actions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className={`w-full py-3 rounded-lg transition-colors font-medium flex items-center justify-center ${
                  action.primary
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {action.text}
                {action.primary && <ArrowRight className="h-4 w-4 ml-2" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface DemoModalProps {
  course: any;
  onClose: () => void;
  onComplete: () => void;
}

const DemoModal: React.FC<DemoModalProps> = ({ course, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [hasWatched, setHasWatched] = useState(false);

  const demoContent = [
    {
      type: 'video',
      title: 'Course Introduction',
      content: `Welcome to ${course.title}! In this comprehensive course, you'll learn ${course.description.toLowerCase()}.`,
      duration: '2:30'
    },
    {
      type: 'text',
      title: 'What You\'ll Learn',
      content: course.skills.join(', '),
      points: course.skills
    },
    {
      type: 'text',
      title: 'Course Structure',
      content: `This course contains ${course.lessons} lessons spread across ${course.duration} of content.`,
      points: [
        'Hands-on practical exercises',
        'Real-world project examples',
        'Expert instructor guidance',
        'Certificate upon completion'
      ]
    }
  ];

  const handleNext = () => {
    if (currentStep < demoContent.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setHasWatched(true);
    }
  };

  const handleComplete = () => {
    onComplete();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Course Demo: {course.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          {!hasWatched ? (
            <div className="space-y-6">
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / demoContent.length) * 100}%` }}
                />
              </div>

              {/* Demo Content */}
              <div className="min-h-[300px]">
                {demoContent[currentStep].type === 'video' ? (
                  <div className="bg-gray-900 rounded-lg p-8 text-center text-white">
                    <Play className="h-16 w-16 mx-auto mb-4 text-blue-400" />
                    <h3 className="text-xl font-semibold mb-2">{demoContent[currentStep].title}</h3>
                    <p className="text-gray-300 mb-4">{demoContent[currentStep].content}</p>
                    <div className="bg-blue-600 text-white px-4 py-2 rounded-lg inline-block">
                      Duration: {demoContent[currentStep].duration}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">{demoContent[currentStep].title}</h3>
                    <p className="text-gray-600">{demoContent[currentStep].content}</p>
                    {demoContent[currentStep].points && (
                      <ul className="space-y-2">
                        {demoContent[currentStep].points.map((point: string, index: number) => (
                          <li key={index} className="flex items-center text-gray-700">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="flex justify-between">
                <button
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className="px-4 py-2 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-500">
                  {currentStep + 1} of {demoContent.length}
                </span>
                <button
                  onClick={handleNext}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {currentStep === demoContent.length - 1 ? 'Finish Demo' : 'Next'}
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="bg-green-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Award className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Demo Completed!</h3>
              <p className="text-gray-600 mb-6">You've earned a demo completion badge</p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center text-green-700">
                  <Award className="h-6 w-6 mr-2" />
                  <span className="font-medium">Demo Completion Badge</span>
                </div>
                <p className="text-sm text-green-600 mt-1">Course: {course.title}</p>
              </div>
              <button
                onClick={handleComplete}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Continue to Course
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LearnSkillPage;