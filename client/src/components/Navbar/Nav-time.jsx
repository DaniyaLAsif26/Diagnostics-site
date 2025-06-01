import AccessTimeIcon from '@mui/icons-material/AccessTime';
import './Nav-phone.css';
export default function NavTime() {

    return(
        <div className="time contact">
                <AccessTimeIcon style={{ color: '#21356d', fontSize: 30 }} />
                <div className="timr-info contact-info ">
                    <span>Mon - Sun</span>
                    <div className=""><b>8:00am - 11:00pm</b></div>
                </div>
            </div>
    )
}