import dayjs from "dayjs";
import "./TimeSlot.css";
import Button from '@mui/material/Button';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState, useEffect, useRef } from "react";

export default function TimeSlot({ selectedDate: rawSelectedDate, selectedTime: initialSelectedTime, onSelectTime, finalCheck }) {

    // Convert native Date to dayjs object
    const selectedDate = dayjs(rawSelectedDate);

    const [selectedTime, setSelectedTime] = useState(null);
    const [error, setError] = useState(null);

    // Update local state when the prop changes (when reopening the step)
    useEffect(() => {
        if (initialSelectedTime) {
            setSelectedTime(initialSelectedTime);
        }
    }, [initialSelectedTime]);

    // Reset selected time when date changes
    useEffect(() => {
        if (!initialSelectedTime) {
            setSelectedTime(null);
        }
        setError(null);
    }, [rawSelectedDate, initialSelectedTime]);

    const finalStep = () => {
        if (!selectedTime) {
            setError("Please select a time slot");
            return;
        }
        onSelectTime(selectedTime);
        if(finalCheck){
            finalCheck();
        }
    }

    // All available time slots
    const AllTimeSlots = [
        { id: 'slot1', time: '8:30 - 9:30' },
        { id: 'slot2', time: '9:30 - 10:30' },
        { id: 'slot3', time: '10:30 - 11:30' },
        { id: 'slot4', time: '11:30 - 12:30' },
        { id: 'slot5', time: '13:30 - 14:30' },
        { id: 'slot6', time: '14:30 - 15:30' },
        { id: 'slot7', time: '15:30 - 16:30' },
        { id: 'slot8', time: '16:30 - 17:30' },
        { id: 'slot9', time: '17:30 - 18:30' },
        { id: 'slot10', time: '18:30 - 19:30' }, // Last slot for Sunday
        { id: 'slot11', time: '19:30 - 20:30' },
        { id: 'slot12', time: '20:30 - 21:30' },
        { id: 'slot13', time: '21:30 - 22:30' },
    ];

    // Filter slots based on the selected day
    const getAvailableSlots = () => {
        const isSunday = selectedDate.day() === 0; // dayjs: 0 = Sunday

        if (isSunday) {
            // On Sunday, only show slots up to 18:30-19:30 (slot10)
            // Since lab closes at 8:00 PM, last slot ends at 19:30 (7:30 PM)
            return AllTimeSlots.slice(0, 10); // slots 1-10
        }

        // Other days: show all slots
        return AllTimeSlots;
    };

    const TimeSlots = getAvailableSlots();

    const now = dayjs();

    const isSlotDisabled = (slot) => {
        const [start, end] = slot.time.split(" - ");
        const slotStart = dayjs(`${selectedDate.format("YYYY-MM-DD")} ${start}`, "YYYY-MM-DD HH:mm");
        const slotEnd = dayjs(`${selectedDate.format("YYYY-MM-DD")} ${end}`, "YYYY-MM-DD HH:mm");

        //  Past slots should be disabled only if date is today
        if (selectedDate.isSame(now, "day")) {
            if (now.isAfter(slotEnd)) {
                return true; // already ended
            }
            if (now.isAfter(slotStart.add(30, "minute"))) {
                return true; // 30 mins after start → disable
            }
        }
        return false;
    };

    const sliderRef = useRef(null);

    const scroll = (direction) => {
        if (sliderRef.current) {
            const scrollAmount = 300;
            sliderRef.current.scrollBy({
                top: direction === "next" ? scrollAmount : -scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <>

            <div className="time-slot-cont" >
                <div className="time-slot-slider" >
                    <button className="time-scroll-btn prev" onClick={() => scroll("prev")}>
                        <ExpandLessIcon />
                    </button>
                    <div className="time-slot-grid" ref={sliderRef}>
                        {TimeSlots.map((slot) => {
                            const disabled = isSlotDisabled(slot);
                            const isSelected = selectedTime === slot.time;
                            return (
                                <div
                                    key={slot.id}
                                    className={`slot ${disabled ? "disabled" : ""} ${isSelected ? "selected selected-btn" : ""}`}
                                    onClick={() => !disabled && (
                                        setSelectedTime(slot.time),
                                        setError(null)
                                    )}
                                >
                                    {slot.time}
                                </div>
                            );
                        })}
                    </div>
                    <button className="time-scroll-btn next" onClick={() => scroll("next")}>
                        <ExpandMoreIcon />
                    </button>
                </div>
                {/* Show a note for Sunday hours */}
                {selectedDate.day() === 0 && (
                    <div className="sunday-notice" style={{
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '10px',
                        fontStyle: 'italic'
                    }}>
                        Note: Centre closes at 8:00 PM on Sundays
                    </div>
                )}

                <div className="selected-time">
                    Selected Time Slot : <b>&nbsp;{selectedTime || "None"}</b>
                    {error &&
                        <div className="error-message">
                            <b>{error}</b>
                        </div>
                    }
                </div>
                <div className="next-btn">
                    <Button
                        variant="contained"
                        color="success"
                        size="large"
                        onClick={finalStep}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </>
    );
}