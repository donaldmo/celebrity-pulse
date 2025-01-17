import React from 'react';

const UserProfileCard = ({ userData }) => {
    return (
        <div className="song fade-up">
            <div className="song-details">
                <div className="song-details-content">
                    <div className="song-name">{userData.name}</div>
                </div>
                <div className="music-player">
                    <div className="play-song mouse">
                        <img
                            src={userData.image || "https://via.placeholder.com/28"}
                            alt="profile image"
                            style={{ width: '28px', height: '28px', borderRadius: '100%' }}
                        />
                    </div>
                    <div className="download-song mouse">
                        <button
                            className="blog-read-more"
                            onClick={() => window.open('/logout')}
                        >
                            Log Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfileCard;
