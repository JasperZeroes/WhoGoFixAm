import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Users, Wrench, ArrowRight, Star, Shield, Clock, LayoutDashboard, CheckCircle } from 'lucide-react';
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
      title: 'Learn a Skill',
      description: 'Empower yourself by learning hands-on vocational skills that can earn you real income. Whether you prefer online learning or want to visit a physical training center, WhoGoFixAm gives you access to skill-building opportunities.',
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
      cta: '🎓 Start with a free sample lesson or locate a verified center near you to begin your journey.'
    },
    {
      icon: Wrench,
      title: 'Need a Fix?',
      description: 'Get quick access to skilled professionals around you for any job — from home repairs to personal grooming. WhoGoFixAm helps you find trusted experts ready to help.',
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
      cta: '🔍 Use filters to search by location or skill — then call or message a professional directly.'
    },
    {
      icon: Users,
      title: 'Offer a Service',
      description: 'Are you a skilled professional? Get more customers by listing your services on WhoGoFixAm. Reach people looking for the exact skills you have.',
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

  const benefits = [
    {
      icon: Star,
      title: 'Quality Assured',
      description: 'All service providers are verified and rated by the community'
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'Safe and secure transactions with built-in protection'
    },
    {
      icon: Clock,
      title: 'Quick Response',
      description: 'Get matched with the right person in minutes, not hours'
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
        primary: { text: 'Start Learning', link: '/learn' },
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
          primary: { text: 'Start Learning', link: '/learn' },
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
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              {currentUser && userProfile && (
                <div className="mb-6">
                  <p className="text-blue-100 text-lg">
                    Welcome back, {userProfile.displayName || currentUser.email}!
                  </p>
                  {userProfile.role && (
                    <p className="text-blue-200 text-sm">
                      You're registered as a {userProfile.role.replace('-', ' ')}
                    </p>
                  )}
                </div>
              )}
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Connect. Learn. Fix.
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
                The community platform where skills meet needs. Learn from experts, 
                offer your services, or find someone to fix your problems.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate(cta.primary.link)}
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg flex items-center justify-center"
                >
                  {currentUser && userProfile?.role && (
                    <LayoutDashboard className="h-5 w-5 mr-2" />
                  )}
                  {cta.primary.text}
                </button>
                <Link
                  to={cta.secondary.link}
                  className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200"
                >
                  {cta.secondary.text}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                How WhoGoFixAm Works
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Three simple ways to connect with your community and get things done
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8"
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-lg ${feature.bgColor} mb-6`}>
                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Skills List */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      {feature.title === 'Learn a Skill' ? 'What You Can Learn:' : 
                       feature.title === 'Need a Fix?' ? 'Professionals You Can Find:' : 
                       'Skills You Can Offer:'}
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

                  {feature.title === 'Offer a Service' ? (
                    <button
                      onClick={handleOfferServiceClick}
                      className={`w-full ${feature.color.replace('text-', 'bg-')} text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-all duration-200 flex items-center justify-center group`}
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                  ) : (
                    <Link
                      to={feature.link}
                      className={`w-full ${feature.color.replace('text-', 'bg-')} text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-all duration-200 flex items-center justify-center group`}
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose WhoGoFixAm?
              </h2>
              <p className="text-xl text-gray-600">
                Built by the community, for the community
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-gray-100 mb-6">
                    <benefit.icon className="h-8 w-8 text-gray-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of community members already connecting and helping each other
            </p>
            <Link
              to="/professionals/directory"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg inline-flex items-center"
            >
              Find Help Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
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