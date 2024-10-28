import { auth, db, usersRef } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export const signUp = async (email: string, password: string, userData: any) => {
  if (!auth) throw new Error("Auth instance is not initialized");
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await createUserProfile(user, userData);
    return user;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

export const signIn = async (email: string, password: string) => {
  if (!auth) throw new Error("Auth instance is not initialized");
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};

export const logOut = async () => {
  if (!auth) throw new Error("Auth instance is not initialized");
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

export const createUserProfile = async (user: User, additionalData: any) => {
  if (!user || !db) return;

  const userRef = doc(db, 'users', user.uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    const { email } = user;
    const createdAt = new Date();

    try {
      await setDoc(userRef, {
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.error("Error creating user profile:", error);
    }
  }

  return getUserProfile(user.uid);
};

export const getUserProfile = async (userId: string) => {
  if (!db) return null;

  const userRef = doc(db, 'users', userId);
  const snapshot = await getDoc(userRef);

  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() };
  } else {
    return null;
  }
};

// You can add more auth-related functions here as needed

