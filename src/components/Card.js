import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ data }) => {
    const navigate = useNavigate();

    const handleVoteClick = (event) => {
        event.preventDefault();

        const {
            bio, name, image_url, votes, id
        } = data

        if (id) {
            navigate(`/vote?id=${id}`, { state: data });
        } else {
            console.error("No ID provided for voting.");
        }
    };
    return (
        <div class="blog fade-up">
            <div class="blog-img">
                <img src={`${data.image_url}`} alt="blog-img" />
                <div class="blog-date" style={{ cursor: "ponter" }}>Share</div>
            </div>

            <div class="blog-text">
                <div class="blog-heading">{data.name}</div>
                <div class="blog-description">
                    {data.votes} VOTES
                </div>

                <div class="blog-info">
                    <div class="blog-duration">

                    </div>
                    <div class="blog-type">
                        {/* <img src="/images/like-50.png" alt="clock" /> */}
                    </div>

                    <a href={`/vote?id=${data.id}`} title={`${data.name}`} onClick={handleVoteClick}>
                        <div class="blog-read-more">
                            <img src="/images/like-50.png" alt="clock" />
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Card