import React, { useState } from 'react';
import { Play, Clock, Users, Star, Award, BookOpen, Filter, Search, ChevronRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const CoursesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [completedCourses, setCompletedCourses] = useState<number[]>([]);

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
      price: '₦18,000',
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
      price: '₦20,000',
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
      price: '₦12,000',
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
      price: '₦20,000',
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
      price: '₦16,000',
      level: 'Beginner',
      image: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Learn fundamental carpentry skills and woodworking techniques',
      skills: ['Tool Usage', 'Wood Selection', 'Joinery', 'Finishing'],
      videoUrl: 'sample-carpentry-intro'
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Online Courses</h1>
              <p className="text-gray-600 mt-2">Master vocational skills with expert-led courses</p>
            </div>
            <Link 
              to="/dashboard/learner"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <ChevronRight className="h-4 w-4 mr-1 rotate-180" />
              Back to Dashboard
            </Link>
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
                  placeholder="Search courses, instructors, or skills..."
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
            />
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

interface CourseCardProps {
  course: any;
  isCompleted: boolean;
  onComplete: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, isCompleted, onComplete }) => {
  const [showDemo, setShowDemo] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

  const handleEnroll = () => {
    setIsEnrolled(true);
  };

  const handleWatchDemo = () => {
    setShowDemo(true);
  };

  const handleCompleteDemo = () => {
    setShowDemo(false);
    onComplete();
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
    </>
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

const getLevelColor = (level: string) => {
  switch (level) {
    case 'Beginner': return 'bg-green-100 text-green-800';
    case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
    case 'Advanced': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default CoursesPage;