"use client"

import { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Cursor from '@/components/Cursor';
import Navigation from '@/components/Navigation';
import NavigationContnet from '@/components/NavigationContent';

export default function Store() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState(null);

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      const currentUrl = window.location.href;
      signIn('google', { callbackUrl: currentUrl });
    }
  }, [status]);

  useEffect(() => {
    if (status === 'authenticated') {

      const sendLoginData = async () => {
        try {
          const { name, email, image } = session.user;
          const { expires } = session;

          const payload = {
            name,
            email,
            image,
            login: {
              expires
            },
          };

          // Send a POST request to /api/auth/login
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });

          if (!response.ok) {
            throw new Error('Failed to log user information');
          }

          const result = await response.json();
          console.log('User login data successfully sent:', result);
          setUserData(result.user);

        } catch (error) {
          console.error('Error sending login data:', error);
        }
      };

      sendLoginData(); // Trigger the POST request
    }
  }, [status, session]);

  useEffect(() => {
    if (status === 'authenticated') {
      const fetchTickets = async () => {
        try {
          const response = await fetch('/api/store');
          if (!response.ok) {
            throw new Error('Failed to fetch tickets');
          }
          const data = await response.json();
          setTickets(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchTickets();
    }
  }, [status]);

  const handleBuy = async (event, ticket) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/store/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: ticket.price * 100,
          currency: ticket.currency,
          lineItems: [
            {
              userId: user._id,
              displayName: ticket.name,
              quantity: 1,
              pricingDetails: {
                price: ticket.price * 100
              }
            }
          ],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout');
      }

      const result = await response.json();
      console.log('Checkout created:', result);

      if (result.redirectUrl) {
        console.log("redirecting to: ", result.redirectUrl);
        window.open(result.redirectUrl, '_blank');
      }
    } catch (error) {
      console.error('Error purchasing ticket:', error.message);
    }
  };

  // Render loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (status === 'authenticated') {
    return (
      <main id="songs-one">
        <Cursor />
        {/* <Preloader /> */}

        <div id="songs-one-content">
          <Navigation />
          <NavigationContnet />

          <div className="heading">
            <div className="text">TICKETS</div>
            <div style={{ fontSize: "28px" }}>My tickets: 0</div>
          </div>

          <div className="center">
            <div id="songs-container">
              {/* Dynamically render the tickets */}
              {tickets.map((ticket) => (
                <div className="song fade-up" key={ticket.id}>

                  <div className="song-details">
                    <div className="song-details-content">
                      <div className="song-name">{ticket.amount} Tokens</div>
                    </div>
                    <div className="music-player">
                      <div className="play-song mouse">
                        <img src="/images/dollar.png" alt="play" />
                        <div className="song-name">$ {ticket.price}</div>
                      </div>
                      <div className="download-song mouse">
                        <button
                          className="blog-read-more"
                          onClick={(event) => handleBuy(event, ticket)}
                        >
                          Buy
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="headphone img text">
            <img src="/images/headphone.png" title="headphone zone" className="text" alt="headphone" />
          </div>

          <div className="music-indicator">
            <span style={{ "--i": 1 }} className="music-indicator-span"></span>
            <span style={{ "--i": 2 }} className="music-indicator-span"></span>
            <span style={{ "--i": 3 }} className="music-indicator-span"></span>
            <span style={{ "--i": 4 }} className="music-indicator-span"></span>
          </div>

          <div className="progress-bar-container fade-in">
            <div className="progressbar"></div>
          </div>
        </div>
      </main>
    );
  }

  return <div>Please log in to view the store.</div>;
}
