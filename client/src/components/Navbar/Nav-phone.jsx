import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import './Nav-phone.css';

export default function NavPhone() {

    return(
        <div className="contact">
                <LocalPhoneIcon style={{ color: '#21356d', fontSize: 30 }} />
                <div className="contact-info">
                    <span>Any Queries :</span>
                    <div className=""><b>+91 7659831062</b></div>
                </div>
            </div>
    )
}