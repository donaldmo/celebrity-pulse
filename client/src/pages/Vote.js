import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { db, collection, query, where, getDocs, doc, getDoc, updateDoc } from "../firebase";
import { useUser } from "../components/UserContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Cursor from "../components/Cursor";
import Preloader from "../components/Preloader";
import Heading from "../components/Heading";
import Navigation from "../components/Navigation";
import Headphone from "../components/Headphone";
import Progressbar from "../components/Progressbar";
import NavigationContnet from "../components/NavigationContent";
import CountdownTimer from "../components/CountdownTimer";

const Vote = () => {
    const { user } = useUser(); // Get the user from context
    const location = useLocation();
    const navigate = useNavigate();

    const [artist, setArtist] = useState(null);
    const [loading, setLoading] = useState(true);
    const [voteCount, setVoteCount] = useState(1);

    const [targetDate, setTargetDate] = useState(null);

    useEffect(() => {

        const queryParams = new URLSearchParams(location.search);
        const queryId = queryParams.get("id");

        if (!queryId) {
            navigate("/");
            return;
        }

        if (!user) {
            navigate(`/login?redirect=/vote?id=${queryId}`);
            return;
        }

        const fetchArtistAndEvent = async () => {
            try {
                const docRef = doc(db, "artists", queryId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setArtist({ id: queryId, ...docSnap.data() });
                } else {
                    console.error("No such artist!");
                    navigate("/");
                    return;
                }

                // Query the event collection to find the event with name "shining_star"
                const eventQuery = query(collection(db, "event"), where("name", "==", "shining_star"));
                const eventQuerySnapshot = await getDocs(eventQuery);

                if (!eventQuerySnapshot.empty) {
                    const eventData = eventQuerySnapshot.docs[0].data();
                    setTargetDate(eventData.targetDate);
                } else {
                    console.error("No event found with the name 'shining_star'!");
                }
            } catch (error) {
                console.error("Error fetching artist:", error);
                navigate("/");
            } finally {
                setLoading(false);
            }
        };

        fetchArtistAndEvent();
    }, [location.search, navigate, user]);

    const handleVote = async (event) => {
        event.preventDefault();

        if (!artist) return;

        try {
            const docRef = doc(db, "artists", artist.id);
            await updateDoc(docRef, {
                votes: artist.votes + voteCount
            });

            setArtist(prev => ({
                ...prev,
                votes: prev.votes + voteCount
            }));

            toast.success("Vote successfully submitted!"); // Show success toast
            setVoteCount(1);

        } catch (error) {
            console.error("Error updating votes:", error);
            toast.error("Error submitting vote. Please try again."); // Show error toast
        }
    };

    const handleVoteChange = (event) => {
        setVoteCount(parseInt(event.target.value, 10) || 1);
    };

    const handleBuy = (event) => {
        event.preventDefault();
        navigate("/store")
    }

    if (loading) {
        return <div>Loading...</div>; // Show loading state
    }

    const futureDate = '2024-09-30T23:59:59';

    return (
        <main id="blog-one">
            <ToastContainer />
            <Cursor />
            {/* <Preloader /> */}

            <div id="blog-one-content">
                <Navigation />

                <CountdownTimer targetDate={targetDate} />

                <div class="center">
                    <div id="blogs-container">
                        {artist && (
                            <div class="blog fade-up">
                                <div class="blog-img">
                                    <img src={`${artist.image_url}`} alt="blog-img" />
                                </div>

                                <div class="blog-text">
                                    <div class="blog-heading">{artist.name}</div>
                                    <div class="blog-description">
                                        <input
                                            id="votes"
                                            type="number"
                                            min="1"
                                            value={voteCount}
                                            onChange={handleVoteChange}
                                            className="input-same-line"
                                            required
                                            style={{ marginTop: "0" }}
                                        />
                                        <br />
                                        4 Daily Free Tokens to Vote
                                    </div>

                                    <div class="blog-info">
                                        <div class="blog-duration">
                                            <img src="/images/dollar.png" alt="clock"
                                                style={{ height: "32px" }}
                                            />
                                            &nbsp; 0 tokens
                                        </div>

                                        <a href={"#vote"} title={`Vote for ${artist.name}`} onClick={handleVote}>
                                            <div class="blog-read-more" style={{ padding: "0" }}>
                                                <button type="button" id="submit" class="hover"
                                                    style={{ margin: "0", padding: "10px" }}
                                                >
                                                    VOTE
                                                </button>
                                            </div>
                                        </a>
                                    </div>

                                    <div class="blog-info">
                                        <div class="blog-duration">
                                            Buy more tokens
                                        </div>

                                        <a href={"/store"} title={`Buy tokens`} onClick={handleBuy}>
                                            <div class="blog-read-more" >
                                                <i class="gg-arrow-right"></i>
                                            </div>
                                        </a>
                                    </div>

                                </div>
                                <div class="blog-date">
                                    {artist.votes} VOTES
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <Headphone />
                <Progressbar />
            </div>

            <NavigationContnet />
        </main>
    )
}

export default Vote