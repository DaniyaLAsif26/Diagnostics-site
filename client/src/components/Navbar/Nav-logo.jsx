import logo from '../../assets/logo.png'
import './Nav-logo.css'

export default function NavLogo() {

    return (
        <div className="nav-logo">
            <img src={logo} alt="" />
            <div className="logo-name">
                VISION <br />
                DIAGNOSTIC <br />
                CENTER
            </div>
        </div>
    )
}