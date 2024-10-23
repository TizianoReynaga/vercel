import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../lib/firebase';
import styles from '../css/VerifyEmail.module.css';

const VerifyEmail = () => {
  const [message, setMessage] = useState<string>('Verificando correo...');
  const router = useRouter();

  useEffect(() => {
    const checkVerification = async () => {
      try {
        await auth.currentUser?.reload();
        if (auth.currentUser?.emailVerified) {
          setMessage('Correo verificado exitosamente. Redirigiendo...');
          setTimeout(() => {
            router.push('/login');
          }, 3000);
        } else {
          setMessage('Correo no verificado. Por favor, revisa tu correo electrónico.');
        }
      } catch (error) {
        setMessage('Error al verificar el correo. Por favor, intenta nuevamente.');
      }
    };
    checkVerification();
  }, [router]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Verificación de Correo</h1>
      <p className={styles.message}>{message}</p>
    </div>
  );
};

export default VerifyEmail;
