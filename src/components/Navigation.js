"use client"
import React, { useEffect } from "react"
import { gsap } from "gsap"

const Navigation = (props) => {
    useEffect(() => {
        const menuBar = document.querySelector('.menu-bar');
        const navigationClose = document.querySelector('.navigation-close');

        const openNavigation = () => {
            gsap.to('.navigation-content', 1.5, { y: 0, ease: 'Expo.easeInOut' });
            gsap.to('.navigation-content ul li', 1, { opacity: 1, delay: 1, stagger: 0.1 });
            gsap.to('.navigation-content .opacity', 0.5, { opacity: 1, stagger: 0.1, delay: 1 });

            if (document.querySelector('.fade-up')) {
                gsap.to('.fade-up', 1, { backdropFilter: 'blur(0px)', delay: 1 });
            }
        };

        const closeNavigation = () => {
            gsap.to('.navigation-content ul li', 0.5, { opacity: 0, stagger: -0.1 });
            gsap.to('.navigation-content .opacity', 0.5, { opacity: 0, stagger: 0.1 });
            gsap.to('.navigation-content', 1.5, { y: '100%', ease: 'Expo.easeInOut', delay: 0.2 });

            if (document.querySelector('.fade-up')) {
                gsap.to('.fade-up', 1, { backdropFilter: 'blur(20px)', delay: 0.5 });
            }
        };

        menuBar.addEventListener('click', openNavigation);
        navigationClose.addEventListener('click', closeNavigation);

        return () => {
            menuBar.removeEventListener('click', openNavigation);
            navigationClose.removeEventListener('click', closeNavigation);
        };
    }, []);

    const { logoName = "CLEBRITY PULSE" } = props

    return (
        <div class="navigation">
            <div class="logo hover ">
                <a href="/" class="text">{logoName}</a>
            </div>

            <div class="menu-bar hover ">
                <div class="menu-bar-name text">
                    Menu
                </div>

                <div class="menu-bar-lines text">
                    <div class="menu-bar-line"></div>
                    <div class="menu-bar-line"></div>
                </div>
            </div>
        </div>
    )
}

export default Navigation;