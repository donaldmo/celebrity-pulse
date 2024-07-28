import React from "react";
import Navigation from "../components/Navigation";
import NavigationContnet from "../components/NavigationContent";
import Headphone from "../components/Headphone";

const Home = () => {
    return (
        <main id="index-one">
            {/* <!-- CUSTOM CURSOR --> */}
            {/* <div class="cursor scale"></div>
            <div class="cursor-two scale"></div> */}
            {/* <!-- CUSTOM CURSOR --> */}

            {/* <!-- HEADER --> */}
            <div id="header">
                <Navigation />

                <div class="social-media-links">
                    <ul>
                        <li><a href="#" data-text="Youtube" class="text hover">YT</a></li>
                        <li><a href="#" data-text="Facebook" class="text hover">FB</a></li>
                        <li><a href="#" data-text="Instagram" class="text hover">IG</a></li>
                    </ul>
                </div>

                <Headphone />

                <div class="new-release img text">
                    <img src="/images/album-thumbnail-one.jpg"
                        alt="new-release" />
                    <div class="song-details">
                        <div class="song-name">Blinding Lights</div>
                        <div class="singer-name">Arlo Brown Ft. Sza</div>
                        <div class="music-player">
                            <div class="play-song">
                                <img src="/images/play.png"
                                    alt="play" data-song="darkfire" class="hover/" />
                                <audio
                                    src="/music/The-Weeknd-Blinding-Lights-_Lyrics_.ogg"
                                    data-audio="darkfire"></audio>
                                {/* <!--LINK AND NAME OF AUDIO YOU WANT TO PLAY--> */}
                            </div>
                            <div class="all-songs">
                                <a href="songs-one.html" title="All Songs"><i class="gg-arrow-right"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <NavigationContnet />
        </main>
    )
}

export default Home;