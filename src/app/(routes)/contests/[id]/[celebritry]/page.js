"use client";

import React, { useEffect, useState, Fragment } from "react";
import Link from "next/link";
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { useSearchParams, useParams } from 'next/navigation'
import { toast, Toaster } from 'react-hot-toast';

import Navigation from "@/components/Navigation";
import Headphone from "@/components/Headphone";
import NavigationContent from "@/components/NavigationContent";
import CountdownTimer from "@/components/CountdownTimer";
import Loader from "@/components/Loader";
import { sendLoginData } from "@/app/utils";


export default function SingleCelebrity() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [userData, setUserData] = useState();

    const params = useParams();
    const searchParams = useSearchParams();

    const contestId = params.id;
    const queryId = searchParams.get('id');

    const [contest, setContest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [voteCount, setVoteCount] = useState(1);

    useEffect(() => {
        const authenticate = async () => {
            if (status === 'unauthenticated') {
                await signIn('google', { callbackUrl: window.location.href });
            }

            if (status === 'authenticated') {
                if (!session) {
                    return router.push('/logout')
                }

                const data = await sendLoginData(session)
                setUserData(data)
            }
        }

        authenticate();
    }, [status, router, session]);

    useEffect(() => {
        const fetchContest = async () => {
            try {
                const response = await fetch(`/api/contests/${contestId}?celebrity=${queryId}`);

                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();

                if (!data.celebrities) {
                    throw new Error('No celebrity found in the contest.');
                }

                setContest(data);
            } catch (err) {
                setError(err.message || 'An unknown error occurred.');
            } finally {
                setLoading(false)
            }
        };

        if (userData) {
            fetchContest();
        }
    }, [userData, contestId, queryId]);

    const celebrity = contest?.celebrities[0];

    const handleVoteChange = (e) => {
        setVoteCount(e.target.value);
    };

    const handleVote = async () => {
        const token = session?.accessToken;

        try {
            const response = await fetch('/api/vote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    celebrityId: celebrity._id,
                    voteCount,
                    contestId
                }),
            });

            if (!response.ok) {
                const resultError = await response.json();
                console.log('Response Error: ', resultError.error)
                throw new Error(resultError.error);
            }

            const data = await response.json();

            setContest(data)
            setVoteCount(0)

            toast.success('Voted successfully!', {
                duration: 4000,
                position: 'top-center',
            });
        } catch (error) {
            console.log('Error: ', error.message)

            toast.error(error.message, {
                duration: 4000,
                position: 'top-center',
            });
        }
    };

    return (
        <main id="blog-one">

            <div id="blog-one-content">
                <Navigation />
                <Toaster />

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
                    <div id="blogs-container">
                        {loading && <Loader />}

                        {!loading && contest && contest.celebrities.length && (
                            <div className="blog fade-up">
                                <div className="blog-img">
                                    <img src={`${contest.celebrities[0].media}`} alt="blog-img" />
                                </div>

                                <div className="blog-text">
                                    <div className="blog-heading">
                                        {celebrity.name}
                                    </div>

                                    <div className="blog-description">
                                        <input
                                            id="votes"
                                            type="number"
                                            min="1"
                                            value={voteCount}
                                            onChange={handleVoteChange}
                                            className="input-same-line"
                                            required
                                            style={{ marginTop: "0", border: '1px solid white', borderRadius: '8px' }}
                                        />
                                        <br />
                                        Input token amount to use to vote
                                    </div>

                                    <div className="blog-info">
                                        <div className="blog-duration" style={{ color: "tomato" }}>
                                            <Link href={`/store`}>Buy Tokens</Link>
                                        </div>
                                    </div>

                                    <div className="blog-info">
                                        <div className="blog-duration">
                                            <img
                                                src="/images/dollar.png"
                                                alt="clock"
                                                style={{ height: "32px" }}
                                            />
                                            &nbsp; 0 tokens
                                        </div>

                                        <button className="blog-read-more"
                                            onClick={handleVote}
                                        >
                                            VOTE
                                        </button>
                                    </div>

                                    <div className="blog-description">
                                        4 Daily Free Tokens to Vote
                                    </div>
                                </div>

                                <div className="blog-date">
                                    {contest?.votes[0].voteCount | 0} VOTES
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {!loading && userData && (
                    <Headphone image={userData.image} />
                )}
            </div>

            <NavigationContent />
        </main>
    );
}
