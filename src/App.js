import { NestCamWiredStandTwoTone } from "@mui/icons-material";
import React, {useState} from "react";
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

  const getCoinData = () => {
    // Check if coinData exists in local storage or if it is older than 2 minutes (120,000ms)
    if(localStorage.getItem('coinData') === null || (new Date().getTime() - JSON.parse(localStorage.getItem('coinData')).timestamp) > 120000) {
      fetch('https://api.coincap.io/v2/assets')
        .then(response => response.json())
        .then(data => {
          localStorage.setItem('coinData', JSON.stringify(data))
          console.log('fetched')
        })
    } else {
      console.log(JSON.parse(localStorage.getItem('coinData')));
      console.log('local storage')
    }
  }

  return (
    <Router>
      <div>
        {/* A <Routes> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard coinData={coinData} setCoinData={setCoinData} getCoinData={getCoinData} />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </div>
    </Router>
  );
}
