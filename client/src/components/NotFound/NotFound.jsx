import './not-found.css'

import { Link, useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Page Not Found</h2>
        <p className="not-found-message">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <div className="not-found-actions">
          <button 
            onClick={() => navigate(-1)} 
            className="btn-secondary"
          >
            Go Back
          </button>
          <Link to="/" className="btn-primary">
            Go to Home
          </Link>
        </div>
        <div className="not-found-links">
          <h3>Quick Links:</h3>
          <ul>
            <li><Link to="/tests/laboratory">Laboratory Tests</Link></li>
            <li><Link to="/tests/radiology">Radiology Tests</Link></li>
            <li><Link to="/all-packages">Health Packages</Link></li>
            <li><Link to="/about-us">About Us</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}