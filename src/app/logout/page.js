"use client"; // This ensures the component runs on the client side

import { useEffect, useState, useRef } from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

import Navigation from '../../components/Navigation';
import NavigationContnet from '../../components/NavigationContent';
import Loader from '../../components/Loader'
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const Logout = () => {
    const [loading, setLoading] = useState(true);
    const [loggedOut, setLoggedOut] = useState(false);
    const router = useRouter();

    useEffect(() => {

        const handleLogout = async () => {
            try {
                await signOut({ redirect: false });

                // toast.success('Successfully Logged out!', {
                //     duration: 2000,
                //     position: 'top-center'
                // });

                setLoggedOut(true);
            } catch (error) {
                toast.error('Error during logout');
            } finally {
                setLoading(false);
            }
        };

        handleLogout(); // Call the logout function when component mounts
    }, []);

    const handleLogin = async () => {
        await signIn('google');
        router.push('/store');
    };

    return (
        <main id="songs-one">
            <div id="songs-one-content">
                <Navigation />
                <NavigationContnet />

                <div className="heading">
                    <div className="text">LOGOUT</div>
                </div>

                {loading && (<Loader />)}

                {!loading && loggedOut && (<>
                    <div className="center" style={{ color: "white" }}>
                        <p>You have Successfully logged out.</p>
                    </div>


                    <div className="center">
                        <button
                            onClick={handleLogin}
                            style={{ padding: '10px 20px', fontSize: '16px' }}
                        >
                            Login with Google
                        </button>
                    </div>
                </>)}
            </div>
        </main>
    );
};

export default Logout;
