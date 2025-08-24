import dayjs from "dayjs";
import "./TimeSlot.css";
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";

export default function TimeSlot({ selectedDate, selectedTime: initialSelectedTime, onSelectTime, finalCheck }) {

    const [selectedTime, setSelectedTime] = useState(initialSelectedTime || null);
    const [error, setError] = useState(null);

    // Update local state when the prop changes (when reopening the step)
    useEffect(() => {
        setSelectedTime(initialSelectedTime || null);
    }, [initialSelectedTime]);

    // Reset selected time when date changes
    useEffect(() => {
        setSelectedTime(null);
        setError(null);
    }, [selectedDate]);

    const finalStep = () => {
        if (!selectedTime) {
            setError("Please select a time slot");
            return;
        }
        onSelectTime(selectedTime);
        finalCheck();
    }

    const TimeSlots = [
        { id: 'slot1', time: '8:30 - 9:30' },
        { id: 'slot2', time: '9:30 - 10:30' },
        { id: 'slot3', time: '10:30 - 11:30' },
        { id: 'slot4', time: '11:30 - 12:30' },
        { id: 'slot5', time: '13:30 - 14:30' },
        { id: 'slot6', time: '14:30 - 15:30' },
        { id: 'slot7', time: '15:30 - 16:30' },
        { id: 'slot8', time: '16:30 - 17:30' },
        { id: 'slot9', time: '17:30 - 18:30' },
        { id: 'slot10', time: '18:30 - 19:30' },
        { id: 'slot11', time: '19:30 - 20:30' },
        { id: 'slot12', time: '20:30 - 21:30' },
        { id: 'slot13', time: '21:30 - 22:30' },
    ];

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

    return (
        <div className="time-slot-cont">
            <div className="time-slot-grid">
                {TimeSlots.map((slot) => {
                    const disabled = isSlotDisabled(slot);
                    const isSelected = selectedTime === slot.time;
                    return (
                        <div
                            key={slot.id}
                            className={`slot ${disabled ? "disabled" : ""} ${isSelected ? "selected" : ""}`}
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
            <div className="selected-time">
                Selected Time Slot : <b>&nbsp;{selectedTime}</b>
                {error &&
                    <div
                        className="error-message">
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
    );
}