import React from "react";
import NavigationContnet from "../components/NavigationContent";
import Progressbar from "../components/Progressbar";
import Headphone from "../components/Headphone";
import { useNavigate } from 'react-router-dom';
import Navigation from "../components/Navigation";
import Preloader from "../components/Preloader";
import CountdownTimer from "../components/CountdownTimer";

const BlogSingle = () => {
    const navigate = useNavigate();
    const futureDate = '2024-09-30T23:59:59';

    const handleClick = (event) => {
        event.preventDefault();
        navigate(`/celebrities`);
    };

    return (
        <main id="blog-single">
            <div class="cursor scale"></div>
            <div class="cursor-two scale"></div>

            <Preloader />

            <div id="blog-single-content">
                <Navigation />

                <CountdownTimer targetDate={futureDate} />

                <div class="center">
                    <div class="blog-img img">
                        <img src="/images/main-bg-three.jpg" style={{ maxWidth: "780px" }} alt="blog-img" />
                    </div>

                    <div class="center-para">
                        <div class="blog-text">
                            <div class="blog-info">
                                <div class="blog-date text-scroll">
                                    Jul.14 - Aug.02 20:00 BKK
                                </div>

                                <div class="blog-duration img-scroll text-scroll"
                                    style={{ paddingTop: "0px" }}
                                >
                                    <img src="/images/clock.png" alt="clock" />&nbsp;
                                    Voting period
                                </div>
                            </div>

                            <div class="blog-heading text-scroll">
                                The Most Shining Star in Thailand
                            </div>

                            <div class="para text-scroll">
                                We're thrilled to announce the commencement of the 2024 The Most Shining Star in Thailand selection.
                            </div>

                            <div class="blog-text-img">
                                <div class="img-scroll">
                                    <img src="/images/album-thumbnail-four.jpg" alt="img" />
                                </div>

                                <div class="img-scroll">
                                    <img src="/images/album-thumbnail-five.jpg" alt="img" />
                                </div>
                            </div>

                            <div class="para text-scroll italic ">
                                <i>"the ultimate winner will be determined by you, dear fans, through voting."</i>
                            </div>

                            <div class="para text-scroll">
                                <button type="button" id="submit" class="hover"
                                    style={{ margin: "0", padding: "10px" }}
                                    onClick={handleClick}
                                >
                                    SEE FULL LIST
                                </button>
                            </div>

                            <div class="share-links para">
                                <ul>
                                    <li class="text-scroll">Share:</li>
                                    <li><a href="#" class="text-scroll hover ">YT</a></li>
                                    <li><a href="#" class="text-scroll hover ">FB</a></li>
                                    <li><a href="#" class="text-scroll hover ">IG</a></li>
                                </ul>
                            </div>

                            <div class="signature">
                                <span class="text-scroll"> SEE FULL LIST</span>
                            </div>
                        </div>
                    </div>
                </div>

                <Headphone />
                <Progressbar />
            </div>

            <NavigationContnet />
        </main>
    )
}

export default BlogSingle