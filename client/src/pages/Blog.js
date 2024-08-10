import React, { useState, useEffect } from "react";
import { db, collection, getDocs } from "../firebase";

import Cursor from "../components/Cursor";
import Preloader from "../components/Preloader";
import Heading from "../components/Heading";
import Navigation from "../components/Navigation";
import BlogCard from "../components/BlogCard";
import Headphone from "../components/Headphone";
import Progressbar from "../components/Progressbar";
import NavigationContnet from "../components/NavigationContent";
import CountdownTimer from "../components/CountdownTimer";

const Blog = () => {
    const futureDate = '2024-09-30T23:59:59';
    const [loading, setLoading] = useState(true);
    const [artists, setArtists] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            try {
                const artistsCollectionRef = collection(db, "artists");
                const artistSnapshot = await getDocs(artistsCollectionRef);
                const artistList = artistSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setArtists(artistList);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <main id="blog-one">
            {/* <Cursor />

            <Preloader /> */}

            <div id="blog-one-content">
                <CountdownTimer targetDate={futureDate} />

                <Navigation />

                <div class="center">
                    <div id="blogs-container">
                        {artists.map((data, index) => (
                            <BlogCard key={index} data={data} />
                        ))}

                    </div>
                </div>

                <Headphone />

                <Progressbar />
            </div>

            <NavigationContnet />
        </main>
    )
}

export default Blog