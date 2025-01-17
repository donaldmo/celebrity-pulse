import React from "react";

const SongCard = (params) => {
    const { userData } = params;

    const tempImage = "/images/album-thumbnail-one.jpg"

    return (
        <div className="song fade-up">
            <div className="song-img">
                <img
                    src={`https://lh3.googleusercontent.com/a/ACg8ocJ8T0OlTg2dXtNa_FT41uxavD1qE889eHNPDZyyL1tTWn7xK24=s96-c`}
                    alt="song"
                />
            </div>

            <div className="song-details">
                <div className="song-details-content">
                    <div className="song-name">{userData.name}</div>
                    <div className="artist-name">{userData.email}</div>
                </div>

                <div className="music-player">
                    <div className="play-song mouse">
                        <img
                            src="/images/play.png"
                            alt="play"
                            data-song="blindinglights"
                        />
                        <audio data-audio="blindinglights">
                            <source
                                src="/music/The-Weeknd-Blinding-Lights-_Lyrics_.ogg"
                                type="audio/ogg"
                            />
                            <source
                                src="/music/The Weeknd - Blinding Lights (Lyrics).mp3"
                                type="audio/mp3"
                            />
                        </audio>
                    </div>

                    <div className="download-song mouse">
                        <a
                            href="/music/The Weeknd - Blinding Lights (Lyrics).mp3"
                            download="Blinding Lights - Arlo Brown"
                        >
                            4.1K
                            <img
                                src="/images/download.png"
                                alt="download"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SongCard;
