import Link from "next/link";
import React from "react";

const NavigationContnet = () => {
    const links = [
        { href: "/", text: "home", img: "images/bg-image-three.jpg" },
        { href: "/celebrities", text: "celebrities", img: "images/about-img.jpg" },
        { href: "/store", text: "store", img: "images/album-thumbnail-nine.jpg" },
        { href: "/winners", text: "winners", img: "images/main-bg-three.jpg" },
        { href: "/logout", text: "logout", img: "images/album-thumbnail-four.jpg" },
        { href: "/profile", text: "profile", img: "images/album-thumbnail-four.jpg" }
    ]

    const socialLinks = [
        { href: "#", text: "YT" },
        { href: "#", text: "FB" },
        { href: "#", text: "IG" }
    ]

    return (
        <div className="navigation-content">
            <div className="navigation-logo hover opacity">
                <a href="index-two" className="text">
                    CELEBRITY PULSE
                </a>
            </div>

            <ul className="navigation-ul">
                {links.map((link, index) => (
                    <li key={index}>
                        <Link href={link.href} >
                            {link.text}
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="navigation-close hover about-close opacity">
                <div className="navigation-close-line"></div>
                <div className="navigation-close-line"></div>
            </div>

            <div className="project-preview"></div>

            <div className="headphone-navigation opacity">
                <img src="/images/headphone.png"
                    title="headphone zone"
                    className="text"
                    alt="headphone"
                />
            </div>

            <div className="social-media-links-navigation">
                <ul>
                    {socialLinks.map((link, index) => (
                        <li key={index}>
                            <a href={link.href}
                                className="text hover opacity">
                                {link.text}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default NavigationContnet;