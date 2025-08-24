import { useState } from "react";
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Button from '@mui/material/Button';


import './Calendar.css';

export default function Calendar({ sendDate }) {
  const today = dayjs();
  const maxDate = today.add(3, "day"); 

  const [selectedDate, setSelectedDate] = useState(today);

  const submitDate =  () => {
    sendDate(selectedDate);
  }

  return (
    <div style={{ textAlign: "center" }} className="calendar-cont">
      <div className="calendar" style={{ marginBottom: "20px" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={selectedDate}
            onChange={(newDate) => setSelectedDate(newDate)}
            disablePast
            minDate={today}
            maxDate={maxDate}
            views={["day"]}
            sx={{
              // Override MUI's internal height constraints but maintain document flow
              height: "auto !important",
              minHeight: "auto !important",
              maxHeight: "none !important",
              width: "100%",
              maxWidth: "none",
              minWidth: "400px",
              overflow: "visible !important",
              display: "block", // Ensure proper block-level behavior
              // position: "static", // Ensure it stays in document flow
              marginBottom: "2rem", // Add bottom margin to push content down

              // Container styling - Force auto height but maintain flow
              "& .MuiDateCalendar-root": {
                width: "100%",
                height: "auto !important",
                minHeight: "auto !important",
                maxHeight: "none !important",
                maxWidth: "none",
                overflow: "visible !important",
                display: "block",
                // position: "static",
              },

              // Week container styling
              "& .MuiDayCalendar-weekContainer": {
                justifyContent: "space-between",
                margin: "0",
                height: "auto !important",

              },

              // Month container styling - Critical for preventing scrollbars
              "& .MuiDayCalendar-monthContainer": {
                width: "100%",
                height: "auto !important",
                minHeight: "auto !important",
                maxHeight: "none !important",
                overflow: "visible !important",

              },

              // Slides container - This often causes the scrollbar issue
              "& .MuiDayCalendar-slideTransition": {
                height: "auto !important",
                minHeight: "auto !important",
                overflow: "visible !important",
              },

              // Header styling
              // "& .MuiPickersCalendarHeader-root": {
              //   paddingLeft: "16px",
              //   paddingRight: "16px",
              //   minHeight: "40px",
              // },

              "& .MuiPickersCalendarHeader-label": {
                fontSize: "20px",
                marginBottom: "0.5rem",
                fontWeight: "600",
                marginTop: "3.5rem",

              },

              "& .MuiPickersArrowSwitcher-root": {
                display: "none"
              },

              "& .MuiDayCalendar-weekDayLabel": {
                fontSize: "18px",
                fontWeight: "600",
                width: "5rem",
                marginTop: "2.6rem",
              },

              // Day numbers (bigger cells)
              "& .MuiPickersDay-root": {
                fontSize: "18px",
                height: "60px", // Your increased height
                width: "4rem",
                margin: "2px",
                flexShrink: 0,
              },

              // Selected date styling
              "& .Mui-selected": {
                backgroundColor: "#1976d2 !important",
                color: "white",
                fontWeight: "bold",
              },

              // Disabled dates styling
              "& .Mui-disabled": {
                color: "#ccc",
              },

              // Force all internal containers to be visible
              "& .MuiDateCalendar-root, & .MuiDayCalendar-monthContainer, & .MuiDayCalendar-weekContainer, & .MuiDayCalendar-slideTransition": {
                overflowX: "visible !important",
                overflowY: "visible !important",
              },
            }}
          />
        </LocalizationProvider>
      </div>

      <div className="selected-date">
        Selected Date: <b>{selectedDate.format("DD/MM/YYYY")}</b>
      </div>
      <div className="next-btn">
        <Button
          variant="contained"
          color="success"
          size="large"
          onClick ={submitDate}
          >
          Next
        </Button>
      </div>
    </div>
  );
}