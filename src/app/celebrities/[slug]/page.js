"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Cursor from "../../../components/Cursor";
import Preloader from "../../../components/Preloader";
import Heading from "../../../components/Heading";
import Navigation from "../../../components/Navigation";
import Headphone from "../../../components/Headphone";
import Progressbar from "../../../components/Progressbar";
import NavigationContent from "../../../components/NavigationContent";
import CountdownTimer from "../../../components/CountdownTimer";
import { ToastContainer } from "react-toastify";

export default function SingleCelebrity({ params }) {
    const { slug } = params;

    const [artist, setArtist] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [voteCount, setVoteCount] = useState(1);

    useEffect(() => {
        if (!slug) return;

        const fetchArtist = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`/api/celebrities/${slug}`);

                if (!response.ok) {
                    throw new Error(`Error fetching artist with slug: ${slug}`);
                }

                const data = await response.json();

                if (!data || data.length === 0) {
                    throw new Error("Artist not found");
                }

                setArtist(data);
            } catch (err) {
                console.error(err);
                setError(err.message || "Failed to fetch artist.");
            } finally {
                setLoading(false);
            }
        };

        fetchArtist();
    }, [slug]);

    const handleVoteChange = (e) => {
        setVoteCount(e.target.value);
    };

    const handleVote = () => {
        alert(`You voted ${voteCount} times for ${artist.name}`);
    };

    const targetDate = "2024-09-30T23:59:59"; // example countdown date

    return (
        <main id="blog-one">
            <ToastContainer />
            <Cursor />
            {/* <Preloader /> */}

            <div id="blog-one-content">
                <Navigation />

                <CountdownTimer targetDate={targetDate} />

                <div className="center">
                    <div id="blogs-container">
                        {loading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p>{error}</p>
                        ) : artist ? (
                            <div className="blog fade-up">
                                <div className="blog-img">
                                    <img src={`${artist.image_url}`} alt="blog-img" />
                                </div>

                                <div className="blog-text">
                                    <div className="blog-heading">{artist.name}</div>

                                    <div className="blog-description">
                                        <input
                                            id="votes"
                                            type="number"
                                            min="1"
                                            value={voteCount}
                                            onChange={handleVoteChange}
                                            className="input-same-line"
                                            required
                                            style={{ marginTop: "0" }}
                                        />
                                        <br />
                                        4 Daily Free Tokens to Vote
                                    </div>

                                    <div className="blog-info">
                                        <div className="blog-duration" style={{color: "tomato"}}>
                                            <Link href={`/store`}>Buy Tokens</Link>
                                        </div>
                                    </div>

                                    <div className="blog-info">
                                        <div className="blog-duration">
                                            <img src="/images/dollar.png" alt="clock" style={{ height: "32px" }} />
                                            &nbsp; 0 tokens
                                        </div>

                                        <Link href={`/store`}>
                                            <button className="blog-read-more" onClick={handleVote}>
                                                VOTE
                                            </button>
                                        </Link>
                                    </div>
                                </div>

                                <div className="blog-date">{artist.votes} VOTES</div>
                            </div>
                        ) : (
                            <p>No artist found</p>
                        )}
                    </div>
                </div>

                <Headphone />
                <Progressbar />
            </div>

            <NavigationContent />
        </main>
    );
}
