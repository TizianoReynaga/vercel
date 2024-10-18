import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import styles from '../app/css/Login.module.css'; // Importar los estilos de Register

import Link from 'next/link';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!auth) {
      console.error('Firebase Auth no está inicializado. Esto puede deberse a un problema con la configuración.');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Usuario autenticado:', userCredential.user);
    } catch (error) {
      console.error('Error en la autenticación:', error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Iniciar sesión</button>

      <div className={styles.linkContainer}>
        <Link href="/registro" className={styles.link}>
          Registro
        </Link>
      </div>
    </div>
  );
};

export default Login;