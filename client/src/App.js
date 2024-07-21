import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Artists from "./Artists";
import Admin from "./Admin";

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Artists</Link>
            </li>
            <li>
              <Link to="/admin">Admin</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Artists />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
