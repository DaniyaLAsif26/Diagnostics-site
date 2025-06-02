import './Fot-right.css';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import YouTubeIcon from '@mui/icons-material/YouTube';

export default function FotRight() {

    return (
        <div className="footer-right">
            <h2>Vision Diagnostics Center</h2>
            <div className="intro">
                To be the most trusted diagnostic center by delivering accurate, timely, and affordable healthcare diagnostics through advanced technology, compassionate care, and a commitment to improving every life we touch.
            </div>
            <div className="socials">
                <InstagramIcon className="social-icon" style={{ fontSize: "2.6rem", color: " black" }} />
                <FacebookIcon className="social-icon" style={{ fontSize: "2.6rem", color: " black" }} />
                <WhatsAppIcon className="social-icon" style={{ fontSize: "2.6rem", color: " black" }} />
                <YouTubeIcon className="social-icon" style={{ fontSize: "2.6rem", color: " black" }} />
            </div>
        </div>
    )
}