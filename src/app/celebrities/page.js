"use client"

import React, { useEffect, useState } from "react";
import { createSlug } from "../utils";
import Link from "next/link";
import Navigation from "../../components/Navigation";
import NavigationContent from "../../components/NavigationContent";
import CountdownTimer from "../../components/CountdownTimer";
import Progressbar from "../../components/Progressbar";
import Headphone from "../../components/Headphone";
import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";
import NavigationContnet from "../../components/NavigationContent";


export default function Celebrities() {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const futureDate = '2024-09-30T23:59:59';

    useEffect(() => {
        const fetchArtists = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch("/api/celebrities");

                if (!response.ok) {
                    // If response status is not 200-299
                    throw new Error(`Error: ${response.status}`);
                }

                const data = await response.json();

                if (!data || data.length === 0) {
                    setError("No artists found");
                    setArtists([]);
                } else {
                    setArtists(data);
                }

            } catch (err) {
                console.error("Error fetching artists:", err);
                setError(err.message || "An error occurred while fetching the artists.");
            } finally {
                setLoading(false);
            }
        };

        fetchArtists();
    }, []);

    const [targetDate, setTargetDate] = useState("2024-09-30T23:59:59"); // example countdown date

    return (
        <main id="songs-one">
            <Cursor />

            <Preloader />

            <div id="songs-one-content">
                <Navigation />
                <NavigationContnet />

                <div className="heading">
                    {/* <div className="text">CELEBRITIES</div><br /> */}
                    <CountdownTimer targetDate={targetDate} />
                </div>

                <div className="center">
                    <div id="songs-container">
                        {artists.map(artist => (
                            <div className="song fade-up" key={artist.id}>
                                <div className="song-img">
                                    <img src={`/images/artists/${artist.image_url}`} alt={artist.name} />
                                </div>

                                <div className="song-details">
                                    <div className="song-details-content">
                                        <div className="song-name">{artist.name}</div>
                                        <div className="song-name" style={{ color: "tomato" }}>
                                            {artist.votes + " "} Votes
                                        </div>
                                    </div>

                                    <div className="music-player">
                                        <div className="play-song mouse">
                                            <Link href={`/celebrities/${artist.slug}`}>
                                                <button className="blog-read-more">
                                                    Vote
                                                </button>
                                            </Link>
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
                    <span
                        style={{ "--i": 1 }}
                        className="music-indicator-span"
                    ></span>
                    <span
                        style={{ "--i": 2 }}
                        className="music-indicator-span"
                    ></span>
                    <span
                        style={{ "--i": 3 }}
                        className="music-indicator-span"
                    ></span>
                    <span
                        style={{ "--i": 4 }}
                        className="music-indicator-span"
                    ></span>
                </div>

                <div className="progress-bar-container fade-in">
                    <div className="progressbar"></div>
                </div>
            </div>
        </main>
    )
}