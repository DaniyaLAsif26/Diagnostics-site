import LocationOnIcon from '@mui/icons-material/LocationOn';
import './Nav-phone.css';

export default function NavLoc() {

    return (
        <div className="location contact">
            <LocationOnIcon style={{ color: '#21356d', fontSize: 30 }} />
            <div className="location-info contact-info">
                <a href="https://www.google.com/maps/place/VISION+DIAGNOSTIC+CENTRE%7C+BloodTest+at+Home+%7C+Free+Home+Sample+Collection/@17.3594085,78.476408,1023m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3bcb982015555569:0x2ba2bc81d9dc7eda!8m2!3d17.3594085!4d78.476408!16s%2Fg%2F11hcs2qrvq?entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D" target="_blank">
                    <span>Address :</span>
                    <div className=""><b>Beside fire station, Moghalpura, <br />
                        Hyderabad.</b></div>
                </a>
            </div>
        </div >
    )
}