import React from 'react';
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ data }) => {
    const navigate = useNavigate();

    const {
        bio, name, image_url, votes, id
    } = data

    const handleVoteClick = (event) => {
        event.preventDefault();

        // Check if ID exists
        if (id) {
            navigate(`/vote?id=${id}`, { state: data });
        } else {
            console.error("No ID provided for voting.");
            // Optionally, you might want to provide feedback to the user here
        }
    };

    return (
        <div class="blog fade-up">
            <div class="blog-img">
                <img src={`${image_url}`} alt={name} />
            </div>

            <div class="blog-text">
                <div class="blog-heading">{name}</div>
                <div class="blog-description">
                    {bio}
                </div>

                <div class="blog-info">
                    <div class="blog-duration">
                        <img src="/images/clock.png" alt="clock" />
                        &nbsp; 2 Min
                    </div>

                    <div class="blog-type">
                        {votes} Votes
                    </div>

                    <a href={`/vote?id=${id}`} title={`${name}`} onClick={handleVoteClick}>
                        <div class="blog-read-more">
                            <i class="gg-arrow-right"></i>
                        </div>
                    </a>
                </div>
            </div>
            <div class="blog-date">{"2 Aug 24"}</div>
        </div>
    );
};

export default BlogCard;
