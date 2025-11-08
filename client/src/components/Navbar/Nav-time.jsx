import AccessTimeIcon from '@mui/icons-material/AccessTime';
import './Nav-phone.css';
export default function NavTime() {

    return(
        <div className="time contact ">
                <AccessTimeIcon style={{ color: '#21356d' }} />
                <div className="timr-info contact-info ">
                    <div className="">
                    <span>Mon - Sat</span>
                    <div className=""><b>8:00am - 11:00pm</b></div>
                    <div className="">Sun : <b> 8:00pm</b></div>
                    </div>
                </div>
            </div>
    )
}