import { useState } from 'react';
import styles from '../css/LoginCode.module.css';
import { useRouter } from 'next/navigation';
import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user.emailVerified) {
        // Usuario está verificado, redirigir a la página principal
        router.push('/dashboard');
      } else {
        setError('Tu correo no ha sido verificado. Por favor, revisa tu bandeja de entrada.');
      }
    } catch (error) {
      setError('Error al iniciar sesión. Por favor, intenta de nuevo.');
      console.error('Error durante el inicio de sesión:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Iniciar Sesión</h1>
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={styles.inputField}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.inputField}
        required
      />
      <button onClick={handleLogin} className={styles.button}>
        Iniciar Sesión
      </button>

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Login;
