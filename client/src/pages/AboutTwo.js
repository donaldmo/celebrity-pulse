import React from "react";
import Navigation from "../components/Headphone"
import NavigationContent from "../components/NavigationContent"
import Headphone from "../components/Headphone";

const AboutTwo = () => {
    return (
        <main id="about-two">
            <div id="about-two-content">
                <Navigation />

                <div class="progress-bar-container fade-in">
                    <div class="progressbar"></div>
                </div>

                <div class="about-img fade-in">
                </div>

                <div class="about-text">
                    <div class="about-text-heading fade-in">
                        Hi there, My name is Arlo Brown and I like to make music.
                    </div>
                    <div class="about-text-content fade-in">
                        For me, the greatest thing about being a musician is being in the position to inspire other people. I take such pleasure in hearing that people have been motivated to create after hearing my music, whether it be a painting, a poem, their own music or something completely different.
                    </div>
                    <div class="signature fade-in">
                        Arlo Brown.
                    </div>
                </div>
            </div>

            <Headphone />
            <NavigationContent />
        </main>
    )
}

export default AboutTwo