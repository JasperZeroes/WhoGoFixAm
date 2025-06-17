import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Users, Wrench, ArrowRight, Star, Shield, Clock, LayoutDashboard, CheckCircle, Zap, MapPin, Phone, Heart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from '../components/auth/AuthModal';

const HomePage: React.FC = () => {
  const { currentUser, userProfile } = useAuth();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');

  const features = [
    {
      icon: BookOpen,
      title: 'I Wan Learn Work',
      pidginTitle: '👨🏽‍🏭 I wan learn work',
      description: 'You wan learn handwork? No wahala! From plumbing to tailoring, welding to barbing — we get plenty skilled people wey go teach you proper proper.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      link: '/learn',
      skills: [
        'Plumbing & Pipe Fitting',
        'Electrical Installation & Repairs', 
        'Welding & Metal Fabrication',
        'Tailoring & Fashion Design',
        'Hair Styling & Barbering',
        'Carpentry & Furniture Making',
        'Phone & Electronics Repair',
        'AC & Refrigerator Maintenance',
        'Makeup & Beauty Artistry',
        'Auto Mechanics'
      ],
      cta: '🎓 Start with free sample lesson or find verified center near you make you begin your journey.'
    },
    {
      icon: Wrench,
      title: 'I Need Person Wey Go Do Work',
      pidginTitle: '🏠 I need person wey go do work',
      description: 'Your tap spoil? Generator no dey start? You need person wey go fix am? We get plenty professionals wey dey ready to help you.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      link: '/professionals/directory',
      skills: [
        'Plumbers for leaks, pipe fixes, and installations',
        'Electricians for wiring, lighting, and faults',
        'Carpenters for furniture and fittings',
        'Tailors for clothing adjustments and custom wear',
        'Barbers and hairstylists for home services',
        'Appliance repairers for fridges, generators, etc.',
        'Phone and electronics technicians',
        'Makeup artists and beauty pros',
        'Mechanics for car servicing and fixes',
        'House painters and decorators'
      ],
      cta: '🔍 Use filter to search by location or skill — then call or message professional directly.'
    },
    {
      icon: Users,
      title: 'I Sabi Do Work',
      pidginTitle: '🧰 I sabi do work',
      description: 'You don learn work finish, you dey find customer? Create your profile, show wetin you sabi, get verified, and people go dey reach you directly.',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      link: '/professionals/register',
      skills: [
        'Plumbing',
        'Electrical works',
        'Welding',
        'Tailoring',
        'Hair Styling & Barbering',
        'Carpentry',
        'Electronics Repair',
        'AC/Fridge Repair',
        'Beauty & Makeup',
        'Mechanic services',
        'Painting & Decoration'
      ],
      cta: '📝 Sign up, create your profile, and let people in your area find and contact you for paid jobs.'
    }
  ];

  const howItWorks = [
    {
      step: '1️⃣',
      title: 'Pick Your Category',
      description: 'Choose wetin you want do — Learn, Do, or Find. We dey for you.',
      icon: Users
    },
    {
      step: '2️⃣', 
      title: 'Get Connected Sharp-Sharp',
      description: 'Browse plenty skilled people or centers wey sabi the work.',
      icon: Zap
    },
    {
      step: '3️⃣',
      title: 'Get the Work Done or Start to Learn',
      description: 'From carpentry to tailoring, plumbing to tech work, we go hook you up. No wahala.',
      icon: CheckCircle
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Na Trusted People Only',
      description: 'We dey verify ID and skills before we list anybody'
    },
    {
      icon: MapPin,
      title: 'Near Your Area',
      description: 'We go show you person wey dey close to you'
    },
    {
      icon: Phone,
      title: 'Easy to Contact',
      description: 'Call, message or chat directly — no long thing'
    },
    {
      icon: Heart,
      title: 'Community Feel',
      description: 'Like how neighbour dey refer better workman — na so we set am'
    }
  ];

  const getDashboardPath = () => {
    if (!userProfile?.role) return '/';
    
    switch (userProfile.role) {
      case 'learner':
        return '/dashboard/learner';
      case 'skilled-professional':
        return '/dashboard/professional';
      case 'customer':
        return '/dashboard/customer';
      default:
        return '/';
    }
  };

  const getPersonalizedCTA = () => {
    if (!currentUser || !userProfile?.role) {
      return {
        primary: { text: 'I Wan Learn Work', link: '/learn' },
        secondary: { text: 'Find Professionals', link: '/professionals/directory' }
      };
    }

    // If user has a role, show dashboard as primary CTA
    const dashboardCTA = { text: 'Go to Dashboard', link: getDashboardPath() };

    switch (userProfile.role) {
      case 'learner':
        return {
          primary: dashboardCTA,
          secondary: { text: 'Browse Skills', link: '/learn' }
        };
      case 'skilled-professional':
        return {
          primary: dashboardCTA,
          secondary: { text: 'View Directory', link: '/professionals/directory' }
        };
      case 'customer':
        return {
          primary: dashboardCTA,
          secondary: { text: 'Find Help Now', link: '/professionals/directory' }
        };
      default:
        return {
          primary: { text: 'I Wan Learn Work', link: '/learn' },
          secondary: { text: 'Find Professionals', link: '/professionals/directory' }
        };
    }
  };

  const handleOfferServiceClick = () => {
    if (!currentUser) {
      // User not logged in, show signup modal
      setAuthMode('signup');
      setShowAuthModal(true);
    } else if (userProfile?.role === 'skilled-professional') {
      // User is already a professional, go to registration page
      navigate('/professionals/register');
    } else {
      // User has a different role, show signup modal to create professional account
      setAuthMode('signup');
      setShowAuthModal(true);
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    // After successful auth, navigate to registration page
    navigate('/professionals/register');
  };

  const cta = getPersonalizedCTA();

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white relative overflow-hidden">
          {/* Nigerian Flag Colors Accent */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-500 via-white to-green-500"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full"></div>
              <div className="absolute top-32 right-20 w-16 h-16 border-2 border-white rounded-lg rotate-45"></div>
              <div className="absolute bottom-20 left-32 w-12 h-12 border-2 border-white rounded-full"></div>
            </div>

            <div className="text-center relative z-10">
              {currentUser && userProfile && (
                <div className="mb-6">
                  <p className="text-green-100 text-lg">
                    Welcome back, {userProfile.displayName || currentUser.email}!
                  </p>
                  {userProfile.role && (
                    <p className="text-green-200 text-sm">
                      You dey registered as {userProfile.role.replace('-', ' ')}
                    </p>
                  )}
                </div>
              )}
              
              <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                <span className="block text-yellow-300">You get work?</span>
                <span className="block">We sabi who go do am.</span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-green-100">
                Learn am. Do am. Fix am.
              </h2>
              <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-4xl mx-auto leading-relaxed">
                No worry, your plug don land! Whether you wan learn handwork, you sabi do work, 
                or you dey find person wey go help you fix something — WhoGoFixAm na your sure connect.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate(cta.primary.link)}
                  className="bg-yellow-500 text-green-800 px-8 py-4 rounded-lg font-bold hover:bg-yellow-400 transition-colors duration-200 shadow-lg flex items-center justify-center text-lg"
                >
                  {currentUser && userProfile?.role && (
                    <LayoutDashboard className="h-5 w-5 mr-2" />
                  )}
                  {cta.primary.text}
                </button>
                <Link
                  to={cta.secondary.link}
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-green-600 transition-colors duration-200 text-lg"
                >
                  {cta.secondary.text}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                💡 How E Dey Work
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Three simple steps to connect with your community
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {howItWorks.map((step, index) => (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6 group-hover:bg-green-200 transition-colors">
                    <span className="text-3xl">{step.step}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-lg">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Wetin You Fit Do For WhoGoFixAm
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Choose your path and make your hustle easier
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border-l-4 border-green-500"
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-lg ${feature.bgColor} mb-6`}>
                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    {feature.pidginTitle}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                    {feature.description}
                  </p>

                  {/* Skills List */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      {feature.title === 'I Wan Learn Work' ? 'Wetin You Fit Learn:' : 
                       feature.title === 'I Need Person Wey Go Do Work' ? 'Professionals Wey You Fit Find:' : 
                       'Skills Wey You Fit Offer:'}
                    </h4>
                    <div className="space-y-2">
                      {feature.skills.slice(0, 5).map((skill, skillIndex) => (
                        <div key={skillIndex} className="flex items-center text-sm text-gray-700">
                          <CheckCircle className={`h-4 w-4 mr-2 ${feature.color}`} />
                          <span>{skill}</span>
                        </div>
                      ))}
                      {feature.skills.length > 5 && (
                        <div className="text-sm text-gray-500 ml-6">
                          +{feature.skills.length - 5} more skills available
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className={`${feature.bgColor} rounded-lg p-4 mb-6`}>
                    <p className={`text-sm font-medium ${feature.color.replace('text-', 'text-').replace('-600', '-800')}`}>
                      {feature.cta}
                    </p>
                  </div>

                  {feature.title === 'I Sabi Do Work' ? (
                    <button
                      onClick={handleOfferServiceClick}
                      className={`w-full ${feature.color.replace('text-', 'bg-')} text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-all duration-200 flex items-center justify-center group`}
                    >
                      Start Dey Collect Work
                      <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                  ) : (
                    <Link
                      to={feature.link}
                      className={`w-full ${feature.color.replace('text-', 'bg-')} text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-all duration-200 flex items-center justify-center group`}
                    >
                      {feature.title === 'I Wan Learn Work' ? 'Start Learning' : 'Find Person Now'}
                      <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why WhoGoFixAm Section */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                ⭐ Why WhoGoFixAm?
              </h2>
              <p className="text-xl text-gray-600">
                Built by Nigerians, for Nigerians
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-green-100 mb-6 group-hover:bg-green-200 transition-colors">
                    <benefit.icon className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-lg">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Hustle?
            </h2>
            <p className="text-xl mb-8 text-green-100">
              Join thousands of Nigerians already connecting and helping each other
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/professionals/directory"
                className="bg-yellow-500 text-green-800 px-8 py-4 rounded-lg font-bold hover:bg-yellow-400 transition-colors duration-200 shadow-lg inline-flex items-center justify-center"
              >
                Find Person Wey Go Help Me
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/learn"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-green-600 transition-colors duration-200"
              >
                I Wan Learn Work
              </Link>
            </div>
          </div>
        </section>
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

export default HomePage;