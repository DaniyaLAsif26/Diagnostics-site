import './Fot-right.css';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';

export default function FotRight() {

    return (
        <div className="footer-right">
            <h2>Vision Diagnostics Center</h2>
            <div className="intro">
                To be the most trusted diagnostic center by delivering accurate, timely, and affordable healthcare diagnostics through advanced technology, compassionate care, and a commitment to improving every life we touch.
            </div>
            <div className="socials">
                <a href="https://www.instagram.com/visiondiagnosticcentre5/?hl=en"> <InstagramIcon className="social-icon" style={{ color: " black" }} /></a>
                <a href=""> <FacebookIcon className="social-icon" style={{ color: " black" }} /></a>
                <div className='gmail'>
                    <a href="" >
                        <EmailIcon className="social-icon" style={{ color: " black" }} />
                        <span>visiondiagnostic24@gmail.com</span>
                    </a>
                </div>
            </div>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d958.2223013096946!2d78.4757594436247!3d17.35906930295143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb982015555569%3A0x2ba2bc81d9dc7eda!2sVISION%20DIAGNOSTIC%20CENTRE%7C%20BloodTest%20at%20Home%20%7C%20Free%20Home%20Sample%20Collection!5e1!3m2!1sen!2sin!4v1755110604499!5m2!1sen!2sin"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            />

        </div>
    )
}