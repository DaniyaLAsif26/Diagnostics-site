import './Fot-center.css';
import { useLogin } from '../../context/LoginContext.jsx';

export default function FotCenter({ link }) {

    const { toggleAdminForm } = useLogin();

    const adminLogin = (e) => {
        e.preventDefault();
        toggleAdminForm();
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
                            onClick={links.name === 'Admin Login' ? adminLogin : undefined}
                        >
                            {links.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div >
    )
}