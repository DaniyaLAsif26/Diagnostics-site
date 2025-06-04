import { Link } from 'react-router-dom';


export default function NotFound() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>404 - Page Not Found</h2>
      <p>Sorry, the page you requested does not exist.</p>
      <Link to="/" style={{ color: '#007bff', textDecoration: 'underline' }}>
        Go back to Home
      </Link>
    </div>
  );
}
