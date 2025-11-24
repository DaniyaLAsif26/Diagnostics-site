import './All-booked-tests.css'
import './admin.css'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"

const BackendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export default function AllBookedTests() {
    const navigate = useNavigate()

    const [allAppointments, setAllAppointments] = useState([])
    const [selectedTab, setSelectedTab] = useState('pending');
    const [query, setQuery] = useState('')

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    };

    const Appointments = async (searchQuery = '') => {
        try {
            const res = await fetch(`${BackendURL}/api/appointments?q=${searchQuery}` ,{
                credentials: "include"
            });

            const data = await res.json();

            if (data.success) {
                setAllAppointments(data.appointments);
            } else {
                setAllAppointments([]);
            }
        }
        catch (err) {
            console.log(err)
            setAllAppointments([]);
        }
    }

    useEffect(() => {
        Appointments()
    }, []);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            Appointments(query);
        }, 400);

        return () => clearTimeout(delayDebounce);
    }, [query])

    const filteredAppointments = allAppointments.filter(appt => {
        if (selectedTab === 'pending') {
            return appt.completed === false
        } else {
            return appt.completed === true;
        }
    });

    return (
        <div className="all-booked-tests-cont">
            <div className="appointment-search">
                <div className="item-search">
                    <form className="item-search-form" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="text"
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder='Search Appointments'
                        />
                    </form>
                </div>
                <div className="appt-btn">
                    <button className='add-item-btn' onClick={(e) => navigate('/admin/book-appointment')}>Add Appointment</button>
                </div>
            </div>
            <div className="app-btn-selector-cont">
                <div className="app-btn-selector">
                    <div
                        className={`app-btn ${selectedTab === 'pending' ? 'selected-btn' : ''}`}
                        onClick={() => handleTabClick('pending')}
                        role="button"
                    >
                        Pending&nbsp; Appointments
                    </div>
                    <div
                        className={`app-btn ${selectedTab === 'completed' ? 'selected-btn' : ''}`}
                        onClick={() => handleTabClick('completed')}
                        role="button"
                    >
                        Completed&nbsp; Appointments
                    </div>
                </div>
            </div>

            <h2>{selectedTab === 'pending' ? 'Pending Appointments' : 'Completed Appointments'} : {filteredAppointments.length}</h2>
            {filteredAppointments.length > 0 ? (
                <div className="all-test-table-cont">
                    {filteredAppointments.map((appt) => (
                        <table className='all-test-table' onClick={() => navigate(`/appointments/${appt._id}`)}>
                            <tbody>
                                <tr>
                                    <th>Date</th>
                                    <td>{new Date(appt.date).toLocaleDateString('en-GB')}</td>
                                </tr>
                                <tr>
                                    <th>Day</th>
                                    <td>{appt.day}</td>
                                </tr>
                                <tr>
                                    <th>Collection</th>
                                    <td>{appt.radio}</td>
                                </tr>
                                <tr>
                                    <th>Tests</th>
                                    <td>{appt.tests.length}</td>
                                </tr>
                                <tr>
                                    <th>Number</th>
                                    <td>{appt.phone_no}</td>
                                </tr>
                                <tr>
                                    <th>Name</th>
                                    <td>{appt.name}</td>
                                </tr>
                                <tr>
                                    <th>Total</th>
                                    <td>{appt.total}</td>
                                </tr>
                            </tbody>
                        </table>
                    ))}
                </div>
            ) : (
                <p>No appointments booked yet.</p>
            )}
        </div>
    )
}