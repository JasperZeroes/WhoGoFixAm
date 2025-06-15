import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User as FirebaseUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, enableNetwork, disableNetwork } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { UserProfile, UserRole } from '../types/user';

interface AuthContextType {
  currentUser: FirebaseUser | null;
  userProfile: UserProfile | null;
  loading: boolean;
  isOffline: boolean;
  signup: (email: string, password: string, displayName: string, role: UserRole) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setupRecaptcha: (containerId: string) => RecaptchaVerifier;
  signInWithPhone: (phoneNumber: string, recaptcha: RecaptchaVerifier) => Promise<ConfirmationResult>;
  setUserRole: (role: UserRole) => Promise<void>;
  refreshUserProfile: () => Promise<void>;
  retryConnection: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Cache keys for localStorage
const CACHE_KEYS = {
  USER_PROFILE: 'whogofixam_user_profile',
  LAST_SYNC: 'whogofixam_last_sync',
  CACHE_VERSION: 'whogofixam_cache_version',
  OFFLINE_MODE: 'whogofixam_offline_mode',
  USER_EXISTS: 'whogofixam_user_exists' // NEW: Track if user exists in Firestore
};

const CACHE_VERSION = '3.0'; // Updated version for persistent cache
const CACHE_DURATION = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds (much longer)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(false);
  const [cacheInitialized, setCacheInitialized] = useState(false);

  // Check if we're in offline mode
  const isInOfflineMode = () => {
    return !navigator.onLine || localStorage.getItem(CACHE_KEYS.OFFLINE_MODE) === 'true';
  };

  // Set offline mode
  const setOfflineMode = (offline: boolean) => {
    if (offline) {
      localStorage.setItem(CACHE_KEYS.OFFLINE_MODE, 'true');
    } else {
      localStorage.removeItem(CACHE_KEYS.OFFLINE_MODE);
    }
    setIsOffline(offline);
  };

  // Initialize cache version (only once)
  const initializeCache = () => {
    if (cacheInitialized) return;
    
    const cachedVersion = localStorage.getItem(CACHE_KEYS.CACHE_VERSION);
    if (cachedVersion !== CACHE_VERSION) {
      console.log('🔄 Cache version updated, clearing old cache');
      clearCache();
      localStorage.setItem(CACHE_KEYS.CACHE_VERSION, CACHE_VERSION);
    }
    setCacheInitialized(true);
  };

  // IMPROVED: Cache management functions with persistent storage
  const getCachedProfile = (uid: string): UserProfile | null => {
    try {
      console.log('🔍 Looking for cached profile for UID:', uid);
      
      const cacheKey = `${CACHE_KEYS.USER_PROFILE}_${uid}`;
      const cachedProfile = localStorage.getItem(cacheKey);
      
      if (cachedProfile) {
        try {
          const profile = JSON.parse(cachedProfile);
          // Convert date strings back to Date objects
          if (profile.createdAt) profile.createdAt = new Date(profile.createdAt);
          if (profile.updatedAt) profile.updatedAt = new Date(profile.updatedAt);
          
          console.log('✅ Found cached profile:', profile);
          return profile;
        } catch (parseError) {
          console.error('Error parsing cached profile:', parseError);
          localStorage.removeItem(cacheKey);
        }
      }
      
      console.log('❌ No cached profile found for UID:', uid);
      return null;
    } catch (error) {
      console.error('Error reading cached profile:', error);
      return null;
    }
  };

  const setCachedProfile = (profile: UserProfile): void => {
    try {
      const cacheKey = `${CACHE_KEYS.USER_PROFILE}_${profile.uid}`;
      localStorage.setItem(cacheKey, JSON.stringify(profile));
      localStorage.setItem(`${CACHE_KEYS.LAST_SYNC}_${profile.uid}`, Date.now().toString());
      
      // NEW: Mark that this user exists in Firestore
      localStorage.setItem(`${CACHE_KEYS.USER_EXISTS}_${profile.uid}`, 'true');
      
      console.log('💾 User profile cached successfully for UID:', profile.uid);
    } catch (error) {
      console.error('Error caching profile:', error);
    }
  };

