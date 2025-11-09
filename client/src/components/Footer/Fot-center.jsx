import './Fot-center.css';
import { useLogin } from '../../context/LoginContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function FotCenter({ link }) {
    const navigate = useNavigate();
    const { toggleAdminForm, isAdminLogIn } = useLogin();

    const adminLogin = (e) => {
        e.preventDefault();
        if (isAdminLogIn) {
            navigate('/admin/dashboard');
        } else {
            toggleAdminForm();
        }
    }

    const handleNavigation = (e, href, isAdmin) => {
        e.preventDefault();
        if (isAdmin) {
            adminLogin(e);
        } else {
            navigate(href);
        }
    }

    return (
        <div className="footer-center">
            <h2>Quick Links</h2>
            <ul>
                {link.map((links) => (
                    <li key={links.id}>
                        <a
                            href={links.href}
                            className={links.name === 'Admin Login' ? 'admin-link' : ''}
                            onClick={(e) => handleNavigation(e, links.href, links.name === 'Admin Login')}
                        >
                            {links.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}