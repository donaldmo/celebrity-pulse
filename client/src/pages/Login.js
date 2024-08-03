import React, { useEffect, useState } from "react";
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db, getDocs, doc, setDoc } from "../firebase"

import SocialLinks from "../components/SocialLinks";
import Headphone from "../components/Headphone";
import Navigation from "../components/Navigation";
import NavigationContnet from "../components/NavigationContent";
import Preloader from "../components/Preloader";
import Cursor from "../components/Cursor";


const Login = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userData, setUserData] = useState({})

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (result) => {
            if (result) {
                const { displayName, email, photoURL } = result
                setUserData({ displayName, email, photoURL })

                setIsLoggedIn(true)
            } else {
                setIsLoggedIn(false)
            }
        })

        return () => unsubscribe();
    }, [])

    const signUpUsingGoogle = (e) => {
        e.preventDefault()
        const provider = new GoogleAuthProvider()

        signInWithPopup(auth, provider).then((result) => {
            const { uid, displayName, email, photoURL } = result.user
            const userRef = doc(db, "users", uid);

            setIsLoggedIn(true)
            setUserData({ displayName, email })

            getDocs(userRef).then(userSnap => {
                if (!userSnap.exists()) {
                    setDoc(userRef, { displayName, email, photoURL });
                }
            });
        }).catch((error) => {
            console.log(error)
        })
    }

    const Logout = (e) => {
        e.preventDefault()

        signOut(auth).then(() => {
            setIsLoggedIn(false)
            setUserData({})
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <main id="index-two">
            <Cursor />

            <Preloader />

            <div id="header">
                <Navigation />

                <SocialLinks />

                <Headphone />

                <div class="heading">
                    <span class="text">
                        LOGIN
                    </span>
                </div>

                <div className="new-release img">
                    {!isLoggedIn ? (
                        <div className="new-release-content">
                            <div className="new-release-info">
                                <div className="new-release-call-to-action">
                                    <button onClick={signUpUsingGoogle}>LOGIN</button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="new-release-content">
                            <div className="new-release-img">
                                <img src={"/images/album-thumbnail-one.jpg"} alt="User" />
                            </div>
                            <div className="new-release-info">
                                <div className="new-release-name">
                                    {userData.displayName}
                                </div>
                                <div className="new-release-call-to-action">
                                    <button onClick={Logout}>LOGOUT</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div class="all-songs-link">
                    <div class="all-song-link-text text hover">
                        <a href="songs-four.html">Please Login</a>
                    </div>
                </div>
            </div>

            <NavigationContnet />
        </main>
    )
}

export default Login