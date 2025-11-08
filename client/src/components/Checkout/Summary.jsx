import dayjs from 'dayjs';
import './Summary.css'
import { useAppointment } from '../../context/AppointmentContext'
import { useLogin } from '../../context/LoginContext';
import SummaryRow from './Summary-row'

export default function Summary() {
    const { appointment } = useAppointment()
    const { userData } = useLogin()

    // Helper function to safely format dates
    const formatDate = (date, format) => {
        if (!date) return '';

        if (dayjs.isDayjs(date)) {
            return date.format(format);
        }
        // If it's a native Date object, convert it first
        return dayjs(date).format(format);
    };

    const formatedNumber = (number) => {
        if (!number) return '';

        let str = number.toString();

        if (str.startsWith("91")) {
            return str.replace(/^91/, "+91 - ");
        }

        return str;
    };

    return (
        <div className="checkout-summary">
            <div className="checkout-box">
                <h2 className="checkout-box-head">Appointment Details</h2>

                <SummaryRow
                    heading="Appointment Date"
                    data={formatDate(appointment.date, 'DD-MM-YYYY')}
                />

                <SummaryRow
                    heading="Appointment Day"
                    data={formatDate(appointment.date, 'dddd')}
                />

                <SummaryRow
                    heading="Time Slot"
                    data={appointment.time || ''}
                />

                <SummaryRow
                    heading="Sample Collection at"
                    data={appointment.radio || ''}
                />

                {appointment.radio === 'Home Address' ?
                    <SummaryRow heading="Home Address" data={userData.address} altAddr edit />
                    : null}

                <SummaryRow heading="Phone No" data={formatedNumber(userData.phone_no)} edit />

                <SummaryRow heading="Alternative Phone No" data={formatedNumber(userData.alt_no) || ''} altPhone edit />

                <SummaryRow heading="Full - Name" data={userData.name} edit editName />

            </div>
        </div>
    )
}
