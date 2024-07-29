import React, { useEffect, useState } from "react";
import { db, collection, getDocs, updateDoc, doc } from "../firebase";
import Navigation from "../components/Navigation"
import NavigationContent from "../components/NavigationContent";

const Songs = () => {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);

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

    const voteForArtist = async (id, currentVotes) => {
        try {
            const artistDoc = doc(db, "artists", id);
            await updateDoc(artistDoc, { votes: currentVotes + 1 });
            fetchArtists();
        } catch (error) {
            console.error("Error updating artist votes:", error);
        }
    };

    return (
        <main id="songs-one">
            <div id="songs-one-content">
                <Navigation />

                <div class="heading">
                    <div class="text">
                        CELEBRITIES
                    </div>
                </div>

                <div class="center">
                    <div id="songs-container">
                        {loading ? (
                            <p>Loading...</p>
                        ) : artists.length === 0 ? (
                            <p>No artists available.</p>
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
                                                <div class="play-song mouse">
                                                    <img src="/images/vote-white.png" alt="play" data-song="blindinglights" />

                                                    <audio data-audio="blindinglights">
                                                        <source
                                                            src="/music/The-Weeknd-Blinding-Lights-_Lyrics_.ogg"
                                                            type="audio/ogg" />
                                                        <source src="music/The Weeknd - Blinding Lights (Lyrics).mp3" type="audio/mp3" />
                                                    </audio>
                                                </div>

                                                <div class="download-song mouse">
                                                    <a href="music/The Weeknd - Blinding Lights (Lyrics).mp3"
                                                        download="Blinding Lights - Arlo Brown">{artist.votes}
                                                        votes
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

                <div class="headphone img text">
                    <img src="/images/headphone.png"
                        title="headphone zone" class="text" alt="headphone" />
                </div>

                <div className="music-indicator">
                    <span style={{ '--i': 1 }} className="music-indicator-span"></span>
                    <span style={{ '--i': 2 }} className="music-indicator-span"></span>
                    <span style={{ '--i': 3 }} className="music-indicator-span"></span>
                    <span style={{ '--i': 4 }} className="music-indicator-span"></span>
                </div>

                <div class="progress-bar-container fade-in">
                    <div class="progressbar"></div>
                </div>
            </div>

            <NavigationContent />
        </main>
    )
}

export default Songs