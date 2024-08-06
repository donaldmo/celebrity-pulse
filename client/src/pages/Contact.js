import React from "react";
import NavigationContnet from "../components/NavigationContent";
import Navigation from "../components/Navigation";
import Heading from "../components/Heading";
import Headphone from "../components/Headphone";

const Contact = () => {
    return (
        <main id="contact-one">

            <div class="cursor scale"></div>
            <div class="cursor-two scale"></div>

            <div id="preloader">
                <div class="p">
                    <img src="/images/headphone.png" alt="headphone" />
                </div>
                <div class="p">Use Headphone For Better Experience.</div>
            </div>

            <div id="contact-one-content">
                <Navigation />

                <Heading title="CONTACT" />

                <div id="flex-row">
                    <div id="contact-form">
                        <div id="form" class="opacity-contact">
                            <form id="myForm" action="mail.php">
                                <div class="input-line">
                                    <input id="name" type="text" placeholder="NAME" class="input-same-line" required="" />
                                    <input id="email" type="email" placeholder="EMAIL" class="input-same-line" required="" />
                                </div>
                                <div class="input-line-column">
                                    <input id="subject" type="text" placeholder="SUBJECT" required="" />
                                    <textarea name="textarea" id="body" class="textarea" placeholder="MESSAGE" required=""></textarea>
                                </div>
                                <button type="button" id="submit" class="hover">Send</button>
                                <div id="message">INVALID EMAIL</div>
                            </form>
                        </div>
                    </div>

                    <div id="collaboration-mail" class="opacity-contact">
                        <div class="circular-text">
                            <span id="rotated">  FOR COLLABORATION * �&nbsp;�&nbsp;�&nbsp;�&nbsp; FOR COLLABORATION * �&nbsp;�&nbsp;�&nbsp;�&nbsp; FOR COLLABORATION * �&nbsp;�&nbsp;�&nbsp;�&nbsp; FOR COLLABORATION * �&nbsp;�&nbsp;�&nbsp;�&nbsp; </span>
                        </div>
                        <div class="mail">
                            <a href="mailto:info@gmail.com">INFO@CONTACT.COM</a>
                        </div>
                    </div>
                </div>

                <Headphone />

                <div class="progress-bar-container fade-in">
                    <div class="progressbar"></div>
                </div>
            </div>

            <NavigationContnet />
        </main>
    )
}

export default Contact