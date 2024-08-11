import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db, getDocs, doc, setDoc } from "../firebase";
import { useUser } from "../components/UserContext"

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SocialLinks from "../components/SocialLinks";
import Headphone from "../components/Headphone";
import Navigation from "../components/Navigation";
import NavigationContnet from "../components/NavigationContent";
import Preloader from "../components/Preloader";
import Cursor from "../components/Cursor";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { setUser } = useUser(); 

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState({
        displayName: '',
        email: '',
        photoURL: ''
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { displayName, email, photoURL } = user;
                setUserData({ displayName, email, photoURL });
                setUser(user);
                
                setIsLoggedIn(true);

                toast.success("Logged in successfully!");
            } else {
                setIsLoggedIn(false);
                setUserData({ displayName: '', email: '', photoURL: '' });
                setUser(null);  // Clear the user in the context
            }
        });

        return () => unsubscribe();
    }, [setUser]);

    const signUpUsingGoogle = (e) => {
        e.preventDefault();
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then(async (result) => {
                const { uid, displayName, email, photoURL } = result.user;
                const userRef = doc(db, "users", uid);

                setIsLoggedIn(true);
                setUserData({ displayName, email, photoURL });

                const userSnap = await getDocs(userRef);
                if (!userSnap.exists()) {
                    await setDoc(userRef, { displayName, email, photoURL });
                }

                toast.success("Logged in successfully!");
            })
            .catch((error) => {
                console.error("Error during sign-in:", error);
                toast.error("Failed to log in. Please try again.");
            });
    };

    const Logout = (e) => {
        e.preventDefault();

        signOut(auth)
            .then(() => {
                setIsLoggedIn(false);
                setUserData({ displayName: '', email: '', photoURL: '' });
            })
            .catch((error) => {
                console.error("Error during sign-out:", error);
            });
    };

    return (
        <main id="index-two">
            <ToastContainer />
            <Cursor />
            {/* <Preloader /> */}

            <div id="header">
                <Navigation />
                <SocialLinks />
                <Headphone />

                <div className="heading">
                    <span className="text">LOGIN</span>
                </div>

                <div className="new-release img">
                    {!isLoggedIn ? (
                        <div className="new-release-content">
                            <div className="new-release-info">
                                <div className="new-release-call-to-action">
                                    <button type="button" onClick={signUpUsingGoogle}>
                                        LOGIN
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="new-release-content">
                            <div className="new-release-info">
                                <div className="new-release-name">
                                    {userData.displayName}
                                </div>
                                <div className="new-release-call-to-action">
                                    <button type="button" onClick={Logout}>LOGOUT</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="all-songs-link">
                    <div className="all-song-link-text text hover">
                        <a href="songs-four.html">Please Login</a>
                    </div>
                </div>
            </div>

            <NavigationContnet />
        </main>
    );
};

export default Login;
