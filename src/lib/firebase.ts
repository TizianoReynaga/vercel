import { initializeApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getAnalytics, Analytics } from 'firebase/analytics';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBE1govK9b9yOLTfF7WFPL2jdRW1ealM9A",
  authDomain: "vercel-2e399.firebaseapp.com",
  projectId: "vercel-2e399",
  storageBucket: "vercel-2e399.appspot.com",
  messagingSenderId: "655161251726",
  appId: "1:655161251726:web:35aaa39ff301bbe3ef36df",
  measurementId: "G-TGJ31EV1V5"
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
