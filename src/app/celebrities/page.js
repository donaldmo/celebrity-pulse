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


    return (
        <main id="songs-one">
            <Cursor />

            <div id="songs-one-content">
                <Navigation />

                <CountdownTimer targetDate={futureDate} />

                <div class="center">
                    <div id="songs-container">
                        {loading ? (
                            <>
                                <div class="p">
                                    <img src="/images/headphone.png" alt="headphone" />
                                </div>
                            </>
                        ) : artists.length === 0 ? (
                            <p>Nothing yet...</p>
                        ) : (
                            <ul>
                                {artists.slice(0, 10).map((artist) => (
                                    <div class="song fade-up" key={artist.id}>
                                        <div class="song-img">
                                            <img src={artist.image_url} alt={artist.name} />
                                        </div>

                                        <div class="song-details">
                                            <div class="song-details-content">
                                                <div class="song-name">{artist.name}</div>
                                                {/* <div class="artist-name">Arlo Brown Ft. Sza</div> */}
                                            </div>

                                            <div class="music-player">
                                                <div class="download-song mouse">
                                                    {artist.votes} votes
                                                </div>

                                                <div class="play-song mouse">
                                                    <Link href={`/celebrities/${createSlug(artist.name)}`}>
                                                        <button type="button" id="submit" class="hover" style={{ margin: "0px", padding: "8px", fontSize: "16px" }}>
                                                            VOTE
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                ))}
                            </ul>
                        )}

                    </div>
                </div>

                <Headphone />

                <div className="music-indicator">
                    <span style={{ '--i': 1 }} className="music-indicator-span"></span>
                    <span style={{ '--i': 2 }} className="music-indicator-span"></span>
                    <span style={{ '--i': 3 }} className="music-indicator-span"></span>
                    <span style={{ '--i': 4 }} className="music-indicator-span"></span>
                </div>

                <Progressbar />
            </div>

            <NavigationContent />
        </main>
    )
}