import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAJmbgKYjbdkNqhZv6obOac3doDIvRBTBw",
  authDomain: "karrot-81cb7.firebaseapp.com",
  projectId: "karrot-81cb7",
  storageBucket: "karrot-81cb7.appspot.com",
  messagingSenderId: "1054058971665",
  appId: "1:1054058971665:web:09745869f62819f1fb27b0",
  measurementId: "G-DL819N2W1C"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);