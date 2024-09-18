import React from "react";

const Preloader = ({ text }) => {
    return (
        <div id="preloader">
            <div class="p">
                <img src="/images/headphone.png" alt="headphone" />
            </div><br/>
            <div class="p">Loading... Celebrity Pulse.</div>
        </div>
    )
}

export default Preloader