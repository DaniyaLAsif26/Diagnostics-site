import logo from '../../assets/logo.png'
import './Nav-logo.css'

import { Link } from "react-router-dom";

export default function NavLogo() {

    return (
        <Link to="/home" className="logo-link nav-space">
            <div className="nav-logo">
                <img src={logo} alt="" loading="lazy" />
                <div className="logo-name">
                    VISION <br />
                    DIAGNOSTIC <br />
                    CENTRE
                </div>
            </div>
        </Link >
    )
}