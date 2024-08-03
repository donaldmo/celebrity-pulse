import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
    db, doc, getDoc, updateDoc
} from "../firebase";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Cursor from "../components/Cursor";
import Preloader from "../components/Preloader";
import Heading from "../components/Heading";
import Navigation from "../components/Navigation";
import Headphone from "../components/Headphone";
import Progressbar from "../components/Progressbar";
import NavigationContnet from "../components/NavigationContent";

const Vote = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [artist, setArtist] = useState(null);
    const [loading, setLoading] = useState(true);
    const [voteCount, setVoteCount] = useState(1);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const queryId = queryParams.get("id");

        if (!queryId) {
            navigate("/");
            return;
        }

        const fetchArtist = async () => {
            try {
                const docRef = doc(db, "artists", queryId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setArtist({ id: queryId, ...docSnap.data() });
                } else {
                    console.error("No such artist!");
                    navigate("/");
                }
            } catch (error) {
                console.error("Error fetching artist:", error);
                navigate("/");
            } finally {
                setLoading(false);
            }
        };

        fetchArtist();
    }, [location.search, navigate]);

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

    if (loading) {
        return <div>Loading...</div>; // Show loading state
    }

    return (
        <main id="blog-one">
            <Cursor />
            {/* <Preloader /> */}

            <div id="blog-one-content">
                <Heading title={"VOTE"} />
                <Navigation />

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
                                        />
                                    </div>

                                    <div class="blog-info">
                                        <div class="blog-duration">
                                            <img src="/images/clock.png" alt="clock" />
                                            &nbsp; 2 Min
                                        </div>

                                        <div class="blog-type">
                                            {artist.votes} Votes
                                        </div>

                                        <a href={"#vote"} title={`Vote for ${artist.name}`} onClick={handleVote}>
                                            <div class="blog-read-more">
                                                <i class="gg-arrow-right"></i>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div class="blog-date">02 Aug 23</div>
                            </div>
                        )}
                    </div>
                </div>

                <Headphone />
                <Progressbar />
            </div>

            <NavigationContnet />

            <ToastContainer />
        </main>
    )
}

export default Vote