import { useState } from 'react';
import styles from '../app/css/Register.module.css'; // Importar los estilos de Register
import { useRouter } from 'next/navigation'; // Importar useRouter para redirigir
import Link from 'next/link';


const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleRegister = () => {
    if (!email || !password || !confirmPassword) {
      setError('Todos los campos son obligatorios');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    // Redirigir a la página de verificación
    router.push('/verify');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>TITULO</h1>

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

      <input
        type="password"
        placeholder="Confirmar contraseña"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className={styles.inputField}
        required
      />

      <button onClick={handleRegister} className={styles.button}>
        Entrar
      </button>

      {error && <p className={styles.error}>{error}</p>}

      <Link href="/login" className={styles.link}>
      Crear cuenta
       </Link>
    </div>
  );
};

export default Register;
