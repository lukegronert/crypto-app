import React, {useState, useEffect} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';

export default function App() {
  const [coinData, setCoinData] = useState([]);
  
  return (
    <Router>
      <div>
        {/* A <Routes> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard coinData={coinData} setCoinData={setCoinData} />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </div>
    </Router>
  );
}
