import React, { useState, useEffect } from "react";
import { db, collection, getDocs } from "../firebase";

import Navigation from "../components/Navigation";
import NavigationContnet from "../components/NavigationContent";
import Progressbar from "../components/Progressbar";
import Headphone from "../components/Headphone";
import Preloader from "../components/Preloader";
import Heading from "../components/Heading";
import Card from "../components/Card";

const BlogTwo = () => {
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
        <main id="blog-two">
            <div class="cursor scale"></div>
            <div class="cursor-two scale"></div>

            <Preloader />

            <div id="blog-one-content">

                <div class="heading">
                    <span class="text">
                        CELEBRITES
                    </span>
                </div>

                <Navigation />

                <div className="center-para">
                    <div className="blog-text">
                        <div class="blog-heading text-scroll reveal" style={{ fontSize: "32px" }}>
                            THE MOST SHINING START IN THAILAND
                        </div>

                        <div class="para text-scroll reveal" style={{ fontSize: "18px" }}>
                            Voting period: Jul.14 - Aug.02 20:00 BKK
                        </div>
                    </div>
                </div>

                <div class="center">
                    <div id="blogs-container">
                        {artists.map((data, index) => (
                            <Card data={data} key={index} />
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

export default BlogTwo