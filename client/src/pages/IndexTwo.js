import React from "react";
import SocialLinks from "../components/SocialLinks";
import Headphone from "../components/Headphone";
import Navigation from "../components/Navigation";
import NavigationContnet from "../components/NavigationContent";

const IndexTwo = () => {
    return (
        <main id="index-two">

            {/* <div class="cursor scale"></div>
            <div class="cursor-two scale"></div>


            <div id="preloader">
                <div class="p">
                    <img src="../../winkthemes.online/themes/music-template-free/template/images/headphone.png" alt="headphone"/>
                        Use Headphone For Better Experience
                </div>
            </div> */}

            <div id="header">
                <Navigation />

                <SocialLinks />

                <Headphone />

                <div class="new-release img">
                    <div class="new-release-content ">
                        <div class="new-release-img">
                            <img src="/images/album-thumbnail-one.jpg" alt="new release" />
                        </div>

                        <div class="new-release-info ">
                            <div class="new-release-name">
                                Blinding Lights
                            </div>
                            <div class="new-release-call-to-action">
                                <a href="songs-two.html"><button>STREAM</button></a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="all-songs-link">
                    <div class="all-song-link-text text hover">
                        <a href="songs-four.html">Stream All Songs</a>
                    </div>
                </div>
            </div>

            <NavigationContnet />
        </main>
    )
}

export default IndexTwo