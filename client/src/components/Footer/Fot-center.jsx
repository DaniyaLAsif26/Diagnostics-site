import './Fot-center.css';

export default function FotCenter({ link }) {

    return (
        <div className="footer-center">
            <h2>Quick Links</h2>
            <ul>
                {link.map((links) => (
                    <li key={links.id}>
                        <a href="">{links.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}