// src/Artists.js
import React, { useEffect, useState } from "react";
import { db, collection, getDocs, updateDoc, doc } from "./firebase";

const Artists = () => {
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
    <div>
      <h1>Artists</h1>
      {loading ? (
        <p>Loading...</p>
      ) : artists.length === 0 ? (
        <p>No artists available.</p>
      ) : (
        <ul>
          {artists.slice(0, 10).map((artist) => (
            <li key={artist.id}>
              <img src={artist.image_url} alt={artist.name} width="50" height="50" />
              <h2>{artist.name}</h2>
              <p>{artist.bio}</p>
              <p>Votes: {artist.votes}</p>
              <button onClick={() => voteForArtist(artist.id, artist.votes)}>
                Vote
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Artists;
