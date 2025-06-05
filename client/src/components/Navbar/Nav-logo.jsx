import logo from '../../assets/logo.png'
import './Nav-logo.css'

import { Link } from "react-router-dom";

export default function NavLogo() {

    return (
        <Link to="/home" className="logo-link">
            <div className="nav-logo">
                <img src={logo} alt="" />
                <div className="logo-name">
                    VISION <br />
                    DIAGNOSTIC <br />
                    CENTER
                </div>
            </div>
        </Link >
    )
}