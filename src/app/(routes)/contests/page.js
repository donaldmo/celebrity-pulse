"use client"

import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import NavigationContnet from '@/components/NavigationContent';
import Loader from '@/components/Loader';
import Cursor from '@/components/Cursor';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


function Contests() {
    const MEDIA_BASE_URL = process.env.NEXT_PUBLIC_MEDIA_BASE_URL;

    const router = useRouter()

    const [contests, setContest] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchContests = async () => {
            try {
                const response = await fetch("/api/contests");

                if (!response.ok) {
                    throw new Error('Error, Something wrong happned!')
                }

                const data = await response.json();
                console.log('Data: ', data)
                setContest(data)

            } catch (error) {
                console.log(error)
                setError(error.message)
            } finally {
                setLoading(false);
            }
        };

        fetchContests();
    }, []);



    return (
        <main id="songs-two">
            <Cursor />

            <div id="songs-two-content">
                <Navigation />
                <NavigationContnet />

                <div className="heading">
                    <div className="text">
                        CONTESTS
                    </div>
                </div>

                <div className="center">
                    <div id="songs-container">
                        {loading && <Loader />}

                        {!loading && contests.length && contests.map((song, index) => (
                            <div className="song fade-up" key={index}>
                                <div className="song-img">
                                    <img src={`${song.media}`} alt="blog-img" />
                                </div>

                                <div className="song-details">
                                    <div className="song-details-content">
                                        <div className="song-name" style={{ fontSize: '18px' }}>
                                            {song.name}
                                        </div>

                                        <div className="artist-name" style={{ fontSize: '16px' }}>
                                            23 Nov,19 to 23 Dec,19
                                        </div>
                                    </div>

                                    <div className="music-player">
                                        <div className="play-song mouse">
                                            <Link href={`/contests/${song._id}`}>
                                                <img
                                                    src="/images/play.png"
                                                    alt="play"
                                                />
                                            </Link>
                                        </div>

                                        <div className="download-song">
                                            <button className="blog-read-more"
                                                style={{ fontSize: '13px' }}
                                                onClick={() => router.push(`/contests/${song._id}`)}
                                            >
                                                View Celebrities
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Contests
