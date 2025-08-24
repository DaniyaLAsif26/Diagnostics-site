import { useState, useRef, useEffect } from "react";
import RadioBtn from "./Radio.jsx";
import Calendar from "./Calendar.jsx";
import TimeSlot from "./TimeSlot.jsx";
import Details from "./Details.jsx";
import './Appointment-cont.css';

import Button from '@mui/material/Button';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import LooksThreeIcon from '@mui/icons-material/Looks3';
import LooksFourIcon from '@mui/icons-material/Looks4';

export default function CheckoutCont() {
    const [radio, setRadio] = useState('');
    const [date, setDate] = useState(null);
    const [time, setTime] = useState('');
    const [showDetails, setShowDetails] = useState(false);

    const [step1Open, setStep1Open] = useState(true);
    const [step2Open, setStep2Open] = useState(false);
    const [step3Open, setStep3Open] = useState(false);

    // refs for auto-scroll
    const step1Ref = useRef(null);
    const step2Ref = useRef(null);
    const step3Ref = useRef(null);
    const step4Ref = useRef(null);

    // Track which step was just opened to prevent unwanted scrolling
    const [lastOpenedStep, setLastOpenedStep] = useState(null);

    // auto-scroll when a step opens
    useEffect(() => {
        if (step1Open && step1Ref.current && lastOpenedStep === 'step1') {
            step1Ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        if (step2Open && step2Ref.current && lastOpenedStep === 'step2') {
            step2Ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        if (step3Open && step3Ref.current && lastOpenedStep === 'step3') {
            step3Ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        if (showDetails && step4Ref.current && lastOpenedStep === 'step4') {
            step4Ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }

        // Reset the last opened step after scrolling
        if (lastOpenedStep) {
            setLastOpenedStep(null);
        }
    }, [step1Open, step2Open, step3Open, showDetails, lastOpenedStep]);

    // ✅ Step 1
    const handleRadio = (radio) => {
        setRadio(radio);
        setStep1Open(false);
        setStep2Open(true);
        setLastOpenedStep('step2');
    };

    // ✅ Step 2
    const handleDate = (dateObj) => {
        setDate(dateObj);
        setStep2Open(false);
        setStep3Open(true);
        setLastOpenedStep('step3');
    };

    // ✅ Step 3
    const handleTimeSlot = (slot) => {
        setTime(slot);
        setStep3Open(false);
        setShowDetails(true);
        setLastOpenedStep('step4');
    };
    
    const stepColor = (condition) => condition ? 'green' : '#7b7b7bff';

const redirectCheckout = () => {
    
}

    return (
        <div className="checkout-cont">

            {/* STEP 1 */}
            <div className="checkout" ref={step1Ref}>
                <div
                    className="checkout-step step1"
                    onClick={() => {
                        if (radio) {
                            setStep1Open(!step1Open);
                            if (!step1Open) setLastOpenedStep('step1');
                        }
                    }}
                >
                    <LooksOneIcon sx={{ fontSize: '2.6rem', color: stepColor(radio) }} />
                    <div className="checkout-step-head">
                        Select Sample Collection at
                    </div>
                </div>

                <div className={`checkout-form ${step1Open ? "smooth-open" : "smooth-closed"}`}>
                    {step1Open ? (
                        <div className="radio-btn">
                            <RadioBtn sendRadioData={handleRadio} />
                        </div>
                    ) : (
                        <div className="line"></div>
                    )}
                </div>
            </div>

            {/* STEP 2 */}
            <div className="checkout" ref={step2Ref}>
                <div
                    className="checkout-step step1"
                    onClick={() => {
                        if (date) {
                            setStep2Open(!step2Open);
                            if (!step2Open) setLastOpenedStep('step2');
                        }
                    }}
                >
                    <LooksTwoIcon sx={{ fontSize: '2.6rem', color: stepColor(date) }} />
                    <div className="checkout-step-head">Select Date</div>
                </div>

                <div className={`checkout-form ${step2Open ? "smooth-open" : "smooth-closed"}`}>
                    {step2Open ? (
                        <div className="radio-btn Calendar">
                            <Calendar sendDate={handleDate} />
                        </div>
                    ) : (
                        <div className="line"></div>
                    )}
                </div>
            </div>

            {/* STEP 3 */}
            <div className="checkout" ref={step3Ref}>
                <div
                    className="checkout-step step1"
                    onClick={() => {
                        if (time) {
                            setStep3Open(!step3Open);
                            if (!step3Open) setLastOpenedStep('step3');
                        }
                    }}
                >
                    <LooksThreeIcon sx={{ fontSize: '2.6rem', color: stepColor(time) }} />
                    <div className="checkout-step-head">Select Time Slot</div>
                </div>

                <div className={`checkout-form ${step3Open ? "smooth-open" : "smooth-closed"}`}>
                    {step3Open ? (
                        <div className="radio-btn Calendar">
                            <TimeSlot
                                selectedDate={date}
                                selectedTime={time}
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
            <div className="checkout" ref={step4Ref}>
                <div className="checkout-step step1">
                    <LooksFourIcon sx={{ fontSize: '2.6rem', color: stepColor(showDetails) }} />
                    <div className="checkout-step-head">Review Selected Details</div>
                </div>

                <div className={`checkout-form details ${showDetails ? "smooth-open" : "smooth-closed"}`}>
                    {showDetails && (
                        // <div className="radio-btn review-details">
                        //     <p><strong>Collection at:</strong> {radio || "-"}</p>
                        //     <p><strong>Date:</strong> {date ? date.format("DD-MM-YYYY") : "-"}</p>
                        //     <p><strong>Time Slot:</strong> {time || "-"}</p>
                        // </div>
                        <Details Radio={radio} Date={date} Time={time} />
                    )}
                </div>
            </div>

            <div className="proceed-btn">
                <Button
                    variant="contained"
                    disabled={!radio || !date || !time}
                >
                    Proceed
                </Button>
            </div>
        </div>
    );
}