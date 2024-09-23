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
        <div class="navigation-content">
            <div class="navigation-logo hover opacity">
                <a href="index-two" class="text">CELEBRITY PULSE</a>
            </div>

            <ul class="navigation-ul">
                {links.map((link, index) => (
                    <li key={index}>
                        <Link href={link.href} >
                            {link.text}
                        </Link>
                    </li>
                ))}
            </ul>

            <div class="navigation-close hover about-close opacity">
                <div class="navigation-close-line"></div>
                <div class="navigation-close-line"></div>
            </div>

            <div class="project-preview"></div>

            <div class="headphone-navigation opacity">
                <img src="/images/headphone.png"
                    title="headphone zone"
                    class="text"
                    alt="headphone"
                />
            </div>

            <div class="social-media-links-navigation">
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