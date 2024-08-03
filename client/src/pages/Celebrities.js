import React from "react"
import Cursor from "../components/Cursor"
import Preloader from "../components/Preloader"
import Navigation from "../components/Navigation"
import Heading from "../components/Heading"
import Headphone from "../components/Headphone"
import Progressbar from "../components/Progressbar"
import MusicIndicator from "../components/MusicIndicator"
import NavigationContnet from "../components/NavigationContent"
import BlogCard from "../components/BlogCard"

const Celebrities = () => {
    return (
        <main id="songs-one" className="blog-one">
            <Cursor />

            <Preloader />
            {/* 
            <div id="blog-one-content">
                <div class="center">
                    <div id="blogs-container">
                        <BlogCard />
                    </div>
                </div>
            </div> */}

            <div id="songs-one-content">
                <Navigation />

                <Heading title={"CELEBRITIES"} />
                <main id="blog-one">
                    <div id="blog-one-content">
                        <div class="center">
                            <div id="blogs-container">
                                <div class="blog fade-up">
                                    <div class="blog-img">
                                        <img src="/images/about-img.jpg" alt="blog-img" />
                                    </div>

                                    <div class="blog-text">
                                        <div class="blog-heading" style={{ fontSize: '22px' }}>
                                            HOW IT STARTED
                                        </div>

                                        <div class="blog-description">
                                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo voluptas ea voluptatum itaque? Eaque vitae eveniet sequi alias laborum exercitationem veritatis, nam ut officiis a aliquam tempore atque blanditiis quaerat....
                                        </div>

                                        <div class="blog-info">
                                            <div class="blog-duration">
                                                <img src="/images/clock.png" alt="clock" />
                                                &nbsp; 4 Min
                                            </div>

                                            <div class="blog-type" style={{ fontSize: '15px' }}>
                                                Story/Experience
                                            </div>

                                            <a href="blog-single.html" title="Read More">
                                                <div class="blog-read-more">
                                                    <i class="gg-arrow-right"></i>
                                                </div>
                                            </a>
                                        </div>
                                    </div>

                                    <div class="blog-date">
                                        3 Aug,20
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </main>

                <div class="center">
                    <div id="songs-container">
                        <div class="song fade-up">
                            <div class="song-img">
                                <img src="/images/album-thumbnail-one.jpg" alt="song" />
                            </div>

                            <div class="song-details">
                                <div class="song-details-content">
                                    <div class="song-name">Blinding Lights</div>
                                    <div class="artist-name">Arlo Brown Ft. Sza</div>
                                </div>
                                <div class="music-player">

                                    <div class="play-song mouse">
                                        <img src="/images/play.png" alt="play" data-song="blindinglights" />

                                        <audio data-audio="blindinglights">
                                            <source src="/music/The-Weeknd-Blinding-Lights-_Lyrics_.ogg" type="audio/ogg" />
                                            <source src="music/The Weeknd - Blinding Lights (Lyrics).mp3" type="audio/mp3" />
                                        </audio>
                                    </div>
                                    <div class="download-song mouse">
                                        <a href="music/The Weeknd - Blinding Lights (Lyrics).mp3" download="Blinding Lights - Arlo Brown">4.1K<img src="/images/download.png" alt="download" /></a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="song fade-up">
                            <div class="song-img">
                                <img src="/images/album-thumbnail-two.jpg" alt="song" />
                            </div>
                            <div class="song-details">
                                <div class="song-details-content">
                                    <div class="song-name">KillMonger</div>
                                    <div class="artist-name">Arlo Brown Ft. Madhw</div>
                                </div>
                                <div class="music-player">
                                    <div class="play-song mouse">

                                        <img src="/images/play.png" alt="play" data-song="killmonger" />

                                        <audio data-audio="killmonger">
                                            <source src="/music/killmonger.ogg" type="audio/ogg" />
                                            <source src="music/killmonger.mp3" type="audio/mp3" />
                                        </audio>
                                    </div>
                                    <div class="download-song">
                                        <a href="music/killmonger.mp3" download="KillMonger - Arlo Brown">10.2K<img src="/images/download.png" alt="download" /></a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="song fade-up">
                            <div class="song-img">
                                <img src="/images/album-thumbnail-five.jpg" alt="song" />
                            </div>

                            <div class="song-details">
                                <div class="song-details-content">
                                    <div class="song-name">Alone</div>
                                    <div class="artist-name">Arlo Brown </div>
                                </div>
                                <div class="music-player">

                                    <div class="play-song mouse">
                                        <img src="/images/play.png" alt="play" data-song="alone" />


                                        <audio data-audio="alone">
                                            <source src="/music/old-town-road.ogg" type="audio/ogg" />
                                            <source src="/music/old-town-road.mp3" type="audio/mp3" />
                                        </audio>
                                    </div>

                                    <div class="download-song">
                                        <a href="music/old-town-road.mp3" download="Alone - Arlo Brown">3.3K<img src="/images/download.png" alt="download" /></a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="song fade-up">
                            <div class="song-img">
                                <img src="/images/album-thumbnail-four.jpg" alt="song" data-song="blindinglights" class="play" />
                            </div>

                            <div class="song-details">
                                <div class="song-details-content">
                                    <div class="song-name">What's Poppin</div>
                                    <div class="artist-name">Arlo Brown Ft. Charlie Puth</div>
                                </div>
                                <div class="music-player">

                                    <div class="play-song mouse">
                                        <img src="/images/play.png" alt="play" data-song="whatspoppin" />


                                        <audio data-audio="whatspoppin">
                                            <source src="/music/The-Weeknd-Blinding-Lights-_Lyrics_.ogg" type="audio/ogg" />
                                            <source src="music/The Weeknd - Blinding Lights (Lyrics).mp3" type="audio/mp3" />
                                        </audio>
                                    </div>

                                    <div class="download-song">
                                        <a href="music/The Weeknd - Blinding Lights (Lyrics).mp3" download="What's Poppin- Arlo Brown">2K<img src="/images/download.png" alt="download" /></a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="song fade-up">
                            <div class="song-img">
                                <img src="/images/album-thumbnail-three.jpg" alt="song" />
                            </div>

                            <div class="song-details">
                                <div class="song-details-content">
                                    <div class="song-name">The BOX</div>
                                    <div class="artist-name">Arlo Brown </div>
                                </div>
                                <div class="music-player">

                                    <div class="play-song mouse">
                                        <img src="/images/play.png" alt="play" data-song="thebox" />

                                        <audio data-audio="thebox">
                                            <source src="/music/old-town-road.ogg" type="audio/ogg" />
                                            <source src="/music/old-town-road.mp3" type="audio/mp3" />
                                        </audio>
                                    </div>
                                    <div class="download-song">
                                        <a href="music/old-town-road.mp3" download="The BOX - Arlo Brown">3.1K<img src="/images/download.png" alt="download" /></a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="song fade-up">
                            <div class="song-img">
                                <img src="/images/album-thumbnail-six.jpg" alt="song" />
                            </div>

                            <div class="song-details">
                                <div class="song-details-content">
                                    <div class="song-name">Shatter</div>
                                    <div class="artist-name">Justin Timberlake Ft. Arlo Brown</div>
                                </div>
                                <div class="music-player">

                                    <div class="play-song mouse">
                                        <img src="/images/play.png" alt="play" data-song="shatter" />

                                        <audio data-audio="shatter">
                                            <source src="/music/killmonger.ogg" type="audio/ogg" />
                                            <source src="music/killmonger.mp3" type="audio/mp3" />
                                        </audio>
                                    </div>

                                    <div class="download-song">
                                        <a href="music/killmonger.mp3" download="Shatter - Arlo Brown">2.8K<img src="/images/download.png" alt="download" /></a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="song fade-up">
                            <div class="song-img">
                                <img src="/images/album-thumbnail-seven.jpg" alt="song" />
                            </div>

                            <div class="song-details">
                                <div class="song-details-content">
                                    <div class="song-name">Cool Blue</div>
                                    <div class="artist-name">Arlo Brown</div>
                                </div>
                                <div class="music-player">

                                    <div class="play-song mouse">
                                        <img src="/images/play.png" alt="play" data-song="coolblue" />

                                        <audio data-audio="coolblue">
                                            <source src="/music/old-town-road.ogg" type="audio/ogg" />
                                            <source src="/music/old-town-road.mp3" type="audio/mp3" />
                                        </audio>
                                    </div>


                                    <div class="download-song">
                                        <a href="music/old-town-road.mp3" download="Cool Blue - Arlo Brown">963<img src="/images/download.png" alt="download" /></a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="song fade-up">
                            <div class="song-img">
                                <img src="/images/album-thumbnail-eight.jpg" alt="song" />
                            </div>

                            <div class="song-details">
                                <div class="song-details-content">
                                    <div class="song-name">Dark Fire</div>
                                    <div class="artist-name">Arlo Brown Ft. Sza</div>
                                </div>
                                <div class="music-player">

                                    <div class="play-song mouse">
                                        <img src="/images/play.png" alt="play" data-song="darkfire" />

                                        <audio data-audio="darkfire">
                                            <source src="/music/The-Weeknd-Blinding-Lights-_Lyrics_.ogg" type="audio/ogg" />
                                            <source src="music/The Weeknd - Blinding Lights (Lyrics).mp3" type="audio/mp3" />
                                        </audio>
                                    </div>


                                    <div class="download-song">
                                        <a href="music/The Weeknd - Blinding Lights (Lyrics).mp3" download="Dark Fire - Arlo Brown">1.8K<img src="/images/download.png" alt="download" /></a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="song fade-up">
                            <div class="song-img">
                                <img src="/images/album-thumbnail-nine.jpg" alt="song" />
                            </div>
                            <div class="song-details">
                                <div class="song-details-content">
                                    <div class="song-name">The Other Side</div>
                                    <div class="artist-name">Arlo Brown </div>
                                </div>
                                <div class="music-player">

                                    <div class="play-song mouse">
                                        <img src="/images/play.png" alt="play" data-song="theotherside" />

                                        <audio data-audio="theotherside">
                                            <source src="/music/killmonger.ogg" type="audio/ogg" />
                                            <source src="music/killmonger.mp3" type="audio/mp3" />
                                        </audio>
                                    </div>
                                    <div class="download-song">
                                        <a href="music/killmonger.mp3" download="The Other Side - Arlo Brown">2.2K<img src="/images/download.png" alt="download" /></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Headphone />

                <MusicIndicator />

                <Progressbar />
            </div>

            <NavigationContnet />
        </main>
    )
}

export default Celebrities