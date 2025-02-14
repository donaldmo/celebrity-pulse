"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';

import { useSession, signIn, signOut } from 'next-auth/react';
import Navigation from '@/components/Navigation';
import NavigationContnet from '@/components/NavigationContent';

import { sendLoginData, fetchTickets, handleYoco, handlePayPal } from '@/app/utils';
import Loader from '@/components/Loader';
import Headphone from '@/components/Headphone';
import { toast, Toaster } from 'react-hot-toast';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Store() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState(null);

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const [selectedToken, setSelectedToken] = useState();
  const [fetching, setFetching] = useState(false)

  useEffect(() => {
    const authenticate = async () => {
      if (status === 'authenticated') {
        if (session) {
          setUserData(session)
        }
      }
    }

    authenticate();
  }, [status, session]);

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

  // useEffect(() => {
  //   const YOCO_WEBHOOK_URL = process.env.NEXT_PUBLIC_YOCO_WEBHOOK_URL;
  //   const YOCO_SECRET_KEY = process.env.NEXT_PUBLIC_YOCO_SECRET_KEY;
  //   const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  //   const fetchWebhook = async () => {
  //     try {
  //       const response = fetch(YOCO_WEBHOOK_URL, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': `Bearer ${YOCO_SECRET_KEY}`
  //         },
  //         body: JSON.stringify({
  //           name: 'celebrity-pulse-webhook',
  //           url: `${BASE_URL}/api/store/webhook`
  //         })
  //       })

  //       if (!response.ok) {
  //         const resultError = await response.json();
  //         alert('Webhook Error')
  //         console.log('Webhook Error: ', resultError.error)
  //         throw new Error(resultError.error);
  //       }

  //       alert('Webhook Response: ')
  //       const result = await response.json();
  //       console.log('Webhook Response: ', result)

  //     } catch (error) {
  //       console.log(error)
  //     }

  //   }

  //   // fetchWebhook()
  // }, [])

  const handleBuy = async (paymentMethod) => {
    setFetching(true)
    localStorage.setItem("tokenId", selectedToken._id);

    try {
      if (status === 'unauthenticated') {
        const callbackUrl = window.location.href;
        return signIn('google', { callbackUrl });
      }

      if (status === 'authenticated') {
        const invoice = {
          metadata: {
            user_email: userData.email,
            product_id: selectedToken._id,
            product_item: "token"
          },
          amount: selectedToken.amount,
          price: selectedToken.price,
          currency: "USD",
        };

        let redirectUrl = "";
        console.log('INVOICE: ', invoice);

        switch (paymentMethod) {
          case 'PAY_PAL': {
            redirectUrl = await handlePayPal(invoice, userData.accessToken);
            break;
          }

          case 'DEBIT_CARD': {
            redirectUrl = await handleYoco(invoice);
            break;
          }

          default:
            toast.error('Unsupported Payment Method!', {
              duration: 4000,
              position: 'top-center',
            });

            break;
        }

        setShow(false)
        setFetching(false);

        if (redirectUrl) {
          // return window.open(redirectUrl, '_blank');
          window.location.href = redirectUrl
        }
      }
    } catch (error) {
      toast.error(error.message, {
        duration: 4000,
        position: 'top-center',
      });
    } finally {
      setShow(false)
      setFetching(false);
    }
  };

  if (error) {
    return <div style={{ color: "white" }}>Error: {error}</div>;
  }

  if (tickets.length && !loading) {
    return (
      <main id="songs-one">
        <Toaster />

        <div id="songs-one-content">
          <Navigation />
          <NavigationContnet />

          {!loading && tickets.length && (
            <div className="heading">
              <div className="text">STORE</div>
            </div>
          )}

          <div className="center">
            <div id="songs-container">
              {loading && (<Loader />)}

              {!loading && tickets.map((ticket) => (
                <div className="song fade-up" key={ticket._id}>

                  <div className="song-details">
                    <div className="song-details-content">
                      <div className="song-name">{ticket.amount} Tokens</div>
                    </div>
                    <div className="music-player">
                      <div className="play-song mouse">
                        <img src="/images/dollar.png" alt="play" />
                        <div className="song-name" style={{ width: '50%' }}>
                          ${ticket.price}
                        </div>
                      </div>

                      <div className="download-song mouse">
                        <button
                          style={{ margin: '8px' }}
                          className="blog-read-more"
                          onClick={(event) => {
                            event.preventDefault();
                            setSelectedToken(ticket);
                            setShow(true);
                          }}
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

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Purchase Tokens</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              You're purchasing {selectedToken?.amount} tokens, valued at ${selectedToken?.price}.
            </Modal.Body>
            <Modal.Footer>

              {fetching && <Loader />}

              {!fetching && (<>
                <Button variant="primary" onClick={() => handleBuy('PAY_PAL')}
                  style={{ fontWeight: '600' }}
                >
                  Buy <img src="/download.svg" alt="Paypla Icon" width={68} height="auto" />
                </Button>

                <Button variant="primary" onClick={() => handleBuy('DEBIT_CARD')}
                  style={{ fontWeight: '600' }}
                >
                  Buy Debit Card<img src="/atm-card.png" alt="Card Icon" width={21} height="auto" />
                </Button>
              </>)}
            </Modal.Footer>
          </Modal>

          {!loading && userData && (<Headphone image={userData.image} />)}
        </div>
      </main>
    );
  }


}
