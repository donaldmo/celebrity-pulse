import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { db, collection, getDocs, updateDoc, doc } from "../firebase";
import Navigation from "../components/Navigation"
import NavigationContent from "../components/NavigationContent";
import CountdownTimer from "../components/CountdownTimer";
import Progressbar from "../components/Progressbar";
import Headphone from "../components/Headphone";

const Songs = () => {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const futureDate = '2024-09-30T23:59:59';

    useEffect(() => {
        fetchArtists();
    }, []);

    const fetchArtists = async () => {
        setLoading(true);
        try {
            const artistsCollection = collection(db, "artists");
            const artistsSnapshot = await getDocs(artistsCollection);

            const artistsList = artistsSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setArtists(artistsList.sort((a, b) => b.votes - a.votes));
        } catch (error) {
            console.error("Error fetching artists:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleVoteClick = (id) => {
        navigate(`/vote?id=${id}`);
    };

    return (
        <main id="songs-one">
            <div id="songs-one-content">
                <Navigation />

                <CountdownTimer targetDate={futureDate} />

                <div class="center">
                    <div id="songs-container">
                        {loading ? (
                            <p>Loading...</p>
                        ) : artists.length === 0 ? (
                            <p>Nothing yet...</p>
                        ) : (
                            <ul>
                                {artists.slice(0, 10).map((artist) => (
                                    <div class="song fade-up" key={artist.id}>
                                        <div class="song-img">
                                            <img src={artist.image_url} alt={artist.name} />
                                        </div>

                                        <div class="song-details">
                                            <div class="song-details-content">
                                                <div class="song-name">{artist.name}</div>
                                                {/* <div class="artist-name">Arlo Brown Ft. Sza</div> */}
                                            </div>

                                            <div class="music-player">
                                                <div class="download-song mouse">

                                                    {artist.votes} votes
                                                </div>

                                                <div class="play-song mouse">
                                                    <a href={`/vote?id=${artist.id}`}
                                                        title={`${artist.name}`}
                                                        onClick={() => handleVoteClick(artist.id)}>
                                                        <button type="button" id="submit" class="hover" style={{ margin: "0px", padding: "8px", fontSize: "16px" }}>VOTE</button>
                                                    </a>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                ))}
                            </ul>
                        )}

                    </div>
                </div>

                <Headphone />

                <div className="music-indicator">
                    <span style={{ '--i': 1 }} className="music-indicator-span"></span>
                    <span style={{ '--i': 2 }} className="music-indicator-span"></span>
                    <span style={{ '--i': 3 }} className="music-indicator-span"></span>
                    <span style={{ '--i': 4 }} className="music-indicator-span"></span>
                </div>

                <Progressbar />
            </div>

            <NavigationContent />
        </main>
    )
}

export default Songs