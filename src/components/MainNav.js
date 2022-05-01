import { Link } from 'react-router-dom';
import netlifyIdentity from 'netlify-identity-widget';
import '../css/mainNav.css';

export default function LandingPageNav() {
    
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/Dashboard">Dashboard</Link>
                </li>
                <li>
                    <a className="login-link" onClick={() => netlifyIdentity.open()}>Login</a>
                </li>
            </ul>
      </nav>
    );
}