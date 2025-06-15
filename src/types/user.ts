export interface User {
  uid: string;
  email: string | null;
  phoneNumber: string | null;
  displayName: string | null;
  role?: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = 'learner' | 'skilled-professional' | 'customer';

export interface UserProfile {
  uid: string;
  email: string | null;
  phoneNumber: string | null;
  displayName: string | null;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}