'use client'

import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Navigation from "@/components/Navigation";
import NavigationContnet from "@/components/NavigationContent";
import Loader from "@/components/Loader";
import { toast, Toaster } from 'react-hot-toast';
import UserProfileCard from "@/components/UserProfileCard";
import { sendLoginData } from "@/app/utils";

export default function Profile() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [userData, setUserData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (status === 'unauthenticated') {
            toast.error('You are not authenticated! Redirecting to login.', {
                duration: 2000,
                position: 'top-center',
            });

            router.push('/login');
        }
    }, [status, router]);

    useEffect(() => {
        async function sendAndSetUserData() {
            if (status === 'authenticated') {
                try {
                    const data = await sendLoginData(session);
                    console.log('Response Data: ', data);

                    setUserData(data)

                    // toast.success(`Logged in user: ${session.user.name}`, {
                    //     duration: 4000,
                    //     position: 'top-center',
                    // });

                } catch (error) {
                    console.log('Error: ', error)
                    toast.error('Failed to load user data.', {
                        duration: 2000,
                        position: 'top-center',
                    });

                    setError('Failed to load user data.');
                } finally {
                    setLoading(false);
                }
            }
        }

        sendAndSetUserData();

    }, [status, session]);

    const handleBuy = () => {
        router.push('/store');
    }

    return (
        <main id="songs-one">
            <div id="songs-one-content">
                <Toaster />
                <Navigation />
                <NavigationContnet />

                <div className="heading">
                    <div className="text">PROFILE</div>
                </div>

                <div className="center">
                    <div id="songs-container">
                        {loading && (<Loader />)}

                        {!loading && userData && (
                            <UserProfileCard userData={userData} />
                        )}
                    </div>
                </div>

                <div className="center">
                    <div id="songs-container">
                        {!loading && userData && (
                            <div className="song fade-up">
                                <div className="song-details">
                                    <div className="song-details-content">
                                        <div className="song-name">Free Tokens: <span style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                            4
                                        </span></div>
                                    </div>

                                    <div className="song-details-content">
                                        <div className="song-name">
                                            Purchased Tokens: <span style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                                {userData.tokens || 0}
                                            </span></div>
                                    </div>

                                    <div className="music-player">
                                        <div className="play-song mouse">
                                            <img src="/images/dollar.png" alt="dollar" />
                                        </div>

                                        <div className="download-song mouse">
                                            <button
                                                className="blog-read-more"
                                                onClick={handleBuy}
                                            >
                                                Buy Tokens
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </main>
    );
}
