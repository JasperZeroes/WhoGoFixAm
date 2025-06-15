import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, MapPin, Star, Phone, MessageCircle, Award, Calendar, Clock, 
  Users, CheckCircle, Camera, Mail, Globe, Shield
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface Professional {
  id: number;
  fullName: string;
  skill: string;
  state: string;
  city: string;
  yearsExperience: string;
  hourlyRate: string;
  photo: string | null;
  bio: string;
  rating: number;
  reviewCount: number;
  completedJobs: number;
  availability: string[];
  phone: string;
  whatsapp: string;
  email: string;
  certifications: string;
  registeredAt: string;
}

interface Review {
  id: number;
  clientName: string;
  rating: number;
  comment: string;
  date: string;
  jobType: string;
}

const ProfessionalProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [professional, setProfessional] = useState<Professional | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews' | 'portfolio'>('overview');
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }

    // Load professional data
    const professionals = JSON.parse(localStorage.getItem('professionals') || '[]');
    const foundProfessional = professionals.find((p: Professional) => p.id === parseInt(id || '0'));
    
    if (foundProfessional) {
      setProfessional(foundProfessional);
      
      // Generate sample reviews with Nigerian names
      const sampleReviews: Review[] = [
        {
          id: 1,
          clientName: 'Mrs. Chioma Okeke',
          rating: 5,
          comment: 'Excellent work! Very professional and completed the job on time. Highly recommended.',
          date: '2024-01-20',
          jobType: 'Bathroom Plumbing'
        },
        {
          id: 2,
          clientName: 'Alhaji Bello Kano',
          rating: 4,
          comment: 'Good quality work. Professional and reliable. Will definitely hire again.',
          date: '2024-01-15',
          jobType: 'Kitchen Installation'
        },
        {
          id: 3,
          clientName: 'Miss Grace Eze',
          rating: 5,
          comment: 'Outstanding service! Fixed the problem quickly and explained everything clearly.',
          date: '2024-01-10',
          jobType: 'Pipe Repair'
        }
      ];
      setReviews(sampleReviews);
    }
    
    setLoading(false);
  }, [id, currentUser]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!professional) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Professional Not Found</h2>
          <p className="text-gray-600 mb-6">The professional you're looking for doesn't exist.</p>
          <Link
            to="/professionals/directory"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Directory
          </Link>
        </div>
      </div>
    );
  }

  const getExperienceText = (experience: string) => {
    switch (experience) {
      case '0-1': return 'Less than 1 year';
      case '1-3': return '1-3 years';
      case '3-5': return '3-5 years';
      case '5-10': return '5-10 years';
      case '10+': return '10+ years';
      default: return experience;
    }
  };

  const getWhatsAppLink = (phone: string, name: string) => {
    const cleanPhone = phone.replace(/\D/g, '');
    const message = encodeURIComponent(`Hi ${name}, I found your profile on WhoGoFixAm and I'm interested in your services.`);
    return `https://wa.me/${cleanPhone}?text=${message}`;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <div className="mb-6">
            <Link
              to="/professionals/directory"
              className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Directory
            </Link>
          </div>

          {/* Profile Header */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
            <div className="relative h-48 bg-gradient-to-r from-blue-600 to-blue-700">
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            </div>
            
            <div className="relative px-6 pb-6">
              {/* Profile Photo */}
              <div className="flex flex-col sm:flex-row items-start sm:items-end -mt-16 mb-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-white p-2 shadow-lg">
                    {professional.photo ? (
                      <img 
                        src={professional.photo} 
                        alt={professional.fullName}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                        <Users className="h-12 w-12 text-gray-500" />
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-2 right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
                </div>
                
                <div className="sm:ml-6 mt-4 sm:mt-0 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900">{professional.fullName}</h1>
                      <p className="text-xl text-blue-600 font-medium">{professional.skill}</p>
                      <div className="flex items-center mt-2 text-gray-600">
                        <MapPin className="h-5 w-5 mr-2" />
                        <span>{professional.city}, {professional.state}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 sm:mt-0 flex flex-col sm:items-end">
                      <div className="flex items-center mb-2">
                        {renderStars(Math.floor(professional.rating))}
                        <span className="ml-2 text-lg font-semibold text-gray-900">
                          {professional.rating}
                        </span>
                        <span className="ml-1 text-gray-600">
                          ({professional.reviewCount} reviews)
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-3xl font-bold text-green-600">
                          ₦{parseInt(professional.hourlyRate).toLocaleString()}
                        </span>
                        <span className="text-gray-600">/hour</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                <div className="text-center">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{getExperienceText(professional.yearsExperience)}</p>
                    <p className="text-gray-600">Experience</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-green-50 rounded-lg p-4">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{professional.completedJobs}</p>
                    <p className="text-gray-600">Jobs Completed</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{professional.reviewCount}</p>
                    <p className="text-gray-600">Reviews</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-purple-50 rounded-lg p-4">
                    <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">24h</p>
                    <p className="text-gray-600">Response Time</p>
                  </div>
                </div>
              </div>

              {/* Contact Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <a
                  href={`tel:${professional.phone}`}
                  className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Call Now
                </a>
                <a
                  href={getWhatsAppLink(professional.whatsapp || professional.phone, professional.fullName)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-colors font-medium flex items-center justify-center"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  WhatsApp
                </a>
                <button className="bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center justify-center">
                  <Mail className="h-5 w-5 mr-2" />
                  Send Message
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-white rounded-xl shadow-sm mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'overview'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'reviews'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Reviews ({professional.reviewCount})
                </button>
                <button
                  onClick={() => setActiveTab('portfolio')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'portfolio'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Portfolio
                </button>
              </nav>
            </div>

            <div className="p-6">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  {/* About */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">About</h3>
                    <p className="text-gray-700 leading-relaxed">{professional.bio}</p>
                  </div>

                  {/* Certifications */}
                  {professional.certifications && (
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Certifications</h3>
                      <div className="flex items-center bg-green-50 border border-green-200 rounded-lg p-4">
                        <Award className="h-6 w-6 text-green-600 mr-3" />
                        <span className="text-green-800 font-medium">{professional.certifications}</span>
                      </div>
                    </div>
                  )}

                  {/* Availability */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Availability</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                        <div
                          key={day}
                          className={`p-3 rounded-lg text-center ${
                            professional.availability.includes(day)
                              ? 'bg-green-100 text-green-800 border border-green-200'
                              : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {day}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                        <Phone className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <p className="font-medium text-gray-900">Phone</p>
                          <p className="text-gray-600">{professional.phone}</p>
                        </div>
                      </div>
                      {professional.whatsapp && (
                        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                          <MessageCircle className="h-5 w-5 text-gray-400 mr-3" />
                          <div>
                            <p className="font-medium text-gray-900">WhatsApp</p>
                            <p className="text-gray-600">{professional.whatsapp}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Reviews Tab */}
              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-900">Customer Reviews</h3>
                    <div className="flex items-center">
                      <div className="flex items-center mr-4">
                        {renderStars(Math.floor(professional.rating))}
                        <span className="ml-2 text-lg font-semibold text-gray-900">
                          {professional.rating} out of 5
                        </span>
                      </div>
                      <span className="text-gray-600">({professional.reviewCount} reviews)</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="font-medium text-gray-900">{review.clientName}</h4>
                            <p className="text-sm text-gray-600">{review.jobType}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center mb-1">
                              {renderStars(review.rating)}
                            </div>
                            <p className="text-sm text-gray-500">{review.date}</p>
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Portfolio Tab */}
              {activeTab === 'portfolio' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900">Portfolio</h3>
                  <div className="text-center py-12">
                    <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">Portfolio Coming Soon</h4>
                    <p className="text-gray-600">
                      {professional.fullName} is working on uploading their portfolio. 
                      Check back soon to see examples of their work!
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Trust & Safety */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-4">
              <Shield className="h-6 w-6 text-green-600 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900">Trust & Safety</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                <span className="text-gray-700">Identity Verified</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                <span className="text-gray-700">Background Checked</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                <span className="text-gray-700">Insured Professional</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Required Modal */}
      {showAuthModal && (
        <AuthRequiredModal onClose={() => navigate('/professionals/directory')} />
      )}
    </>
  );
};

interface AuthRequiredModalProps {
  onClose: () => void;
}

const AuthRequiredModal: React.FC<AuthRequiredModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Login Required</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          <div className="text-center mb-6">
            <div className="bg-blue-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <Users className="h-10 w-10 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Login Required to View Profile
            </h3>
            <p className="text-gray-600">
              Please create an account or login to view professional profiles and contact details.
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => {
                onClose();
                window.location.href = '/#signup';
              }}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Sign Up Now
            </button>
            <button
              onClick={() => {
                onClose();
                window.location.href = '/#login';
              }}
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Already have an account? Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalProfilePage;