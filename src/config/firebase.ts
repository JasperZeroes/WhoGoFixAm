import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Replace with your Firebase config
  apiKey: "AIzaSyDxUt7HSzHC9_fsVN6KEHsRqoTiICW_CCI",
  authDomain: "whogofixam.firebaseapp.com",
  projectId: "whogofixam",
  storageBucket: "whogofixam.firebasestorage.app",
  messagingSenderId: "1022684180175",
  appId: "1:1022684180175:web:ae656e5c61bd6a73b351ba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;