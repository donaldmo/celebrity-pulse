"use client"

import Cursor from '@/components/Cursor';
import Navigation from '@/components/Navigation';
import NavigationContnet from '@/components/NavigationContent';
import Preloader from '@/components/Preloader';
import { useState, useEffect } from 'react';

export default function Store() {
    const [tickets, setTickets] = useState([]); // State to store tickets data
    const [loading, setLoading] = useState(true); // State to show loading state
    const [error, setError] = useState(null); // State to handle errors

    // Fetch the tickets data from the API when the component mounts
    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await fetch('/api/store'); // Fetch from your API endpoint
                if (!response.ok) {
                    throw new Error('Failed to fetch tickets');
                }
                const data = await response.json(); // Parse the JSON response
                setTickets(data); // Set the fetched tickets to state
            } catch (error) {
                setError(error.message); // Set the error message
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchTickets(); // Call the fetch function
    }, []);

    // Render loading state
    if (loading) {
        return <div>Loading...</div>;
    }

    // Render error state
    if (error) {
        return <div>Error: {error}</div>;
    }

    if (tickets) console.log(tickets)

    return (
        <main id="songs-one">
            <Cursor />
            <Preloader />

            <div id="songs-one-content">
                <Navigation />
                <NavigationContnet />

                <div className="heading">
                    <div className="text">TICKETS</div>
                    <div style={{fontSize: "28px"}}>My tickets: 0</div>
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
                                        </div>
                                        <div className="download-song mouse">
                                            <a href={`/music/${ticket.price}`}>
                                                ${ticket.price}<img src="/images/download.png" alt="download" />
                                            </a>
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
