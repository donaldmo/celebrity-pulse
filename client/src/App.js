import React from "react";
import { UserProvider } from './components/UserContext';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import './App.css'

import Artists from "./Artists";
import Admin from "./Admin";
import Home from "./pages/Home";
import Login from "./pages/Login";

import About from "./pages/About";
import AboutTwo from "./pages/AboutTwo"
import Songs from "./pages/Songs"
import Blog from "./pages/Blog"
import BlogSingle from "./pages/BlogSingle";
import Contact from "./pages/Contact"
import Celebrities from "./pages/Celebrities";
import Vote from "./pages/Vote"


const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Celebrities />} />
          <Route path="/celebrities" element={<Blog />} />
          <Route path="/vote" element={<Vote />} />
          <Route path="/store" element={<About />} />
          <Route path="/winners" element={<AboutTwo />} />
          <Route path="/about" element={<Celebrities />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/login" element={<Login />} />

          <Route path="/blog" element={<Blog />} />
          <Route path="/blog-single" element={<BlogSingle />} />
          <Route path="/contact-one" element={<Contact />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
