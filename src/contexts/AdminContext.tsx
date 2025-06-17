import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { doc, getDoc, collection, query, where, getDocs, updateDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from './AuthContext';
import { 
  AdminUser, 
  UserManagement, 
  ProfessionalManagement, 
  TrainingCenterManagement, 
  ReportManagement,
  SystemStats 
} from '../types/admin';

interface AdminContextType {
  isAdmin: boolean;
  adminUser: AdminUser | null;
  loading: boolean;
  
  // User Management
  users: UserManagement[];
  loadUsers: () => Promise<void>;
  suspendUser: (uid: string, reason: string) => Promise<void>;
  deleteUser: (uid: string) => Promise<void>;
  
  // Professional Management
  professionals: ProfessionalManagement[];
  loadProfessionals: () => Promise<void>;
  verifyProfessional: (id: string, status: 'verified' | 'rejected', reason?: string) => Promise<void>;
  
  // Training Center Management
  trainingCenters: TrainingCenterManagement[];
  loadTrainingCenters: () => Promise<void>;
  updateTrainingCenter: (id: string, updates: Partial<TrainingCenterManagement>) => Promise<void>;
  deleteTrainingCenter: (id: string) => Promise<void>;
  
  // Reports Management
  reports: ReportManagement[];
  loadReports: () => Promise<void>;
  updateReportStatus: (id: string, status: ReportManagement['status'], resolution?: string) => Promise<void>;
  
  // System Stats
  systemStats: SystemStats | null;
  loadSystemStats: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  
  // State for admin data
  const [users, setUsers] = useState<UserManagement[]>([]);
  const [professionals, setProfessionals] = useState<ProfessionalManagement[]>([]);
  const [trainingCenters, setTrainingCenters] = useState<TrainingCenterManagement[]>([]);
  const [reports, setReports] = useState<ReportManagement[]>([]);
  const [systemStats, setSystemStats] = useState<SystemStats | null>(null);

  // Check if user is admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!currentUser) {
        setIsAdmin(false);
        setAdminUser(null);
        setLoading(false);
        return;
      }

      try {
        // First, check if user has admin role in Firestore
        const adminDoc = await getDoc(doc(db, 'admins', currentUser.uid));
        
        if (adminDoc.exists()) {
          const adminData = adminDoc.data() as AdminUser;
          setIsAdmin(true);
          setAdminUser(adminData);
          console.log('✅ Admin user found in database:', adminData.email);
        } else {
          // Check if this is a demo admin email
          const demoAdminEmails = [
            'admin@whogofixam.com',
            'test@admin.com',
            'admin@test.com',
            'superadmin@whogofixam.com'
          ];
          
          if (currentUser.email && demoAdminEmails.includes(currentUser.email.toLowerCase())) {
            console.log('🔧 Creating demo admin account for:', currentUser.email);
            
            const newAdmin: AdminUser = {
              uid: currentUser.uid,
              email: currentUser.email,
              displayName: currentUser.displayName || 'Admin User',
              role: currentUser.email.includes('superadmin') ? 'super-admin' : 'admin',
              permissions: [
                { resource: 'users', actions: ['read', 'write', 'delete'] },
                { resource: 'professionals', actions: ['read', 'write', 'approve'] },
                { resource: 'training-centers', actions: ['read', 'write', 'delete'] },
                { resource: 'reports', actions: ['read', 'write'] },
                { resource: 'system', actions: ['read'] }
              ],
              createdAt: new Date(),
              lastLogin: new Date()
            };
            
            // Save admin to Firestore
            await addDoc(collection(db, 'admins'), newAdmin);
            setIsAdmin(true);
            setAdminUser(newAdmin);
            
            console.log('✅ Demo admin account created successfully!');
          } else {
            setIsAdmin(false);
            setAdminUser(null);
            console.log('❌ User is not an admin:', currentUser.email);
          }
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
        setAdminUser(null);
      }
      
      setLoading(false);
    };

    checkAdminStatus();
  }, [currentUser]);

  // User Management Functions
  const loadUsers = async () => {
    try {
      const usersQuery = query(collection(db, 'users'));
      const usersSnapshot = await getDocs(usersQuery);
      const usersData = usersSnapshot.docs.map(doc => ({
        uid: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        lastLogin: doc.data().lastLogin?.toDate() || new Date()
      })) as UserManagement[];
      
      setUsers(usersData);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const suspendUser = async (uid: string, reason: string) => {
    try {
      await updateDoc(doc(db, 'users', uid), {
        status: 'suspended',
        suspensionReason: reason,
        suspendedAt: new Date()
      });
      await loadUsers();
    } catch (error) {
      console.error('Error suspending user:', error);
      throw error;
    }
  };

  const deleteUser = async (uid: string) => {
    try {
      await deleteDoc(doc(db, 'users', uid));
      await loadUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  };

  // Professional Management Functions
  const loadProfessionals = async () => {
    try {
      const professionalsQuery = query(collection(db, 'professionals'));
      const professionalsSnapshot = await getDocs(professionalsQuery);
      const professionalsData = professionalsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        registeredAt: doc.data().registeredAt?.toDate() || new Date(),
        verifiedAt: doc.data().verifiedAt?.toDate()
      })) as ProfessionalManagement[];
      
      setProfessionals(professionalsData);
    } catch (error) {
      console.error('Error loading professionals:', error);
    }
  };

  const verifyProfessional = async (id: string, status: 'verified' | 'rejected', reason?: string) => {
    try {
      const updateData: any = {
        verificationStatus: status,
        verifiedAt: new Date(),
        verifiedBy: adminUser?.uid
      };
      
      if (status === 'rejected' && reason) {
        updateData.rejectionReason = reason;
      }
      
      await updateDoc(doc(db, 'professionals', id), updateData);
      await loadProfessionals();
    } catch (error) {
      console.error('Error verifying professional:', error);
      throw error;
    }
  };

  // Training Center Management Functions
  const loadTrainingCenters = async () => {
    try {
      const centersQuery = query(collection(db, 'training-centers'));
      const centersSnapshot = await getDocs(centersQuery);
      const centersData = centersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        verifiedAt: doc.data().verifiedAt?.toDate()
      })) as TrainingCenterManagement[];
      
      setTrainingCenters(centersData);
    } catch (error) {
      console.error('Error loading training centers:', error);
    }
  };

  const updateTrainingCenter = async (id: string, updates: Partial<TrainingCenterManagement>) => {
    try {
      await updateDoc(doc(db, 'training-centers', id), updates);
      await loadTrainingCenters();
    } catch (error) {
      console.error('Error updating training center:', error);
      throw error;
    }
  };

  const deleteTrainingCenter = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'training-centers', id));
      await loadTrainingCenters();
    } catch (error) {
      console.error('Error deleting training center:', error);
      throw error;
    }
  };

  // Reports Management Functions
  const loadReports = async () => {
    try {
      const reportsQuery = query(collection(db, 'reports'));
      const reportsSnapshot = await getDocs(reportsQuery);
      const reportsData = reportsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        resolvedAt: doc.data().resolvedAt?.toDate()
      })) as ReportManagement[];
      
      setReports(reportsData);
    } catch (error) {
      console.error('Error loading reports:', error);
    }
  };

  const updateReportStatus = async (id: string, status: ReportManagement['status'], resolution?: string) => {
    try {
      const updateData: any = {
        status,
        updatedAt: new Date()
      };
      
      if (status === 'resolved' && resolution) {
        updateData.resolution = resolution;
        updateData.resolvedAt = new Date();
      }
      
      await updateDoc(doc(db, 'reports', id), updateData);
      await loadReports();
    } catch (error) {
      console.error('Error updating report status:', error);
      throw error;
    }
  };

  // System Stats Functions
  const loadSystemStats = async () => {
    try {
      // This would typically be calculated server-side or cached
      // For demo purposes, we'll calculate basic stats
      const stats: SystemStats = {
        totalUsers: users.length,
        totalProfessionals: professionals.length,
        totalTrainingCenters: trainingCenters.length,
        pendingVerifications: professionals.filter(p => p.verificationStatus === 'pending').length,
        activeReports: reports.filter(r => r.status === 'pending' || r.status === 'investigating').length,
        monthlyGrowth: {
          users: Math.floor(Math.random() * 50) + 10,
          professionals: Math.floor(Math.random() * 20) + 5,
          completedJobs: Math.floor(Math.random() * 100) + 50
        },
        topSkills: [
          { skill: 'Plumbing', count: 45 },
          { skill: 'Electrical', count: 38 },
          { skill: 'Tailoring', count: 32 },
          { skill: 'Carpentry', count: 28 },
          { skill: 'Welding', count: 25 }
        ],
        topLocations: [
          { location: 'Lagos', count: 120 },
          { location: 'Abuja', count: 85 },
          { location: 'Kano', count: 67 },
          { location: 'Port Harcourt', count: 54 },
          { location: 'Ibadan', count: 48 }
        ]
      };
      
      setSystemStats(stats);
    } catch (error) {
      console.error('Error loading system stats:', error);
    }
  };

  const value: AdminContextType = {
    isAdmin,
    adminUser,
    loading,
    users,
    loadUsers,
    suspendUser,
    deleteUser,
    professionals,
    loadProfessionals,
    verifyProfessional,
    trainingCenters,
    loadTrainingCenters,
    updateTrainingCenter,
    deleteTrainingCenter,
    reports,
    loadReports,
    updateReportStatus,
    systemStats,
    loadSystemStats
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};