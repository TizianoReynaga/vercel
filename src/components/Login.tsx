import { useState } from 'react';
import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { db } from '../lib/firebase'; // Importa la configuración de Firestore
import { doc, getDoc } from 'firebase/firestore';
import styles from '../css/Login.module.css';
import { useRouter } from 'next/router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [welcomeMessage, setWelcomeMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user.emailVerified) {
        // Obtener el tipo de usuario desde Firestore
        if (user.email) {
          const sanitizedEmail = user.email.replace(/\./g, '_');
          console.log("Email original:", user.email);
          console.log("Email sanitizado:", sanitizedEmail);

          const userRef = doc(db, 'users', sanitizedEmail);
          const userDoc = await getDoc(userRef);
          console.log("Referenciando el documento:", userRef.path);

          if (userDoc.exists()) {
            console.log("Documento del usuario encontrado:", userDoc.data());
            const userType = userDoc.data().userType;
            setWelcomeMessage(`Bienvenido a su cuenta. Tipo de usuario: ${userType}`);
          } else {
            console.error("El documento no existe en Firestore.");
            setError('No se pudo obtener la información del usuario. Verifica que el usuario esté registrado en la base de datos.');
          }
        } else {
          setError('No se pudo obtener el correo del usuario.');
        }
      } else {
        setError('Por favor, verifica tu correo electrónico antes de iniciar sesión.');
      }
    } catch (err) {
      setError('Error durante el inicio de sesión. Por favor, intenta de nuevo.');
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Inicio de Sesión</h1>

      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={styles.input}
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.input}
      />

      <button onClick={handleLogin} className={styles.button}>
        Entrar
      </button>

      {error && <p className={styles.error}>{error}</p>}
      {welcomeMessage && <p className={styles.message}>{welcomeMessage}</p>}

      <div className={styles.linkContainer}>
        <a href="/register" className={styles.link}>
          Crear cuenta
        </a>
      </div>
    </div>
  );
};

export default Login;
