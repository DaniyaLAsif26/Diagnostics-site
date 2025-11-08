import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RadioBtn from "./Radio.jsx";
import Calendar from "./Calendar.jsx";
import TimeSlot from "./TimeSlot.jsx";
import Details from "./Details.jsx";
import "./Appointment-cont.css";

import Button from "@mui/material/Button";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import LooksThreeIcon from "@mui/icons-material/Looks3";
import LooksFourIcon from "@mui/icons-material/Looks4";

import { useAppointment } from "../../context/AppointmentContext";
import { useLogin } from "../../context/LoginContext.jsx";

export default function AppointmentCont() {
    const navigate = useNavigate();
    const { appointment, updateAppointment } = useAppointment();
    const { userData } = useLogin()

    // Initialize showDetails based on existing appointment data
    const [showDetails, setShowDetails] = useState(
        Boolean(appointment.radio && appointment.date && appointment.time)
    );

    // step toggles - only open step1 if no appointment data exists
    const [step1Open, setStep1Open] = useState(!appointment.radio);
    const [step2Open, setStep2Open] = useState(false);
    const [step3Open, setStep3Open] = useState(false);

    // refs for auto-scroll
    const step1Ref = useRef(null);
    const step2Ref = useRef(null);
    const step3Ref = useRef(null);
    const step4Ref = useRef(null);

    const [lastOpenedStep, setLastOpenedStep] = useState(null);

    // Update showDetails when appointment data changes
    useEffect(() => {
        setShowDetails(Boolean(appointment.radio && appointment.date && appointment.time));
    }, [appointment.radio, appointment.date, appointment.time]);

    // auto-scroll
    useEffect(() => {
        if (lastOpenedStep === "step1" && step1Ref.current)
            step1Ref.current.scrollIntoView({ behavior: "smooth" });
        if (lastOpenedStep === "step2" && step2Ref.current)
            step2Ref.current.scrollIntoView({ behavior: "smooth" });
        if (lastOpenedStep === "step3" && step3Ref.current)
            step3Ref.current.scrollIntoView({ behavior: "smooth" });
        if (lastOpenedStep === "step4" && step4Ref.current)
            step4Ref.current.scrollIntoView({ behavior: "smooth" });

        setLastOpenedStep(null);
    }, [lastOpenedStep]);

    // step handlers
    const handleRadio = (radio) => {
        updateAppointment("radio", radio);
        setStep1Open(false);
        setStep2Open(true);
        setLastOpenedStep("step2");
    };

    const handleDate = (dateObj) => {
        // If user selects a different date, reset the time slot
        if (appointment.date && appointment.date.getTime() !== dateObj.getTime()) {
            updateAppointment("time", ""); // reset time if date changes
        }
        updateAppointment("date", dateObj);
        setStep2Open(false);
        setStep3Open(true);
        setLastOpenedStep("step3");
    };

    const handleTimeSlot = (slot) => {
        updateAppointment("time", slot);
        setStep3Open(false);
        setShowDetails(true);
        setLastOpenedStep("step4");
    };

    const redirectAppointment = (e) => {
        e.preventDefault();
        if (!userData.name || !userData.address) {
            navigate('/user-profile/edit')
            return
        } else {
            navigate("/Cart/Checkout");
        }
    };

    const stepColor = (condition) => (condition ? "green" : "#7b7b7bff");

    return (
        <div className="appointment-bg">
            <div className="appointment-cont">
                <h2 className="appointment-heading">Select Appointment Details</h2>

                {/* STEP 1 */}
                <div className="appointment" ref={step1Ref}>
                    <div
                        className="appointment-step step1"
                        onClick={() => {
                            if (appointment.radio) {
                                setStep1Open(!step1Open);
                                if (!step1Open) setLastOpenedStep("step1");
                            }
                        }}
                    >
                        <LooksOneIcon sx={{ fontSize: "2.6rem", color: stepColor(appointment.radio) }} />
                        <div className="appointment-step-head">Select Sample Collection at</div>
                    </div>

                    <div className={`appointment-form ${step1Open ? "smooth-open" : "smooth-closed"}`}>
                        {step1Open ? (
                            <div className="radio-btn">
                                <RadioBtn sendRadioData={handleRadio} selectedRadio={appointment.radio} />
                            </div>
                        ) : (
                            <div className="line"></div>
                        )}
                    </div>
                </div>

                {/* STEP 2 */}
                <div className="appointment" ref={step2Ref}>
                    <div
                        className="appointment-step step1"
                        onClick={() => {
                            if (appointment.date) {
                                setStep2Open(!step2Open);
                                if (!step2Open) setLastOpenedStep("step2");
                            }
                        }}
                    >
                        <LooksTwoIcon sx={{ fontSize: "2.6rem", color: stepColor(appointment.date) }} />
                        <div className="appointment-step-head">Select Date</div>
                    </div>

                    <div className={`appointment-form ${step2Open ? "smooth-open" : "smooth-closed"}`}>
                        {step2Open ? (
                            <div className="radio-btn Calendar">
                                <Calendar sendDate={handleDate} selectedDate={appointment.date} />
                            </div>
                        ) : (
                            <div className="line"></div>
                        )}
                    </div>
                </div>

                {/* STEP 3 */}
                <div className="appointment" ref={step3Ref}>
                    <div
                        className="appointment-step step1"
                        onClick={() => {
                            if (appointment.time) {
                                setStep3Open(!step3Open);
                                if (!step3Open) setLastOpenedStep("step3");
                            }
                        }}
                    >
                        <LooksThreeIcon sx={{ fontSize: "2.6rem", color: stepColor(appointment.time) }} />
                        <div className="appointment-step-head">Select Time Slot</div>
                    </div>

                    <div className={`appointment-form ${step3Open ? "smooth-open" : "smooth-closed"}`}>
                        {step3Open ? (
                            <div className="radio-btn Calendar">
                                <TimeSlot
                                    selectedDate={appointment.date}
                                    selectedTime={appointment.time}
                                    onSelectTime={handleTimeSlot}
                                    finalCheck={() => setShowDetails(true)}
                                />
                            </div>
                        ) : (
                            <div className="line"></div>
                        )}
                    </div>
                </div>

                {/* STEP 4 */}
                <div className="appointment" ref={step4Ref}>
                    <div className="appointment-step step1">
                        <LooksFourIcon sx={{ fontSize: "2.6rem", color: stepColor(showDetails) }} />
                        <div className="appointment-step-head">Review Selected Details</div>
                    </div>

                    <div className={`appointment-form details ${showDetails ? "smooth-open" : "smooth-closed"}`}>
                        {showDetails && (
                            <Details Radio={appointment.radio} Date={appointment.date} Time={appointment.time} />
                        )}
                    </div>
                </div>

                <div className="proceed-btn">
                    <Button
                        variant="contained"
                        disabled={!appointment.radio || !appointment.date || !appointment.time}
                        onClick={redirectAppointment}
                    >
                        Proceed
                    </Button>
                </div>
            </div>
        </div>
    );
}
