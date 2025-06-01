import './Fot-left.css';
import NavLogo from '../Navbar/Nav-logo';
import NavLoc from '../Navbar/Nav-loc';
import NavPhone from '../Navbar/Nav-phone';
import NavTime from '../Navbar/Nav-time';

export default function FotLeft() {

    return(
        <div className="footer-left">
            <h2>Address</h2>
            <NavLogo />
            <NavLoc />
            <NavPhone />
            <NavTime />
        </div>
    )
}