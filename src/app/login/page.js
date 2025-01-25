"use client"

import { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import NavigationContnet from '@/components/NavigationContent';


const Login = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/profile');
    }
  }, [status, router]);

  const handleLogin = async () => {
    await signIn('google');
  };

  return (
    <main id="songs-one">
      <div id="songs-one-content">
        <Navigation />
        <NavigationContnet />

        <div className="heading">
          <div className="text">LOGIN</div>
        </div>

        <div className="center" style={{ color: "white" }}>
          <p>Please log in using your Google account to continue.</p>
        </div>

        <div className="center">
          <button
            onClick={handleLogin}
            style={{ padding: '10px 20px', fontSize: '16px' }}
          >
            Login with Google
          </button>
        </div>
      </div>
    </main>
  );
};

export default Login;
