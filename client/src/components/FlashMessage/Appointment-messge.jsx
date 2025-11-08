import { useEffect, useState } from "react";
import { useAppointment } from "../../context/AppointmentContext";

import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function AppointmentMessage() {
    const { appointmentMessage, clearAppointmentMessage } = useAppointment();
    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
        if (!appointmentMessage) return;

        // Reset button to disabled when a new message appears
        setIsDisabled(true);

        const timer = setTimeout(() => {
            setIsDisabled(false);
        }, 4000);

        if (appointmentMessage) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = "auto";
        };
    }, [appointmentMessage]);

    if (!appointmentMessage) return null;

    return (
        <div className="appointment-msg-cont">
            <div className="appointment-msg">
                <CheckCircleIcon style={{ color: 'green', fontSize: '3rem', marginBottom: '0.7rem' }} />
                <div
                    className="msg"
                    dangerouslySetInnerHTML={{ __html: appointmentMessage }}
                >
                </div>

                <button
                    disabled={isDisabled}
                    onClick={clearAppointmentMessage}
                    className={isDisabled ? "disabled-btn" : "active-btn"}
                >
                    OK
                </button>
            </div>
        </div>
    );
}
