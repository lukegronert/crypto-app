import { Link } from 'react-router-dom';

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
            </ul>
      </nav>
    );
}