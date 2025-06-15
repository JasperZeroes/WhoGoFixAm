import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Star, Phone, MessageCircle, ChevronRight, Users, Award, Clock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AuthModal from '../../components/auth/AuthModal';

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

const ProfessionalsDirectoryPage: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [filteredProfessionals, setFilteredProfessionals] = useState<Professional[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');

  const skills = [
    'all', 'Plumbing', 'Electrical Work', 'Carpentry', 'Welding', 'Tailoring', 'Fashion Design',
    'Automotive Repair', 'Masonry', 'Painting', 'Roofing', 'HVAC', 'Electronics Repair',
    'Hair Styling', 'Makeup Artistry', 'Catering', 'Photography', 'Web Development',
    'Graphic Design', 'Teaching/Tutoring', 'Cleaning Services', 'Landscaping', 'Security'
  ];

  const locations = [
    'all', 'Lagos', 'Abuja', 'Kano', 'Ibadan', 'Port Harcourt', 'Benin City', 'Kaduna',
    'Enugu', 'Ilorin', 'Aba', 'Jos', 'Warri', 'Calabar', 'Akure', 'Owerri'
  ];

  useEffect(() => {
    // Load professionals from localStorage
    const storedProfessionals = JSON.parse(localStorage.getItem('professionals') || '[]');
    
    // Add some sample professionals if none exist
    if (storedProfessionals.length === 0) {
      const sampleProfessionals = [
        {
          id: 1,
          fullName: 'Alhaji Musa Ibrahim',
          skill: 'Plumbing',
          state: 'Lagos',
          city: 'Ikeja',
          yearsExperience: '5-10',
          hourlyRate: '8000',
          photo: 'https://images.pexels.com/photos/5691659/pexels-photo-5691659.jpeg?auto=compress&cs=tinysrgb&w=400',
          bio: 'Experienced plumber specializing in residential and commercial installations. Expert in pipe fitting, leak detection, and water system maintenance.',
          rating: 4.8,
          reviewCount: 45,
          completedJobs: 120,
          availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          phone: '+234 801 234 5678',
          whatsapp: '+234 801 234 5678',
          certifications: 'COREN Certified',
          registeredAt: '2024-01-10'
        },
        {
          id: 2,
          fullName: 'Mrs. Adunni Fashola',
          skill: 'Tailoring',
          state: 'Lagos',
          city: 'Victoria Island',
          yearsExperience: '3-5',
          hourlyRate: '5000',
          photo: 'https://images.pexels.com/photos/5710186/pexels-photo-5710186.jpeg?auto=compress&cs=tinysrgb&w=400',
          bio: 'Professional tailor with expertise in traditional and modern clothing. Specializing in wedding dresses, corporate wear, and alterations.',
          rating: 4.9,
          reviewCount: 32,
          completedJobs: 85,
          availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          phone: '+234 802 345 6789',
          whatsapp: '+234 802 345 6789',
          certifications: 'Fashion Institute Certified',
          registeredAt: '2024-01-15'
        },
        {
          id: 3,
          fullName: 'Engineer Chukwudi Okafor',
          skill: 'Electrical Work',
          state: 'Enugu',
          city: 'Enugu',
          yearsExperience: '10+',
          hourlyRate: '12000',
          photo: 'https://images.pexels.com/photos/5691661/pexels-photo-5691661.jpeg?auto=compress&cs=tinysrgb&w=400',
          bio: 'Master electrician with over 15 years of experience. Specialized in industrial electrical systems, home wiring, and solar installations.',
          rating: 4.7,
          reviewCount: 67,
          completedJobs: 200,
          availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          phone: '+234 803 456 7890',
          whatsapp: '+234 803 456 7890',
          certifications: 'COREN, NECA Certified',
          registeredAt: '2024-01-08'
        },
        {
          id: 4,
          fullName: 'Mama Hauwa Yusuf',
          skill: 'Hair Styling',
          state: 'Kano',
          city: 'Kano',
          yearsExperience: '3-5',
          hourlyRate: '6000',
          photo: 'https://images.pexels.com/photos/5710190/pexels-photo-5710190.jpeg?auto=compress&cs=tinysrgb&w=400',
          bio: 'Creative hair stylist specializing in natural hair care, braiding, and modern styling techniques. Mobile service available.',
          rating: 4.9,
          reviewCount: 28,
          completedJobs: 95,
          availability: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          phone: '+234 804 567 8901',
          whatsapp: '+234 804 567 8901',
          certifications: 'Beauty Academy Certified',
          registeredAt: '2024-01-20'
        },
        {
          id: 5,
          fullName: 'Chief Emeka Nwosu',
          skill: 'Carpentry',
          state: 'Rivers',
          city: 'Port Harcourt',
          yearsExperience: '5-10',
          hourlyRate: '7500',
          photo: 'https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg?auto=compress&cs=tinysrgb&w=400',
          bio: 'Skilled carpenter and furniture maker. Expert in custom furniture, kitchen cabinets, and home renovations. Quality craftsmanship guaranteed.',
          rating: 4.6,
          reviewCount: 38,
          completedJobs: 110,
          availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          phone: '+234 805 678 9012',
          whatsapp: '+234 805 678 9012',
          certifications: 'Woodworkers Guild Certified',
          registeredAt: '2024-01-12'
        },
        {
          id: 6,
          fullName: 'Oga Tunde Adebayo',
          skill: 'Catering',
          state: 'Oyo',
          city: 'Ibadan',
          yearsExperience: '3-5',
          hourlyRate: '4500',
          photo: 'https://images.pexels.com/photos/5710191/pexels-photo-5710191.jpeg?auto=compress&cs=tinysrgb&w=400',
          bio: 'Professional caterer specializing in Nigerian and continental cuisine. Perfect for events, parties, and corporate functions.',
          rating: 4.8,
          reviewCount: 52,
          completedJobs: 75,
          availability: ['Thursday', 'Friday', 'Saturday', 'Sunday'],
          phone: '+234 806 789 0123',
          whatsapp: '+234 806 789 0123',
          certifications: 'Culinary Institute Certified',
          registeredAt: '2024-01-18'
        }
      ];
      
      localStorage.setItem('professionals', JSON.stringify(sampleProfessionals));
      setProfessionals(sampleProfessionals);
    } else {
      setProfessionals(storedProfessionals);
    }
  }, []);

  useEffect(() => {
    let filtered = professionals.filter(professional => {
      const matchesSearch = professional.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           professional.skill.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           professional.city.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSkill = selectedSkill === 'all' || professional.skill === selectedSkill;
      const matchesLocation = selectedLocation === 'all' || professional.city === selectedLocation;
      
      return matchesSearch && matchesSkill && matchesLocation;
    });

    // Sort professionals
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'experience':
          return b.completedJobs - a.completedJobs;
        case 'price-low':
          return parseInt(a.hourlyRate) - parseInt(b.hourlyRate);
        case 'price-high':
          return parseInt(b.hourlyRate) - parseInt(a.hourlyRate);
        default:
          return 0;
      }
    });

    setFilteredProfessionals(filtered);
  }, [professionals, searchQuery, selectedSkill, selectedLocation, sortBy]);

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

  const handleJoinAsProfessional = () => {
    if (!currentUser) {
      // User not logged in, show auth modal
      setAuthMode('signup');
      setShowAuthModal(true);
    } else {
      // User is logged in, navigate directly to registration page
      navigate('/professionals/register');
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    // After successful auth, navigate to registration page
    navigate('/professionals/register');
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Skilled Professionals</h1>
                <p className="text-gray-600 mt-2">Find verified professionals for your needs</p>
              </div>
              <button 
                onClick={handleJoinAsProfessional}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Join as Professional
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search professionals, skills, or locations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Skill Filter */}
              <div>
                <select
                  value={selectedSkill}
                  onChange={(e) => setSelectedSkill(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {skills.map(skill => (
                    <option key={skill} value={skill}>
                      {skill === 'all' ? 'All Skills' : skill}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {locations.map(location => (
                    <option key={location} value={location}>
                      {location === 'all' ? 'All Locations' : location}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Sort Options */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <div className="flex items-center space-x-4">
                <Filter className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="rating">Highest Rated</option>
                  <option value="experience">Most Experienced</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
              <p className="text-sm text-gray-600">
                {filteredProfessionals.length} professional{filteredProfessionals.length !== 1 ? 's' : ''} found
              </p>
            </div>
          </div>

          {/* Professionals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfessionals.map((professional) => (
              <ProfessionalCard 
                key={professional.id} 
                professional={professional} 
                isAuthenticated={!!currentUser}
                onAuthRequired={() => {
                  setAuthMode('signup');
                  setShowAuthModal(true);
                }}
              />
            ))}
          </div>

          {filteredProfessionals.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No professionals found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
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

interface ProfessionalCardProps {
  professional: Professional;
  isAuthenticated: boolean;
  onAuthRequired: () => void;
}

const ProfessionalCard: React.FC<ProfessionalCardProps> = ({ professional, isAuthenticated, onAuthRequired }) => {
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

  const handleViewProfile = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault();
      onAuthRequired();
    }
  };

  const handleContact = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault();
      onAuthRequired();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Professional Photo */}
      <div className="relative">
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
          {professional.photo ? (
            <img 
              src={professional.photo} 
              alt={professional.fullName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
              <Users className="h-10 w-10 text-gray-500" />
            </div>
          )}
        </div>
        <div className="absolute top-4 right-4">
          <div className="bg-white rounded-full px-3 py-1 flex items-center shadow-sm">
            <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
            <span className="text-sm font-medium">{professional.rating}</span>
          </div>
        </div>
        <div className="absolute bottom-4 left-4">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {professional.skill}
          </span>
        </div>
      </div>

      {/* Professional Info */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-1">{professional.fullName}</h3>
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{professional.city}, {professional.state}</span>
          </div>
          {professional.certifications && (
            <div className="flex items-center text-green-600 mb-2">
              <Award className="h-4 w-4 mr-1" />
              <span className="text-sm">{professional.certifications}</span>
            </div>
          )}
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{professional.bio}</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4 text-center text-sm">
          <div>
            <p className="font-medium text-gray-900">{getExperienceText(professional.yearsExperience)}</p>
            <p className="text-gray-600">Experience</p>
          </div>
          <div>
            <p className="font-medium text-gray-900">{professional.completedJobs}</p>
            <p className="text-gray-600">Jobs Done</p>
          </div>
          <div>
            <p className="font-medium text-gray-900">{professional.reviewCount}</p>
            <p className="text-gray-600">Reviews</p>
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-4 text-center">
          <span className="text-2xl font-bold text-green-600">₦{parseInt(professional.hourlyRate).toLocaleString()}</span>
          <span className="text-gray-600">/hour</span>
        </div>

        {/* Availability */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Available:</p>
          <div className="flex flex-wrap gap-1">
            {professional.availability.slice(0, 3).map((day, index) => (
              <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                {day.slice(0, 3)}
              </span>
            ))}
            {professional.availability.length > 3 && (
              <span className="text-xs text-gray-500">+{professional.availability.length - 3} more</span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          {isAuthenticated ? (
            <Link
              to={`/professionals/${professional.id}`}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
            >
              View Profile
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          ) : (
            <button
              onClick={handleViewProfile}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
            >
              View Profile
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          )}
          
          <div className="grid grid-cols-2 gap-2">
            {isAuthenticated ? (
              <a
                href={`tel:${professional.phone}`}
                className="bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium flex items-center justify-center"
              >
                <Phone className="h-4 w-4 mr-1" />
                Call
              </a>
            ) : (
              <button
                onClick={handleContact}
                className="bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium flex items-center justify-center"
              >
                <Phone className="h-4 w-4 mr-1" />
                Call
              </button>
            )}
            
            {isAuthenticated ? (
              <a
                href={getWhatsAppLink(professional.whatsapp || professional.phone, professional.fullName)}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors text-sm font-medium flex items-center justify-center"
              >
                <MessageCircle className="h-4 w-4 mr-1" />
                WhatsApp
              </a>
            ) : (
              <button
                onClick={handleContact}
                className="bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors text-sm font-medium flex items-center justify-center"
              >
                <MessageCircle className="h-4 w-4 mr-1" />
                WhatsApp
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
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
              Join WhoGoFixAm to Connect with Professionals
            </h3>
            <p className="text-gray-600">
              Create an account to view professional profiles, contact details, and book services.
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => {
                onClose();
                // Trigger signup modal - you'll need to implement this
                window.location.href = '/#signup';
              }}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Sign Up Now
            </button>
            <button
              onClick={() => {
                onClose();
                // Trigger login modal - you'll need to implement this
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

export default ProfessionalsDirectoryPage;