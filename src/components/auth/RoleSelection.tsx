import React, { useState } from 'react';
import { BookOpen, Users, Wrench, ArrowRight, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types/user';

interface RoleSelectionProps {
  isOpen: boolean;
  onComplete: () => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ isOpen, onComplete }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { setUserRole } = useAuth();

  if (!isOpen) return null;

  const roles = [
    {
      id: 'learner' as UserRole,
      title: 'Learner',
      description: 'I want to learn new skills from experts in my community',
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      selectedBg: 'bg-blue-100',
      selectedBorder: 'border-blue-500'
    },
    {
      id: 'skilled-professional' as UserRole,
      title: 'Skilled Professional',
      description: 'I want to teach skills and offer my expertise to others',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      selectedBg: 'bg-green-100',
      selectedBorder: 'border-green-500'
    },
    {
      id: 'customer' as UserRole,
      title: 'Customer',
      description: 'I need help fixing problems and finding solutions',
      icon: Wrench,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      selectedBg: 'bg-orange-100',
      selectedBorder: 'border-orange-500'
    }
  ];

  const handleRoleSubmit = async () => {
    if (!selectedRole) return;
    
    setLoading(true);
    setError('');
    
    try {
      // Set the role
      await setUserRole(selectedRole);
      
      // Complete immediately without waiting
      onComplete();
    } catch (error: any) {
      console.error('Error setting user role:', error);
      setError('Failed to set role. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            Choose Your Role
          </h2>
          <p className="text-gray-600 text-center mt-2">
            Select how you'd like to use WhoGoFixAm
          </p>
        </div>

        <div className="p-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                disabled={loading}
                className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left disabled:opacity-50 disabled:cursor-not-allowed ${
                  selectedRole === role.id
                    ? `${role.selectedBg} ${role.selectedBorder}`
                    : `${role.bgColor} ${role.borderColor} hover:${role.selectedBg}`
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${role.bgColor}`}>
                    <role.icon className={`h-6 w-6 ${role.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {role.title}
                    </h3>
                    <p className="text-gray-600">
                      {role.description}
                    </p>
                  </div>
                  {selectedRole === role.id && (
                    <div className={`p-1 rounded-full ${role.selectedBg}`}>
                      <CheckCircle className={`w-5 h-5 ${role.color}`} />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={handleRoleSubmit}
              disabled={!selectedRole || loading}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Setting up...</span>
                </>
              ) : (
                <>
                  <span>Continue</span>
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;