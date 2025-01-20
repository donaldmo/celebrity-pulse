"use client"

import React, { Fragment, useEffect, useState } from "react";

import Link from "next/link";
import Navigation from "@/components/Navigation";
import CountdownTimer from "@/components/CountdownTimer";
import NavigationContnet from "@/components/NavigationContent";
import Loader from "@/components/Loader";


export default function SingleContest({ params }) {
    const MEDIA_BASE_URL = process.env.NEXT_PUBLIC_MEDIA_BASE_URL;

    const { id } = params;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [contest, setContest] = useState();

    const futureDate = '2024-09-30T23:59:59';

    useEffect(() => {
        const fetchContests = async (id) => {
            try {
                const response = await fetch(`/api/contests/${id}`);

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                const data = await response.json();
                console.log('Data: ', data)
                setContest(data)
            } catch (error) {
                console.log('Error: ', error)
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchContests(id)
        }

    }, []);

    const [targetDate, setTargetDate] = useState("2024-09-30T23:59:59"); // example countdown date

    return (
        <main id="songs-one">
            <div id="songs-one-content">
                <Navigation />
                <NavigationContnet />


                {!loading && contest && (
                    <Fragment>
                        <CountdownTimer targetDate={contest.ending_date} />

                        <div className="heading" style={{ paddingTop: '0' }}>
                            <div className="text" style={{ fontSize: '23px' }}>
                                {contest.name}
                            </div>
                        </div>
                    </Fragment>
                )}

                {loading && (
                    <div className="heading" style={{ paddingTop: '0' }}>
                        <div className="text" style={{ fontSize: '23px' }}>
                        </div>
                    </div>
                )}

                <div className="center">
                    <div id="songs-container">
                        {loading && <Loader />}

                        {!loading && contest?.celebrities && contest.celebrities.map(item => (
                            <div className="song fade-up" key={item.id}>
                                <div className="song-img">
                                    <img src={`${item.media}`} alt={item.name} />
                                </div>

                                <div className="song-details">
                                    <div className="song-details-content">
                                        <div className="song-name">{item.name}</div>
                                        <div className="song-name" style={{ color: "tomato" }}>
                                            {item.votes + " "} Votes
                                        </div>
                                    </div>

                                    <div className="music-player">
                                        <div className="play-song mouse">
                                            <Link href={`/contests/${id}/celebrity?id=${item._id}`}>
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
            </div>
        </main>
    )
}