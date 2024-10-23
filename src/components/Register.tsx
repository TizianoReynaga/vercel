import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth, db } from '../lib/firebase'; // Importa tu configuración de Firebase y Firestore
import { doc, setDoc } from 'firebase/firestore';
import styles from '../css/Register.module.css';

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isTrialUser, setIsTrialUser] = useState(false); // Estado para el tipo de usuario
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      // Crear el usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Enviar el correo de verificación
      await sendEmailVerification(userCredential.user);

      // Guardar información del usuario en Firestore
      const sanitizedEmail = email.replace(/\./g, '_');
      await setDoc(doc(db, 'users', sanitizedEmail), {
        userType: isTrialUser ? 'trial' : 'full', // Guardar si es usuario de prueba o completo
        email: email,
      });

      // Mostrar mensaje indicando que se envió el correo de verificación
      setMessage('Correo de verificación enviado. Por favor, revisa tu bandeja de entrada.');

      // Redirigir al login después de unos segundos
      setTimeout(() => {
        router.push('/login');
      }, 5000);
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      setError('Error al registrar. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Registro</h1>

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

      <input
        type="password"
        placeholder="Confirmar Contraseña"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className={styles.input}
      />

      <label className={styles.checkboxContainer}>
        <input
          type="checkbox"
          checked={isTrialUser}
          onChange={() => setIsTrialUser(!isTrialUser)}
        />
        Registrar como usuario de prueba
      </label>

      <button onClick={handleRegister} className={styles.button}>
        Entrar
      </button>

      {error && <p className={styles.error}>{error}</p>}
      {message && <p className={styles.message}>{message}</p>}

      <div className={styles.linkContainer}>
        <a href="/login" className={styles.link}>
          Iniciar sesión
        </a>
      </div>
    </div>
  );
};

export default Register;
