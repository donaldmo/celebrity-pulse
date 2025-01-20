"use client"

import Link from 'next/link'
import Cursor from '@/components/Cursor';
import NavigationContent from "../components/NavigationContent";
import Progressbar from "../components/Progressbar";
import Headphone from "../components/Headphone";
import Navigation from "../components/Navigation";
import Preloader from "../components/Preloader";

export default function Home() {
  const futureDate = '2024-09-30T23:59:59';

  return (
    <main id="about-two">
      <Cursor />
      <Preloader />

      <div id="about-two-content">
        <Navigation />

        <div class="progress-bar-container fade-in">
          <div class="progressbar"></div>
        </div>

        <div class="about-img fade-in" style={{backgroundImage: "url(/images/artists/Charlotte Austin.jpg)"}}>
        </div>

        <div class="about-text">
          <div class="about-text-heading fade-in">
            Hi fans, Welcome to Celebrity Pulse!.
          </div>

          <div class="about-text-content fade-in">
            "The Most Shining Star in Thailand" selection, featuring outstanding artists. Fans will vote to determine the winner, shaping the future of Thai entertainment. This marks a pivotal moment for the rise of new Thai talent, with Celebrity Pulse offering global support to the deserving artist. Fans' participation is key in this journey, contributing to the vibrant growth of the industry.
          </div>

          <div class="signature fade-in">
            <Link href="/contests">
              <button type="button" id="submit" className="hover"
                style={{ margin: "0", padding: "10px" }}
              >
                View All Contests
              </button>
            </Link>
          </div>
        </div>
      </div>

      <Headphone />
      <NavigationContent />
    </main>
  )
}