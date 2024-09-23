"use client"; // This ensures the component runs on the client side

import { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

import Navigation from '../../components/Navigation';
import NavigationContnet from '../../components/NavigationContent';

const Logout = () => {
    const [loading, setLoading] = useState(true);
    const [loggedOut, setLoggedOut] = useState(false);

    useEffect(() => {
        // This should run only on the client side
        const handleLogout = async () => {
            try {
                await signOut({ redirect: false }); // Prevent automatic redirection
                setLoggedOut(true); // Indicate that the user has logged out
            } catch (error) {
                console.error('Error during logout:', error);
            } finally {
                setLoading(false); // Set loading to false after signing out
            }
        };

        handleLogout(); // Call the logout function when component mounts
    }, []);

    return (
        <main id="songs-one">
            <div id="songs-one-content">
                <Navigation />
                <NavigationContnet />


                {loading ? (
                    <div className="heading">
                        <div className="text">Logging you out...</div>
                    </div>
                ) : loggedOut ? (
                    <div>
                        <h2>Logged Out Successfully!</h2>
                        <p>You've been successfully logged out. If you want to continue, please log in again.</p>
                        <Link href="/login">
                            <button style={{ padding: '10px 20px', fontSize: '16px' }}>Login Again</button>
                        </Link>
                    </div>
                ) : null}
            </div>
        </main>
    );
};

export default Logout;
