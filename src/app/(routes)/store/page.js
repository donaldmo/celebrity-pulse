"use client"

import { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Cursor from '@/components/Cursor';
import Navigation from '@/components/Navigation';
import NavigationContnet from '@/components/NavigationContent';

import { sendLoginData, fetchTickets, purchaseTicket } from '@/app/utils';

export default function Store() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState(null);

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetch Tickets | useEffect
   */
  useEffect(() => {
    const fetchAndSetTickets = async () => {
      try {
        const tickets = await fetchTickets();
        setTickets(tickets);
      }
      catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    };

    fetchAndSetTickets();
  }, []);

  useEffect(() => {
    async function sendAndSetUserData() {
      if (status === 'authenticated') {
        const user = await sendLoginData(session);
        setUserData(user);
      }
    }

    sendAndSetUserData();
  }, [status, session]);

  const handleBuy = async (event, ticket) => {
    event.preventDefault();

    if (status === 'unauthenticated') {
      // const currentUrl = window.location.href;
      const callbackUrl = `/store/purchase?ticketId=${ticket._id}`;
      return signIn('google', { callbackUrl });
    }

    if (status === 'authenticated') {
      const invoice = {
        metadata: {
          user_email: userData.email,
          product_id: ticket._id,
          product_item: "ticket"
        },
        amount: ticket.amount,
        currency: "ZAR",
        successUrl: '/store/purchase/sucess',
      };

      const redirectUrl = await purchaseTicket(invoice);
      return window.open(redirectUrl, '_blank');
    }

  };

  if (error) {
    return <div style={{ color: "white" }}>Error: {error}</div>;
  }

  if (tickets.length && !loading) {
    return (
      <main id="songs-one">
        <div id="songs-one-content">
          <Navigation />
          <NavigationContnet />

          {!loading && tickets.length && (
            <div className="heading">
              <div className="text">TICKETS</div>
            </div>
          )}

          <div className="center">
            <div id="songs-container">
              {/* Dynamically render the tickets */}

              {loading && (
                <div style={{ color: "white" }}>Loading...</div>
              )}

              {!loading && tickets.map((ticket) => (
                <div className="song fade-up" key={ticket._id}>

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


}
