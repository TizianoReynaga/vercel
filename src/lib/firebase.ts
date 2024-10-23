import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA-rxIMPbQkn9d6P_15MM6VCaR7ov1qyp0",
  authDomain: "vercel-69f8d.firebaseapp.com",
  projectId: "vercel-69f8d",
  storageBucket: "vercel-69f8d.appspot.com",
  messagingSenderId: "830905997022",
  appId: "1:830905997022:web:4be325e40aae9a0db8544f",
  measurementId: "G-2KCHCJSG4Y"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


