import logo from '../assets/1.png';
import './Navbar.css';
import Button from '@mui/material/Button';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function Navbar() {

    return (
        <nav className='navbar'>
            <div className="nav-left">
                <img src={logo} alt="" />
                <div className="logo-name">
                    VISION <br />
                    DIAGNOSTIC <br />
                    CENTER
                </div>
            </div>
            <div className="contact">
                <LocalPhoneIcon style={{ color: '#21356d', fontSize: 30 }} />
                <div className="contact-info">
                    <span>Any Queries :</span>
                    <div className=""><b>+91 7659831062</b></div>
                </div>
            </div>
            <div className="nav-center">
                <form action="">
                    <input type="text" />

                    <Button
                        variant="contained"
                        color="success"
                        size="large">
                        Search
                    </Button>
                </form>
            </div>
            <div className="location contact">
                <LocationOnIcon style={{ color: '#21356d', fontSize: 30 }} />
                <div className="location-info contact-info">
                    <span>Address :</span>
                    <div className=""><b>Beside fire station, Moghalpura, <br />
                        Hyderabad.</b></div>
                </div>
            </div>
            <div className="time contact">
                <AccessTimeIcon style={{ color: '#21356d', fontSize: 30 }} />
                <div className="timr-info ">
                    <span>Mon - Sun</span>
                    <div className=""><b>8:00am - 11:00pm</b></div>
                </div>
            </div>
            <div className="nav-right">
                <Button
                    variant="contained"
                    size="medium">
                    Sign in
                </Button>
            </div>
        </nav>
    )
}