  // NEW: Check if user exists in Firestore (based on cache)
  const userExistsInFirestore = (uid: string): boolean => {
    return localStorage.getItem(`${CACHE_KEYS.USER_EXISTS}_${uid}`) === 'true';
  };

  const clearCache = (): void => {
    try {
      // Clear all cache entries
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('whogofixam_') || key.startsWith('user_profile_')) {
          localStorage.removeItem(key);
        }
      });
      console.log('🗑️ Cache cleared');
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  };

  // CRITICAL: Don't clear user cache on logout - keep it for next login
  const clearUserCache = (uid: string): void => {
    try {
      // Only clear temporary data, keep the profile and existence flag
      const keysToRemove = [
        `${CACHE_KEYS.LAST_SYNC}_${uid}` // Clear sync time to force refresh on next login
        // NOTE: We keep USER_PROFILE and USER_EXISTS so user can login offline
      ];
      
      keysToRemove.forEach(key => localStorage.removeItem(key));
      console.log('🗑️ User session cache cleared for UID:', uid);
    } catch (error) {
      console.error('Error clearing user cache:', error);
    }
  };

  // Check if cache is fresh (within 30 days)
  const isCacheFresh = (uid: string): boolean => {
    try {
      const lastSync = localStorage.getItem(`${CACHE_KEYS.LAST_SYNC}_${uid}`);
      if (!lastSync) return false;
      
      const syncTime = parseInt(lastSync);
      const now = Date.now();
      return (now - syncTime) < CACHE_DURATION;
    } catch {
      return false;
    }
  };

  const signup = async (email: string, password: string, displayName: string, role: UserRole) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName });
      
      // Create user profile data
      const userProfileData: UserProfile = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        phoneNumber: userCredential.user.phoneNumber,
        displayName: displayName,
        role: role,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      // Set profile immediately for new users
      setUserProfile(userProfileData);
      setCachedProfile(userProfileData);
      
      // Try to save to Firestore in background (don't await)
      saveToFirestoreBackground(userCredential.user.uid, userProfileData);
      
      console.log('✅ New user created and profile set');
    } catch (error: any) {
      console.error('Signup error:', error);
      if (error.code === 'unavailable') {
        setOfflineMode(true);
      }
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Note: User profile will be loaded in the onAuthStateChanged listener
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.code === 'unavailable') {
        setOfflineMode(true);
      }
      throw error;
    }
  };

  const logout = async () => {
    try {
      if (currentUser) {
        clearUserCache(currentUser.uid);
      }
      await signOut(auth);
      setUserProfile(null);
      setOfflineMode(false);
      console.log('✅ User logged out and session cache cleared');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const setupRecaptcha = (containerId: string): RecaptchaVerifier => {
    return new RecaptchaVerifier(auth, containerId, {
      size: 'invisible',
      callback: () => {
        // reCAPTCHA solved
      }
    });
  };

  const signInWithPhone = async (phoneNumber: string, recaptcha: RecaptchaVerifier): Promise<ConfirmationResult> => {
    try {
      return await signInWithPhoneNumber(auth, phoneNumber, recaptcha);
    } catch (error: any) {
      if (error.code === 'unavailable') {
        setOfflineMode(true);
      }
      throw error;
    }
  };

  const setUserRole = async (role: UserRole) => {
    if (!currentUser) throw new Error('No user logged in');
    
    try {
      const updateData = {
        role,
        updatedAt: new Date()
      };
      
      // Update local state and cache immediately
      if (userProfile) {
        const updatedProfile = { ...userProfile, role, updatedAt: new Date() };
        setUserProfile(updatedProfile);
        setCachedProfile(updatedProfile);
      }
      
      // Try to update Firestore in background (don't await)
      updateFirestoreBackground(currentUser.uid, updateData);
      
      // Clear offline status on successful operation
      setOfflineMode(false);
      console.log('✅ User role updated and cached');
    } catch (error: any) {
      console.error('Error setting user role:', error);
      if (error.code === 'unavailable') {
        setOfflineMode(true);
      }
      throw error;
    }
  };

  // Background Firestore operations (don't block UI)
  const saveToFirestoreBackground = async (uid: string, data: any) => {
    try {
      await setDoc(doc(db, 'users', uid), data);
      console.log('✅ Data saved to Firestore');
      // Update sync time on successful save
      localStorage.setItem(`${CACHE_KEYS.LAST_SYNC}_${uid}`, Date.now().toString());
    } catch (error) {
      console.log('⚠️ Failed to save to Firestore (background operation)');
      setOfflineMode(true);
    }
  };

  const updateFirestoreBackground = async (uid: string, data: any) => {
    try {
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, data);
      console.log('✅ Data updated in Firestore');
      // Update sync time on successful update
      localStorage.setItem(`${CACHE_KEYS.LAST_SYNC}_${uid}`, Date.now().toString());
    } catch (error) {
      console.log('⚠️ Failed to update Firestore (background operation)');
      setOfflineMode(true);
    }
  };

  // IMPROVED: Enhanced Firestore fetch with better retry logic
  const fetchFromFirestore = async (uid: string, retries = 3): Promise<UserProfile | null> => {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        console.log(`🔄 Fetching from Firestore (attempt ${attempt}/${retries})...`);
        
        const userDoc = await Promise.race([
          getDoc(doc(db, 'users', uid)),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Timeout')), 10000) // Increased timeout to 10 seconds
          )
        ]) as any;
        
        if (userDoc.exists()) {
          const data = userDoc.data();
          const profile: UserProfile = {
            uid: uid,
            email: data.email,
            phoneNumber: data.phoneNumber,
            displayName: data.displayName,
            role: data.role,
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date(),
          };
          
          console.log('✅ Profile fetched from Firestore:', profile);
          return profile;
        } else {
          console.log('⚠️ No user document found in Firestore');
          return null;
        }
      } catch (error: any) {
        console.log(`⚠️ Firestore fetch attempt ${attempt} failed:`, error.message);
        
        if (attempt === retries) {
          // Final attempt failed
          throw error;
        }
        
        // Wait before retry (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, 2000 * attempt));
      }
    }
    
    return null;
  };

  // CRITICAL: Completely rewritten profile loading logic with persistent cache
  const loadUserProfile = async (user: FirebaseUser): Promise<void> => {
    console.log('🔄 Loading profile for user:', user.email, 'UID:', user.uid);
    
    try {
      // STEP 1: Always check cache first (even for returning users)
      const cachedProfile = getCachedProfile(user.uid);
      
      if (cachedProfile && cachedProfile.role) {
        // We have a cached profile with role - use it immediately
        console.log('✅ RETURNING USER: Using cached profile with role:', cachedProfile.role);
        setUserProfile(cachedProfile);
        setOfflineMode(false);
        
        // If cache is stale and we're online, refresh in background
        if (!isCacheFresh(user.uid) && navigator.onLine && !isInOfflineMode()) {
          console.log('🔄 Cache is stale, refreshing in background...');
          refreshProfileInBackground(user.uid);
        }
        
        return;
      }

      // STEP 2: Check if we're offline
      if (!navigator.onLine || isInOfflineMode()) {
        console.log('📴 Offline mode detected');
        
        if (cachedProfile) {
          console.log('✅ Using cached profile in offline mode (may be incomplete)');
          setUserProfile(cachedProfile);
          return;
        } else {
          console.log('✅ Creating basic profile from auth data (offline, no cache)');
          createBasicProfileFromAuth(user, null);
          return;
        }
      }

      // STEP 3: We're online and need to fetch from Firestore
      console.log('🔄 RETURNING USER: Fetching fresh data from Firestore...');
      
      try {
        const firestoreProfile = await fetchFromFirestore(user.uid);
        
        if (firestoreProfile) {
          // Successfully fetched from Firestore
          console.log('✅ Profile updated from Firestore:', firestoreProfile);
          setUserProfile(firestoreProfile);
          setCachedProfile(firestoreProfile);
          setOfflineMode(false);
          return;
        } else {
          // User doesn't exist in Firestore
          console.log('⚠️ User not found in Firestore, using cached profile or creating basic profile');
          
          if (cachedProfile) {
            console.log('✅ Using cached profile as fallback');
            setUserProfile(cachedProfile);
          } else {
            console.log('✅ Creating basic profile from auth data (user not in Firestore)');
            createBasicProfileFromAuth(user, null);
          }
          return;
        }
      } catch (error: any) {
        console.log('⚠️ Firestore fetch failed, falling back to cache or basic profile');
        setOfflineMode(true);
        
        // Fallback to cache if available
        if (cachedProfile) {
          console.log('✅ Using cached profile as fallback');
          setUserProfile(cachedProfile);
          return;
        }
      }

      // STEP 4: Final fallback - create basic profile
      console.log('✅ Creating basic profile from auth data (final fallback)');
      createBasicProfileFromAuth(user, null);
      
    } catch (error: any) {
      console.error('❌ Error in loadUserProfile:', error);
      
      // Final fallback
      const cachedProfile = getCachedProfile(user.uid);
      if (cachedProfile) {
        console.log('✅ Using cached profile as error fallback');
        setUserProfile(cachedProfile);
      } else {
        console.log('✅ Creating basic profile from auth data (error fallback)');
        createBasicProfileFromAuth(user, null);
      }
    }
  };

  // NEW: Background refresh function
  const refreshProfileInBackground = async (uid: string) => {
    try {
      const firestoreProfile = await fetchFromFirestore(uid, 1); // Only 1 attempt for background refresh
      
      if (firestoreProfile) {
        console.log('✅ Profile refreshed in background');
        setUserProfile(firestoreProfile);
        setCachedProfile(firestoreProfile);
      }
    } catch (error) {
      console.log('⚠️ Background refresh failed (not critical)');
    }
  };

  // IMPROVED: Better basic profile creation
  const createBasicProfileFromAuth = (user: FirebaseUser, preservedRole: UserRole | null): void => {
    // Try to get cached role if not provided
    if (!preservedRole) {
      const cachedProfile = getCachedProfile(user.uid);
      preservedRole = cachedProfile?.role || null;
    }

    const basicProfile: UserProfile = {
      uid: user.uid,
      email: user.email,
      phoneNumber: user.phoneNumber,
      displayName: user.displayName,
      role: preservedRole as UserRole,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setUserProfile(basicProfile);
    
    // Cache the profile if we have a role
    if (preservedRole) {
      setCachedProfile(basicProfile);
      console.log('✅ Created basic profile with preserved role:', preservedRole);
    } else {
      console.log('✅ Created basic profile from auth data (no role available)');
    }
  };

  const refreshUserProfile = async () => {
    if (currentUser) {
      // Force refresh by clearing sync time
      localStorage.removeItem(`${CACHE_KEYS.LAST_SYNC}_${currentUser.uid}`);
      await loadUserProfile(currentUser);
    }
  };

  const retryConnection = async () => {
    try {
      // Try to re-enable network connection
      await enableNetwork(db);
      setOfflineMode(false);
      
      // Retry fetching user profile if we have a current user
      if (currentUser) {
        await loadUserProfile(currentUser);
      }
      
      console.log('✅ Connection restored');
    } catch (error: any) {
      console.error('Failed to retry connection:', error);
      setOfflineMode(true);
    }
  };

  // Initialize cache on app start (only once)
  useEffect(() => {
    initializeCache();
  }, []);

  // CRITICAL: Auth state change handler
  useEffect(() => {
    // Don't start auth listener until cache is initialized
    if (!cacheInitialized) return;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('🔄 Auth state changed:', user ? `User: ${user.email}` : 'User logged out');
      
      setCurrentUser(user);
      
      if (user) {
        // Load profile for both new and returning users
        await loadUserProfile(user);
      } else {
        // User logged out
        setUserProfile(null);
        setOfflineMode(false);
      }
      
      // Set loading to false after profile is loaded (or user is null)
      setLoading(false);
    });

    return unsubscribe;
  }, [cacheInitialized]);

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => {
      console.log('🌐 Browser is online, attempting to reconnect...');
      setOfflineMode(false);
      retryConnection();
    };

    const handleOffline = () => {
      console.log('📴 Browser is offline');
      setOfflineMode(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check initial online status
    if (!navigator.onLine) {
      setOfflineMode(true);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [currentUser]);

  const value: AuthContextType = {
    currentUser,
    userProfile,
    loading,
    isOffline,
    signup,
    login,
    logout,
    setupRecaptcha,
    signInWithPhone,
    setUserRole,
    refreshUserProfile,
    retryConnection
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};