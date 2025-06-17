export interface AdminUser {
  uid: string;
  email: string;
  displayName: string;
  role: 'admin' | 'super-admin';
  permissions: AdminPermission[];
  createdAt: Date;
  lastLogin: Date;
}

export interface AdminPermission {
  resource: 'users' | 'professionals' | 'training-centers' | 'reports' | 'system';
  actions: ('read' | 'write' | 'delete' | 'approve')[];
}

export interface UserManagement {
  uid: string;
  email: string;
  displayName: string;
  role: 'learner' | 'skilled-professional' | 'customer';
  status: 'active' | 'suspended' | 'banned';
  createdAt: Date;
  lastLogin: Date;
  profileComplete: boolean;
  verificationStatus: 'pending' | 'verified' | 'rejected';
}

export interface ProfessionalManagement {
  id: string;
  uid: string;
  fullName: string;
  email: string;
  phone: string;
  skill: string;
  state: string;
  city: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  verificationDocuments: string[];
  rating: number;
  reviewCount: number;
  completedJobs: number;
  registeredAt: Date;
  verifiedAt?: Date;
  verifiedBy?: string;
  rejectionReason?: string;
}

export interface TrainingCenterManagement {
  id: string;
  name: string;
  location: string;
  skills: string[];
  status: 'active' | 'suspended' | 'pending-review';
  verificationStatus: 'pending' | 'verified' | 'rejected';
  contactInfo: {
    phone: string;
    email: string;
    address: string;
  };
  facilities: string[];
  certifications: string[];
  createdAt: Date;
  verifiedAt?: Date;
}

export interface ReportManagement {
  id: string;
  reportType: 'user-complaint' | 'professional-dispute' | 'quality-issue' | 'fraud-report';
  reportedBy: string;
  reportedUser?: string;
  reportedProfessional?: string;
  description: string;
  status: 'pending' | 'investigating' | 'resolved' | 'dismissed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo?: string;
  createdAt: Date;
  resolvedAt?: Date;
  resolution?: string;
  evidence: string[];
}

export interface SystemStats {
  totalUsers: number;
  totalProfessionals: number;
  totalTrainingCenters: number;
  pendingVerifications: number;
  activeReports: number;
  monthlyGrowth: {
    users: number;
    professionals: number;
    completedJobs: number;
  };
  topSkills: Array<{ skill: string; count: number }>;
  topLocations: Array<{ location: string; count: number }>;
}