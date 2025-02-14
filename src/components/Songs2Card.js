export default function Songs2Card() {
    return (
        <main id="songs-two">
            <div id="songs-two-content">
                <div className="heading">
                    <div className="text">
                        SONGS
                    </div>
                </div>

                <div className="center">
                    <div id="songs-container">
                        <div className="song fade-up">

                            <div className="song-img">
                                <img src="/images/album-thumbnail-one.jpg" alt="song" />
                            </div>

                            <div className="song-details">
                                <div className="song-details-content">
                                    <div className="song-name">Blinding Lights</div>
                                    <div className="artist-name">Arlo Brown Ft. Sza</div>
                                </div>

                                <div className="music-player">
                                    <div className="play-song mouse">
                                        <img src="/images/play.png" alt="play" data-song="blindinglights" />

                                        <audio data-audio="blindinglights">
                                            <source src="/music/The-Weeknd-Blinding-Lights-_Lyrics_.ogg" type="audio/ogg" />
                                            <source src="music/The Weeknd - Blinding Lights (Lyrics).mp3" type="audio/mp3" />
                                        </audio>
                                    </div>

                                    <div className="download-song mouse">
                                        <a href="music/The Weeknd - Blinding Lights (Lyrics).mp3" download="Blinding Lights - Arlo Brown">4.1K<img src="/images/download.png" alt="download" /></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}