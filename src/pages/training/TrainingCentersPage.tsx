import React, { useState } from 'react';
import { MapPin, Star, Phone, Clock, Users, BookOpen, Search, Filter, ChevronRight, Navigation, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const TrainingCentersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  const skills = [
    'all', 'Plumbing', 'Tailoring', 'Welding', 'Electrical', 'Carpentry', 'Automotive', 'Masonry'
  ];

  const trainingCenters = [
    {
      id: 1,
      name: 'Lagos Technical Institute',
      skills: ['Plumbing', 'Electrical', 'Welding'],
      location: 'Victoria Island, Lagos',
      address: '15 Ahmadu Bello Way, Victoria Island, Lagos',
      phone: '+234 801 234 5678',
      rating: 4.8,
      students: 450,
      courses: 12,
      established: 2010,
      image: 'https://images.pexels.com/photos/5691664/pexels-photo-5691664.jpeg?auto=compress&cs=tinysrgb&w=400',
      distance: '2.3 km',
      openHours: 'Mon-Fri: 8AM-6PM, Sat: 9AM-4PM',
      facilities: ['Workshop', 'Library', 'Cafeteria', 'Parking'],
      certifications: ['NBTE Approved', 'ISO Certified'],
      description: 'Premier technical training institute offering hands-on vocational education with modern facilities and experienced instructors.',
      programs: [
        { name: 'Basic Plumbing', duration: '3 months', fee: '₦15,000' },
        { name: 'Electrical Installation', duration: '4 months', fee: '₦18,000' },
        { name: 'Welding & Fabrication', duration: '6 months', fee: '₦20,000' }
      ]
    },
    {
      id: 2,
      name: 'Abuja Skills Development Center',
      skills: ['Tailoring', 'Fashion Design', 'Carpentry'],
      location: 'Wuse 2, Abuja',
      address: '23 Adetokunbo Ademola Crescent, Wuse 2, Abuja',
      phone: '+234 802 345 6789',
      rating: 4.9,
      students: 320,
      courses: 8,
      established: 2015,
      image: 'https://images.pexels.com/photos/5691665/pexels-photo-5691665.jpeg?auto=compress&cs=tinysrgb&w=400',
      distance: '1.8 km',
      openHours: 'Mon-Sat: 9AM-5PM',
      facilities: ['Design Studio', 'Sewing Lab', 'Exhibition Hall', 'Student Lounge'],
      certifications: ['SMEDAN Certified', 'Fashion Council Approved'],
      description: 'Creative arts and fashion training center specializing in modern tailoring techniques and fashion design.',
      programs: [
        { name: 'Fashion Design Basics', duration: '4 months', fee: '₦16,000' },
        { name: 'Advanced Tailoring', duration: '6 months', fee: '₦20,000' },
        { name: 'Furniture Making', duration: '5 months', fee: '₦18,000' }
      ]
    },
    {
      id: 3,
      name: 'Port Harcourt Vocational Academy',
      skills: ['Automotive', 'Welding', 'Electrical'],
      location: 'GRA Phase 2, Port Harcourt',
      address: '12 Aba Road, GRA Phase 2, Port Harcourt',
      phone: '+234 803 456 7890',
      rating: 4.7,
      students: 280,
      courses: 10,
      established: 2012,
      image: 'https://images.pexels.com/photos/5691666/pexels-photo-5691666.jpeg?auto=compress&cs=tinysrgb&w=400',
      distance: '3.5 km',
      openHours: 'Mon-Fri: 7AM-7PM, Sat: 8AM-3PM',
      facilities: ['Auto Workshop', 'Welding Bay', 'Tool Library', 'Safety Training Room'],
      certifications: ['NECA Approved', 'Safety Council Certified'],
      description: 'Comprehensive automotive and industrial training facility with state-of-the-art equipment and industry partnerships.',
      programs: [
        { name: 'Auto Mechanics', duration: '8 months', fee: '₦25,000' },
        { name: 'Industrial Welding', duration: '6 months', fee: '₦22,000' },
        { name: 'Electrical Systems', duration: '5 months', fee: '₦20,000' }
      ]
    },
    {
      id: 4,
      name: 'Kano Artisan Training Hub',
      skills: ['Masonry', 'Carpentry', 'Plumbing'],
      location: 'Sabon Gari, Kano',
      address: '45 Ibrahim Taiwo Road, Sabon Gari, Kano',
      phone: '+234 804 567 8901',
      rating: 4.6,
      students: 380,
      courses: 9,
      established: 2008,
      image: 'https://images.pexels.com/photos/5691667/pexels-photo-5691667.jpeg?auto=compress&cs=tinysrgb&w=400',
      distance: '4.2 km',
      openHours: 'Mon-Thu: 8AM-6PM, Fri: 8AM-12PM, Sat: 9AM-4PM',
      facilities: ['Construction Lab', 'Material Store', 'Practice Sites', 'Equipment Room'],
      certifications: ['COREN Approved', 'Builders Association Certified'],
      description: 'Traditional and modern construction skills training center focusing on building trades and craftsmanship.',
      programs: [
        { name: 'Masonry & Bricklaying', duration: '4 months', fee: '₦14,000' },
        { name: 'Carpentry & Joinery', duration: '6 months', fee: '₦18,000' },
        { name: 'Plumbing Installation', duration: '3 months', fee: '₦12,000' }
      ]
    },
    {
      id: 5,
      name: 'Ibadan Creative Workshop',
      skills: ['Tailoring', 'Fashion Design', 'Textile'],
      location: 'Bodija, Ibadan',
      address: '8 University Road, Bodija, Ibadan',
      phone: '+234 805 678 9012',
      rating: 4.8,
      students: 220,
      courses: 6,
      established: 2018,
      image: 'https://images.pexels.com/photos/5691668/pexels-photo-5691668.jpeg?auto=compress&cs=tinysrgb&w=400',
      distance: '2.7 km',
      openHours: 'Mon-Fri: 9AM-6PM, Sat: 10AM-3PM',
      facilities: ['Design Studio', 'Pattern Room', 'Fabric Library', 'Fashion Lab'],
      certifications: ['Fashion Institute Approved', 'Creative Arts Council Certified'],
      description: 'Modern fashion and textile training center with focus on contemporary design and traditional craftsmanship.',
      programs: [
        { name: 'Fashion Design', duration: '5 months', fee: '₦20,000' },
        { name: 'Pattern Making', duration: '3 months', fee: '₦12,000' },
        { name: 'Textile Production', duration: '4 months', fee: '₦16,000' }
      ]
    },
    {
      id: 6,
      name: 'Enugu Technical College',
      skills: ['Electrical', 'Electronics', 'Automotive'],
      location: 'Independence Layout, Enugu',
      address: '25 Ogui Road, Independence Layout, Enugu',
      phone: '+234 806 789 0123',
      rating: 4.7,
      students: 340,
      courses: 11,
      established: 2011,
      image: 'https://images.pexels.com/photos/5691669/pexels-photo-5691669.jpeg?auto=compress&cs=tinysrgb&w=400',
      distance: '3.1 km',
      openHours: 'Mon-Fri: 8AM-6PM, Sat: 9AM-2PM',
      facilities: ['Electronics Lab', 'Auto Bay', 'Computer Lab', 'Testing Equipment'],
      certifications: ['NBTE Approved', 'Electronics Council Certified'],
      description: 'Advanced technical training in electrical and electronic systems with modern laboratory facilities.',
      programs: [
        { name: 'Electrical Installation', duration: '6 months', fee: '₦20,000' },
        { name: 'Electronics Repair', duration: '4 months', fee: '₦16,000' },
        { name: 'Auto Electrical', duration: '5 months', fee: '₦18,000' }
      ]
    }
  ];

  const filteredCenters = trainingCenters.filter(center => {
    const matchesSearch = center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         center.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         center.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSkill = selectedSkill === 'all' || center.skills.includes(selectedSkill);
    return matchesSearch && matchesSkill;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Training Centers</h1>
              <p className="text-gray-600 mt-2">Find physical training centers near you for hands-on learning</p>
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
                  placeholder="Search centers, locations, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[150px]"
              >
                {skills.map(skill => (
                  <option key={skill} value={skill}>
                    {skill === 'all' ? 'All Skills' : skill}
                  </option>
                ))}
              </select>

              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'map' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  Map
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Found {filteredCenters.length} training center{filteredCenters.length !== 1 ? 's' : ''}
            {selectedSkill !== 'all' && ` for ${selectedSkill}`}
          </p>
        </div>

        {/* Content */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredCenters.map((center) => (
              <TrainingCenterCard key={center.id} center={center} />
            ))}
          </div>
        ) : (
          <MapView centers={filteredCenters} />
        )}

        {filteredCenters.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No training centers found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

interface TrainingCenterCardProps {
  center: any;
}

const TrainingCenterCard: React.FC<TrainingCenterCardProps> = ({ center }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
        {/* Center Image */}
        <div className="relative">
          <img 
            src={center.image} 
            alt={center.name}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-4 right-4">
            <div className="bg-white rounded-full px-3 py-1 flex items-center shadow-sm">
              <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
              <span className="text-sm font-medium">{center.rating}</span>
            </div>
          </div>
          <div className="absolute bottom-4 left-4">
            <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {center.distance} away
            </div>
          </div>
        </div>

        {/* Center Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{center.name}</h3>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{center.location}</span>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Skills Offered:</p>
            <div className="flex flex-wrap gap-2">
              {center.skills.map((skill: string, index: number) => (
                <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
            <div className="text-center">
              <div className="flex items-center justify-center text-gray-400 mb-1">
                <Users className="h-4 w-4" />
              </div>
              <p className="font-medium text-gray-900">{center.students}</p>
              <p className="text-gray-600">Students</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center text-gray-400 mb-1">
                <BookOpen className="h-4 w-4" />
              </div>
              <p className="font-medium text-gray-900">{center.courses}</p>
              <p className="text-gray-600">Courses</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center text-gray-400 mb-1">
                <Award className="h-4 w-4" />
              </div>
              <p className="font-medium text-gray-900">{new Date().getFullYear() - center.established}</p>
              <p className="text-gray-600">Years</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="border-t pt-4 mb-4">
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <Phone className="h-4 w-4 mr-2" />
              <span>{center.phone}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-2" />
              <span>{center.openHours}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={() => setShowDetails(true)}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              View Details
            </button>
            <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium">
              Get Directions
            </button>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {showDetails && (
        <CenterDetailsModal 
          center={center} 
          onClose={() => setShowDetails(false)}
        />
      )}
    </>
  );
};

interface CenterDetailsModalProps {
  center: any;
  onClose: () => void;
}

const CenterDetailsModal: React.FC<CenterDetailsModalProps> = ({ center, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">{center.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Image */}
              <img 
                src={center.image} 
                alt={center.name}
                className="w-full h-64 object-cover rounded-lg"
              />

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">About</h3>
                <p className="text-gray-600">{center.description}</p>
              </div>

              {/* Facilities */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Facilities</h3>
                <div className="grid grid-cols-2 gap-2">
                  {center.facilities.map((facility: string, index: number) => (
                    <div key={index} className="flex items-center text-gray-600">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                      {facility}
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Certifications</h3>
                <div className="space-y-2">
                  {center.certifications.map((cert: string, index: number) => (
                    <div key={index} className="flex items-center text-green-700 bg-green-50 px-3 py-2 rounded-lg">
                      <Award className="h-4 w-4 mr-2" />
                      {cert}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Contact Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Address</p>
                      <p className="text-gray-600">{center.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Phone</p>
                      <p className="text-gray-600">{center.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Hours</p>
                      <p className="text-gray-600">{center.openHours}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Programs */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Available Programs</h3>
                <div className="space-y-3">
                  {center.programs.map((program: any, index: number) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{program.name}</h4>
                        <span className="text-lg font-bold text-blue-600">{program.fee}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Duration: {program.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Contact Center
                </button>
                <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center justify-center">
                  <Navigation className="h-4 w-4 mr-2" />
                  Get Directions
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MapView: React.FC<{ centers: any[] }> = ({ centers }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Map View</h3>
          <p className="text-gray-600 mb-4">Interactive map showing training center locations</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
            {centers.slice(0, 6).map((center, index) => (
              <div key={index} className="bg-white rounded-lg p-3 shadow-sm">
                <div className="flex items-center mb-2">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
                  <h4 className="font-medium text-sm">{center.name}</h4>
                </div>
                <p className="text-xs text-gray-600">{center.location}</p>
                <p className="text-xs text-blue-600">{center.distance}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingCentersPage;