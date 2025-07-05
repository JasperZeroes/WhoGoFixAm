# WhoGoFixAm - Community Skills Platform

A React-based web application that connects community members for learning vocational skills, and connecting them with users who need their services in turn.

## Features

### Authentication
- Email/password registration and login
- Phone number authentication with SMS verification
- User role selection (Learner, Skilled Professional, Customer)
- Secure user profile management with Firebase

### User Roles
- **Learner**: Users who want to learn new skills from community experts
- **Skilled Professional**: Users who offer their expertise and services
- **Customer**: Users who need help fixing problems or finding solutions

### Core Functionality
- Responsive navigation with mobile-friendly hamburger menu
- Role-based personalized experience
- Beautiful, modern UI with Tailwind CSS
- Firebase Authentication integration
- Firestore database for user profiles

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase project

### Firebase Configuration

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication with Email/Password and Phone providers
3. Create a Firestore database
4. Get your Firebase configuration from Project Settings
5. Update `src/config/firebase.ts` with your Firebase config:

```typescript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};
```

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Firebase (see above)
4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/
│   ├── auth/
│   │   ├── AuthModal.tsx      # Login/signup modal
│   │   └── RoleSelection.tsx  # Role selection component
│   └── Navigation.tsx         # Main navigation component
├── contexts/
│   └── AuthContext.tsx        # Authentication context
├── pages/
│   ├── HomePage.tsx           # Landing page
│   ├── LearnSkillPage.tsx     # Learn skills page
│   ├── OfferServicePage.tsx   # Offer services page
│   └── NeedFixPage.tsx        # Need help page
├── types/
│   └── user.ts               # User type definitions
├── config/
│   └── firebase.ts           # Firebase configuration
└── App.tsx                   # Main app component
```

## Technologies Used

- **React 18** with TypeScript
- **React Router** for navigation
- **Firebase Authentication** for user management
- **Firestore** for database
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Vite** for build tooling

## Authentication Flow

1. User clicks Login/Sign Up in navigation
2. AuthModal opens with email/phone options
3. User completes authentication
4. If new user, RoleSelection modal appears
5. User selects role (Learner, Skilled Professional, or Customer)
6. Role is saved to Firestore user profile
7. User is redirected with personalized experience

## Next Steps

This is the foundation for the WhoGoFixAm platform. Future prompts will add:
- Skill browsing and learning features
- Service offering and booking system
- Problem posting and solution matching
- Payment integration
- Rating and review system
- Real-time messaging
- And much more!
