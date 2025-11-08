import { createContext, useContext, useState, useEffect } from "react";

export const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {

    const [appointmentMessage, setAppointmentMessage] = useState("");
    const [appointment, setAppointment] = useState(() => {
        try {
            const saved = sessionStorage.getItem('appointmentData');
            if (saved) {
                const parsed = JSON.parse(saved);
                // Convert date string back to Date object if it exists
                if (parsed.date) {
                    parsed.date = new Date(parsed.date);
                }
                return parsed;
            }
        } catch (error) {
            console.warn('Failed to load appointment data:', error);
        }

        // Return default state if no saved data or error
        return {
            radio: "",
            date: null,
            time: "",
        };
    });

    // Save to sessionStorage whenever appointment changes
    useEffect(() => {
        try {
            sessionStorage.setItem('appointmentData', JSON.stringify(appointment));
        } catch (error) {
            console.warn('Failed to save appointment data:', error);
        }
    }, [appointment]);

    const updateAppointment = (field, value) => {
        setAppointment((prev) => ({ ...prev, [field]: value }));
    };

    const clearAppointment = () => {
        setAppointment({
            radio: "",
            date: null,
            time: "",
        });

        try {
            sessionStorage.removeItem('appointmentData');
        } catch (error) {
            console.warn('Failed to clear appointment data:', error);
        }
    };

    const clearAppointmentMessage = () => {
        setAppointmentMessage("");
    }

    return (
        <AppointmentContext.Provider value={{ appointment, updateAppointment, clearAppointment, clearAppointmentMessage, appointmentMessage, setAppointmentMessage }}>
            {children}
        </AppointmentContext.Provider>
    );
};

export function useAppointment() {
    return useContext(AppointmentContext);
}