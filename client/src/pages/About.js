import React from 'react'
import Navigation from '../components/Navigation'
import NavigationContent from '../components/NavigationContent'
import Headphone from '../components/Headphone'

const About = () => {
    return (
        <main id="about-one">
            <div id="about-one-content">
                <Navigation />

                <div class="progress-bar-container fade-in">
                    <div class="progressbar"></div>
                </div>

                <div class="scrolling-part">
                </div>

                <div class="heading">
                    <span class="text">
                        ABOUT
                    </span>
                </div>

                <div class="center">
                    <div class="about-img img">
                        <img class="img-parallax" src="/images/about-img.jpg" alt="about-img" />
                    </div>
                </div>

                <div class="center">
                    <div class="about-text">
                        <div class="about-text-heading  text-scroll">
                            Hi there, I'm glad you found me. My name is <span class="red"> Arlo Brown</span> and I like to make music.
                        </div>
                        <div class="about-text-content  text-scroll">
                            On this page you can find out what I have been up to lately and maybe even a little bit about where I will go in the future. For me, the greatest thing about being a musician is being in the position to inspire other people. I take such pleasure in hearing that people have been motivated to create after hearing my music, whether it be a painting, a poem, their own music or something completely different. Music is not a one way street, it is a conversation where the listener's role is as important as the artist's. Well, here you can find my side of it all.
                        </div>
                    </div>
                </div>

                <div class="signature">
                    <span class="text-scroll"> Arlo Brown.</span>
                </div>

                <Headphone />
            </div>

            <NavigationContent />
        </main>
    )
}

export default About;