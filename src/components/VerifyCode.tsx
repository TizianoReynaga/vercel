import { useState } from 'react';
import styles from '../app/css/Verify.module.css'; // Crear y usar los estilos para este componente

const VerifyCode = () => {
  const [code, setCode] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleVerify = () => {
    if (!code) {
      setError('El código es obligatorio');
      return;
    }

    // Lógica para verificar el código aquí
    console.log('Código ingresado:', code);
  };

  return (
    <div className={styles.container}>
      <p className={styles.message}>Se envió un código a tu Gmail, ingresalo</p>
      <input
        type="text"
        placeholder="Código"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className={styles.inputField}
        required
      />
      <button onClick={handleVerify} className={styles.button}>
        Entrar
      </button>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default VerifyCode;
