import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Artists from "./Artists";
import Admin from "./Admin";
import Home from "./pages/Home";
import IndexTwo from "./pages/IndexTwo";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/index-two" element={<IndexTwo />} />


        <Route path="/artists" element={<Artists />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
};

export default App;
