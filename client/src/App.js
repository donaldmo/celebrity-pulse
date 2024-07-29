import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import Artists from "./Artists";
import Admin from "./Admin";
import Home from "./pages/Home";
import IndexTwo from "./pages/IndexTwo";

import About from "./pages/About";
import AboutTwo from "./pages/AboutTwo"
import Songs from "./pages/Songs"
import Blog from "./pages/Blog"
import Contact from "./pages/Contact"


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/index-two" element={<IndexTwo />} />
        
        <Route path="/about-one" element={<About />} />
        <Route path="/about-two" element={<AboutTwo />} />

        <Route path="/celebrities" element={<Songs />} />
        <Route path="/blog-one" element={<Blog />} />

        <Route path="/contact-one" element={<Contact />} />

        <Route path="/artists" element={<Artists />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
};

export default App;
