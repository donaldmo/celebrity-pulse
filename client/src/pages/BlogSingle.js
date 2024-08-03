import React from "react";

const BlogSingle = () => {
    return (
        <main id="blog-single">
            <div class="cursor scale"></div>
            <div class="cursor-two scale"></div>

            <div id="preloader">
                <div class="p">
                    <img src="/images/headphone.png" alt="headphone" />
                </div>
                <div class="p">Use Headphone For Better Experience.</div>
            </div>

            <div id="blog-single-content">
                <div class="navigation">
                    <div class="logo hover ">
                        <a href="index-two.html" class="text">ARLO BROWN</a>
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

                <div class="heading">
                    <div class="text">
                        BLOG SINGLE
                    </div>
                </div>

                <div class="center">
                    <div class="blog-img img">
                        <img src="/images/main-bg-three.jpg" alt="blog-img" />
                    </div>

                    <div class="center-para">
                        <div class="blog-text">
                            <div class="blog-info">
                                <div class="blog-date text-scroll">August 3, 2020</div>
                                <div class="blog-duration img-scroll text-scroll">
                                    <img src="/images/clock.png" alt="clock" />&nbsp; 4 Min
                                </div>
                            </div>

                            <div class="blog-heading text-scroll">
                                New Album Release
                            </div>

                            <div class="para text-scroll">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque ipsa quo beatae placeat. Consequuntur quo ducimus mollitia voluptatem quos dolorum cum obcaecati nostrum, porro dignissimos consectetur aspernatur necessitatibus beatae odit?
                            </div>

                            <div class="para text-scroll">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime expedita ratione excepturi aspernatur! Doloribus dicta, sit autem est praesentium minima eos aperiam! Illo vel totam odio dicta accusantium cupiditate doloribus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio quam inventore laborum nulla voluptatibus possimus veniam expedita cupiditate hic facere id at quod officiis cum sint, aliquid quas corporis suscipit!
                            </div>

                            <div class="blog-text-img">

                                <div class="img-scroll">
                                    <img src="/images/album-thumbnail-four.jpg" alt="img" />
                                </div>

                                <div class="img-scroll">
                                    <img src="/images/album-thumbnail-five.jpg" alt="img" />
                                </div>
                            </div>

                            <div class="para text-scroll italic ">
                                <i>"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda nisi, libero facere mollitia iure ex aspernatur corporis!"</i>
                            </div>

                            <div class="para text-scroll">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime expedita ratione excepturi aspernatur! Doloribus dicta, sit autem est praesentium minima eos aperiam! Illo vel totam odio dicta accusantium cupiditate doloribus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio quam inventore laborum nulla voluptatibus possimus veniam expedita cupiditate hic facere id at quod officiis cum sint, aliquid quas corporis suscipit!
                            </div>

                            <div class="share-links para">
                                <ul>
                                    <li class="text-scroll">Share:</li>
                                    <li><a href="#" class="text-scroll hover ">YT</a></li>
                                    <li><a href="#" class="text-scroll hover ">FB</a></li>
                                    <li><a href="#" class="text-scroll hover ">IG</a></li>
                                </ul>
                            </div>

                            <div class="signature">
                                <span class="text-scroll"> Arlo Brown.</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="headphone img text">
                    <img src="/images/headphone.png" title="headphone zone" class="text" alt="headphone" />
                </div>

                <div class="progress-bar-container fade-in">
                    <div class="progressbar"></div>
                </div>
            </div>

            <div class="navigation-content">
                <div class="navigation-logo hover opacity">
                    <a href="#" class="text">ARLO BROWN</a>
                </div>
                <ul class="navigation-ul">
                    <li><a href="index-one.html" data-text="Home" data-img="images/bg-image-three.jpg">Home</a></li>
                    <li><a href="about-one.html" data-text="About" data-img="images/about-img.jpg">About</a></li>
                    <li><a href="songs-one.html" data-text="Songs" data-img="images/album-thumbnail-nine.jpg">Songs</a></li>
                    <li><a href="blog-one.html" data-text="Blogs" data-img="images/main-bg-three.jpg">Blogs</a></li>
                    <li><a href="contact-one.html" data-text="Contact" data-img="images/album-thumbnail-four.jpg">Contact</a></li>
                </ul>
                <div class="navigation-close hover about-close opacity">
                    <div class="navigation-close-line"></div>
                    <div class="navigation-close-line"></div>
                </div>

                <div class="project-preview"></div>

                <div class="headphone-navigation opacity">
                    <img src="/images/headphone.png" title="headphone zone" class="text" alt="headphone" />
                </div>

                <div class="social-media-links-navigation">
                    <ul>
                        <li><a href="#" class="text hover opacity">YT</a></li>
                        <li><a href="#" class="text hover opacity">FB</a></li>
                        <li><a href="#" class="text hover opacity">IG</a></li>
                    </ul>
                </div>
            </div>
        </main>
    )
}

export default BlogSingle