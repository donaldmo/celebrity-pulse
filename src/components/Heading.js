import React from "react";

const Heading = (props) => {
    const { title = 'Untitled' } = props;

    return (
        <div class="heading">
            <span class="text">
                {title}
            </span>
        </div>
    )
}

export default Heading