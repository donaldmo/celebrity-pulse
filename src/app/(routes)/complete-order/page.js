'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import NavigationContnet from '@/components/NavigationContent';

export default function CompleteOrder() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const payerID = searchParams.get('PayerID');

  const [status, setStatus] = useState(
    "Processing your payment, don't close the page..."
  );

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tokenId = localStorage.getItem("tokenId");
    console.log('COMPLETE ORDER: ', token, payerID, tokenId)

    const completeOrder = async () => {

      if (!token || !payerID || !tokenId) {
        setError('Missing token or PayerID or tokenId.');
        setStatus('Payment could not be processed.');
        return;
      }

      try {
        const response = await fetch('/api/complete-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token, payerID, tokenId }),
        });

        if (!response.ok) {
          const resultError = await response.json();
          console.log('Response Error: ', resultError.error)
          setError(resultError);
        }

        const result = await response.json();
        console.log('Results: ', result)
        setStatus(result.status)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false)
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
          <p>{status}</p>
        </div>

        <div className="center" style={{ color: "white" }}>
          {!loading && error && (
            <p style={{ color: 'red' }}>Error: {error}</p>
          )}
        </div>

        {!loading && (<div className="center">
          <Link
            href="/"
            style={{ padding: '10px 20px', fontSize: '16px' }}
          >
            Return to Home
          </Link>
        </div>)}
      </div>
    </main>
  );
}
