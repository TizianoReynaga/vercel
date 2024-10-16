'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirigir a la página de login al cargar la página principal
    router.push('/login');
  }, [router]);

  return null;
}
