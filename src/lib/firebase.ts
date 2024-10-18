import { initializeApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getAnalytics, Analytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY as string,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN as string,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID as string,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID as string,
};

// Inicializar Firebase si las credenciales están disponibles
let app;
if (firebaseConfig.apiKey) {
  app = initializeApp(firebaseConfig);
} else {
  console.warn('Firebase configuration values are missing');
}

// Inicializar Analytics solo en el lado del cliente
let analytics: Analytics | undefined;
if (typeof window !== 'undefined' && app) {
  analytics = getAnalytics(app);
}

// Inicializar Auth, asegurando que siempre tenga un valor
let auth: Auth;
if (app) {
  auth = getAuth(app);
} else {
  throw new Error('Firebase app no inicializado');
}

export { auth, analytics };
