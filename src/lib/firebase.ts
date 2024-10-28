import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs, addDoc, query, where, orderBy, limit, doc, updateDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { Product, ProductData } from '../types';

const firebaseConfig = {
  apiKey: "AIzaSyBPXtL_NSqdkwjAWFB26MF4bI5Cru9ypLg",
  authDomain: "hobedata.firebaseapp.com",
  projectId: "hobedata",
  storageBucket: "hobedata.appspot.com",
  messagingSenderId: "932816369920",
  appId: "1:932816369920:web:cac95355e18a8707e85be5",
  measurementId: "G-ZK86GMS8MS"
};

let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  console.error("Error initializing Firebase app:", error);
}

export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;
export const storage = app ? getStorage(app) : null;

if (!auth || !db || !storage) {
  console.error("Firebase services not initialized properly");
}

// Firestore collections
export const productsRef = db ? collection(db, 'products') : null;
export const categoriesRef = db ? collection(db, 'categories') : null;
export const usersRef = db ? collection(db, 'users') : null;
export const chatsRef = db ? collection(db, 'chats') : null;
export const messagesRef = db ? collection(db, 'messages') : null;

// Helper functions
interface GetProductsParams {
  searchQuery: string;
  category: string;
  subcategory: string;
  page: number;
  limit: number;
}

export const getProducts = async (params: GetProductsParams): Promise<Product[]> => {
  if (!productsRef) throw new Error("Products collection not initialized");
  
  let q = query(productsRef, orderBy('createdAt', 'desc'));
  
  if (params.searchQuery) {
    q = query(
      productsRef,
      where('title', '>=', params.searchQuery),
      where('title', '<=', params.searchQuery + '\uf8ff'),
      orderBy('title'),
      limit(20)
    );
  }
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
};

export const getCategories = async () => {
  if (!categoriesRef) throw new Error("Categories collection not initialized");
  const snapshot = await getDocs(categoriesRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addProduct = async (productData: ProductData) => {
  if (!productsRef) throw new Error("Products collection not initialized");
  return await addDoc(productsRef, {
    ...productData,
    createdAt: new Date(),
  });
};

export const addUser = async (userData: {
  email: string;
  displayName?: string;
  [key: string]: any;
}) => {
  if (!usersRef) throw new Error("Users collection not initialized");
  return await addDoc(usersRef, {
    ...userData,
    createdAt: new Date(),
  });
};

export const createChat = async (senderId: string, receiverId: string, productId: string) => {
  if (!chatsRef) throw new Error("Chats collection not initialized");
  const chatData = {
    participants: [senderId, receiverId],
    productId,
    lastMessage: null,
    lastMessageTime: new Date(),
    createdAt: new Date(),
  };
  return await addDoc(chatsRef, chatData);
};

export const sendMessage = async (chatId: string, senderId: string, content: string) => {
  if (!messagesRef || !db) throw new Error("Messages collection not initialized");
  
  const messageData = {
    chatId,
    senderId,
    content,
    createdAt: new Date(),
  };
  
  const messageRef = await addDoc(messagesRef, messageData);
  
  // Update last message in chat
  const chatRef = doc(db, 'chats', chatId);
  await updateDoc(chatRef, {
    lastMessage: content,
    lastMessageTime: new Date(),
  });
  
  return messageRef;
};

export const getChatsByUser = async (userId: string) => {
  if (!chatsRef) throw new Error("Chats collection not initialized");

  const q = query(
    chatsRef,
    where('participants', 'array-contains', userId),
    orderBy('lastMessageTime', 'desc')
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getMessages = async (chatId: string) => {
  if (!messagesRef) throw new Error("Messages collection not initialized");
  
  const q = query(
    messagesRef,
    where('chatId', '==', chatId),
    orderBy('createdAt', 'asc')
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
