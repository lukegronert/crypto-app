import React, {useState, useEffect} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import netlifyIdentity from 'netlify-identity-widget';

export default function App() {
  const [coinData, setCoinData] = useState([]);
  const [user, setUser] = useState({})

  netlifyIdentity.on('login', () => {
    setUser(netlifyIdentity.currentUser())
  })

  useEffect(() => {
    if(netlifyIdentity.currentUser()) {
      setUser(netlifyIdentity.currentUser().user_metadata.full_name)
    }
  })
  
  return (
    <Router>
      <div>
        {/* A <Routes> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard coinData={coinData} setCoinData={setCoinData} user={user} />} />
          <Route path="/" element={<LandingPage user={user} />} />
        </Routes>
      </div>
    </Router>
  );
}
