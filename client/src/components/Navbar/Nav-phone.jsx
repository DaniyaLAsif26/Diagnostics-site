import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import './Nav-phone.css';

export default function NavPhone() {

    return(
        <div className="contact">
                <LocalPhoneIcon style={{ color: '#21356d' }} />
                <div className="contact-info">
                    <span>Any Queries :</span>
                    <div className="nav-phone"><b> 7659831062</b>  <b> 040-66713944</b></div>
                </div>
            </div>
    )
}