'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession, signIn } from 'next-auth/react';

import Navigation from '@/components/Navigation';
import NavigationContnet from '@/components/NavigationContent';

export default function CompleteOrder() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get('token');
  const payerID = searchParams.get('PayerID');
  const productId = searchParams.get('productId');

  const [message, setMessage] = useState(
    "Processing your payment, don't close the page..."
  );

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();

  const [userData, setUserData] = useState({
    user: {
      name: 'Donald Motswiri',
      email: 'rmotswiri023@student.wethinkcode.co.za',
      image: 'https://lh3.googleusercontent.com/a/ACg8ocKdZtGDg8ivXA5KPU7xUaculepBjeYah4h3hgGFWuKAjpmnS6Y=s96-c',
      id: '105342488709512522166'
    },
    accessToken: 'ya29.a0AXeO80Qrbf_r5cqrzRafni4uqstH2kqP8ol8zFX9OjtrMu0Js-FcoMwzBpX0HETT9MuYIE_znV8Mvr9cs4HLq6qrjXU59ufjCkh__I-yhSU1XEu8u_D4ykBaF99dUYZa0UJ7Jibm4iyD9jf3K93nuuW8BgC4DR8FJfoaCgYKAZgSARISFQHGX2MigoyYLZCMmD9Ra246_WqB5A0170'
  });
  
  // useEffect(() => {
  //   const authenticate = async () => {
  //     if (status === 'unauthenticated') {
  //       await signIn('google', { callbackUrl: window.location.href });
  //     }

  //     if (status === 'authenticated' && session) {
  //       setUserData(session);
  //     }
  //   };

  //   authenticate();
  // }, [status, session]);

  useEffect(() => {
    if (!userData || !token || !payerID) return;

    const completeOrder = async () => {
      try {
        const response = await fetch('/api/complete-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userData.accessToken}`,
          },
          body: JSON.stringify({ token, payerID, productId }),
        });

        if (response.ok) {
          const result = await response.text();
          setMessage(result);
        } else {
          const errorMessage = await response.text();
          setError(errorMessage);
          setMessage('Payment failed.');
        }
      } catch (err) {
        setError(err.message);
        setMessage('An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    completeOrder();
  }, []);

  return (
    <main id="songs-one">
      <div id="songs-one-content">
        <Navigation />
        <NavigationContnet />

        <div className="heading">
          <div className="text">COMPLETE ORDER</div>
        </div>

        <div className="center" style={{ color: "white" }}>
          <p>{message}</p>
        </div>

        <div className="center" style={{ color: "white" }}>
          {!loading && error && (
            <p style={{ color: 'red' }}>Error: {error}</p>
          )}
        </div>

        {!loading && (
          <div className="center">
            <Link
              href="/"
              style={{ padding: '10px 20px', fontSize: '16px' }}
            >
              Return to Home
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}