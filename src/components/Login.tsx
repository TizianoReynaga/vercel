import { useState, useEffect } from 'react';
import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import styles from '../app/css/Login.module.css'; // Importar los estilos desde un archivo CSS modular
import Link from 'next/link';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Asegurarse de que estamos en el cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogin = async () => {
    if (!isClient) return; // Evitar que Firebase se ejecute en el servidor
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredential.user);
      setError(null); // Limpiar el error si el login es exitoso
    } catch (err: unknown) {
      setError('Error durante el inicio de sesión, revisa tus credenciales.');
      console.error('Error during login:', err);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>TITULO</h1>

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

      <div className={styles.linkContainer}>
        <Link href="/register">
          <a className={styles.link}>Crear cuenta</a>
        </Link>
      </div>
    </div>
  );
};

export default Login;
