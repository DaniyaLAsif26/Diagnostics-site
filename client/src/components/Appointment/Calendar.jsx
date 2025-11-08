import { useState, useEffect, useRef } from "react";
import Button from '@mui/material/Button';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

import './Calendar.css';

export default function Calendar({ sendDate, selectedDate: initialSelectedDate }) {
  const [selectedDate, setSelectedDate] = useState(null);
  // console.log(selectedDate)

  // Initialize with the prop value on component mount and when prop changes
  useEffect(() => {
    if (initialSelectedDate) {
      setSelectedDate(new Date(initialSelectedDate));
    }
  }, [initialSelectedDate]);

  // Get current date and generate next 6 days
  const today = new Date();
  const dates = [];

  for (let i = 0; i < 6; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date);
  }

  const formatDay = (date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const suffix = ['th', 'st', 'nd', 'rd'][day % 10 > 3 || Math.floor(day / 10) === 1 ? 0 : day % 10];
    return `${day}${suffix}`;
  };

  const formatMonth = (date) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[date.getMonth()];
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSameDate = (date1, date2) => {
    return date1 && date2 && date1.toDateString() === date2.toDateString();
  };

  const submitDate = () => {
    sendDate(selectedDate);
  }

  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = window.innerWidth < 360 ? 100 : 200;
      sliderRef.current.scrollBy({
        left: direction === "next" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className="calendar-slider">
        <button className="calendar-scroll-btn prev" onClick={() => scroll("prev")}>
          <NavigateBeforeIcon />
        </button>
        <div className="calendar-cont" ref={sliderRef}>

          {dates.map((date, index) => (
            <div
              key={index}
              onClick={() => setSelectedDate(date)}
              className={`date-card ${isToday(date) ? ' today' : ''} ${isSameDate(selectedDate, date) && 'selected'} `}
            >
              <div className="day-date">
                {isToday(date) ? ' Today'
                  :
                  <>
                    <span> {formatDay(date)}</span>
                    <span> {formatDate(date)}</span>
                  </>
                }
              </div>
              <div className="text-xs opacity-90">
                {isToday(date) ?
                  <>
                    <span>{formatDate(date)}</span>
                    &nbsp;
                    <span>{formatMonth(date)}</span>
                  </>
                  :
                  <>
                    <span>{formatMonth(date)}</span>
                  </>
                }
              </div>
            </div>
          ))}

        </div>
        <button className="calendar-scroll-btn next" onClick={() => scroll("next")}>
          <NavigateNextIcon />
        </button>
      </div>

      {/* Selected Date Display */}

      <div className="select-date-cont">
        <h3 className="select-date-head">Selected Date:</h3>

        {
          selectedDate ? (
            <div className="selected-date">
              {selectedDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          ) : (
            <>
              <div className="">
                None
              </div>
            </>
          )
        }
      </div>

      <div className="next-btn">
        <Button
          variant="contained"
          color="success"
          size="large"
          disabled={!selectedDate}
          onClick={submitDate}
        >
          Next
        </Button>
      </div>
    </>
  )
}