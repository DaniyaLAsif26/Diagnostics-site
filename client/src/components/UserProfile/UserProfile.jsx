// import './UserProfile.css'
// import { useState, useEffect } from 'react';

// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// import SummarizeIcon from '@mui/icons-material/Summarize';

// import { useLogin } from '../../context/LoginContext';
// import { useNavigate } from 'react-router-dom';

// export default function UserProfile() {
//     const navigate = useNavigate()

//     const { userData, logout } = useLogin()

//     const [selected, setSelected] = useState('appointments')

//     useEffect(() => {
//         if (userData) {
//             setAppointments(userData.appointments || [])
//             setReports(userData.reports || [])
//         }
//     }, [userData])

//     const formatedNumber = (number) => {
//         if (!number) return '';

//         let str = number.toString();

//         if (str.startsWith("91")) {
//             return str.replace(/^91/, "+91 - ");
//         }

//         return str;
//     };

//     const logoutUser = () => {
//         logout()
//         navigate('/home')
//     }

//     const editUserDetails = () => {
//         navigate('/user-profile/edit')
//     }

//     const formatDate = (dateStr) => {
//         return new Date(dateStr).toLocaleString("en-IN", {
//             day: "2-digit",
//             month: "short",
//             year: "numeric",
//         });
//     };

//     const cancelAppointment = () => {
//     }

//     return (
//         <div className="user-profile-cont">
//             {userData &&
//                 <>
//                     <div className="user-details-cont">
//                         <div className="user-name">
//                             <div className="" >Name : {userData.name}</div>
//                         </div>
//                         <div className="use-details-club">
//                             <div className="user-details-2">
//                                 <div className="" ><b>Phone No : </b>{formatedNumber(userData.phone_no)}</div>
//                                 <div className="" ><b>Address : </b>{userData.address}</div>
//                             </div>
//                             <div className="userdetails-3">
//                                 <div className="" ><b>Second No : </b>{formatedNumber(userData.alt_no)}</div>
//                                 <div className="" ><b>Age : </b></div>
//                             </div>
//                         </div>
//                         <div className="user-btns">
//                             <div className="user-edit-btn">
//                                 <button onClick={editUserDetails}>
//                                     Edit
//                                 </button>
//                             </div>
//                             <div className="user-logout-btn">
//                                 <button onClick={logoutUser} className='user-logout-btn'>
//                                     Log Out
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="user-history">
//                         <div className='user-history-selector' >

//                             <div className={`user-appointments ${selected === 'appointments' && 'selected'}`} onClick={() => setSelected('appointments')}>
//                                 <CalendarMonthIcon sx={{ fontSize: '4rem' }} />
//                                 <div className="">Appointments</div>
//                             </div>
//                             <div className={`user-reports ${selected === 'reports' && 'selected'}`} onClick={() => setSelected('reports')}>
//                                 <SummarizeIcon sx={{ fontSize: '4rem' }} />
//                                 <div className="">Reports</div>
//                             </div>
//                         </div>
//                         <div className="user-selector-result">
//                             {selected === 'appointments' && (
//                                 <div className="user-result-appointments user-results">
//                                     {userData.appointments && userData.appointments.length > 0 ? (
//                                         userData.appointments.map((test) => (
//                                             < div className="result-appointments" id={test._id}>
//                                                 <div className="result">
//                                                     <div className="appt-date appt">
//                                                         <div className=""><b>Name</b></div>
//                                                         <div className="">{test.name}</div>
//                                                     </div>
//                                                     <div className="appt-date appt">
//                                                         <div className=""><b>Date</b></div>
//                                                         <div className="">{formatDate(test.date)}</div>
//                                                     </div>
//                                                     <div className="appt-time appt">
//                                                         <div className=""><b>Time</b></div>
//                                                         <div className="">{test.time}</div>
//                                                     </div>
//                                                     <div className="appt-collection appt">
//                                                         <div className=""><b>Collection</b></div>
//                                                         <div className="">{test.radio}</div>
//                                                     </div>
//                                                     <div className="appt-tests appt">
//                                                         <div className=""><b>Tests</b></div>
//                                                         <div className="tests">{test.tests.map((item) => (
//                                                             <div className="">{item.name}</div>
//                                                         ))}</div>
//                                                     </div>
//                                                     <div className="appt-price appt">
//                                                         <div className=""><b>Total</b></div>
//                                                         <div className="">{test.total}</div>
//                                                     </div>
//                                                 </div>
//                                                 <div className="result-end">
//                                                     <div className="result-status">
//                                                         {test.completed === false ? "Status: Pending" : "Status: Completed"}
//                                                     </div>
//                                                     {(test.completed === false && (test.paymentStatus === 'Pending' || test.paymentStatus === 'Failed')) && (
//                                                         <div className="result-delete-btn">
//                                                             <button
//                                                                 onClick={cancelAppointment}
//                                                             >Cancel Appointment
//                                                             </button>
//                                                         </div>
//                                                     )}
//                                                 </div>

//                                             </div>
//                                         ))

//                                     ) : (
//                                         <h2>No Appointments to show</h2>
//                                     )
//                                     }
//                                 </div>
//                             )}
//                             {selected === 'reports' && (
//                                 userData.reports && userData.reports.length > 0 ? (
//                                     <div className="user-result-reports user-results">
//                                         <table className='user-report-table'>
//                                             <thead className='table-head'>
//                                                 <tr>
//                                                     <th>Unique ID</th>
//                                                     <th>Report</th>
//                                                 </tr>
//                                             </thead>
//                                             <tbody className='table-body'>
//                                                 {userData.reports.map((rpt) => (
//                                                     <tr key={rpt._id}>
//                                                         <td>{rpt.uniq_id}</td>
//                                                         <td>
//                                                             <a
//                                                                 href={rpt.file_url}
//                                                                 target="_blank"
//                                                                 rel="noopener noreferrer"
//                                                             >
//                                                                 download
//                                                             </a>
//                                                         </td>
//                                                     </tr>
//                                                 ))}
//                                             </tbody>
//                                         </table>
//                                     </div>
//                                 ) : (
//                                     <div className="user-result-reports user-results">
//                                         <h2>No Reports to show</h2>
//                                     </div>
//                                 )
//                             )}

//                         </div>
//                     </div>
//                 </>
//             }


//         </div >
//     )
// }

import './UserProfile.css'
import { useState, useEffect } from 'react';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SummarizeIcon from '@mui/icons-material/Summarize';

import { useLogin } from '../../context/LoginContext';
import { useNavigate } from 'react-router-dom';

export default function UserProfile() {
    const navigate = useNavigate()

    const { userData, logout } = useLogin()

    const [selected, setSelected] = useState('appointments')
    const [appointments, setAppointments] = useState([])
    const [reports, setReports] = useState([])

    // Add this useEffect to sync with userData changes
    useEffect(() => {
        if (userData) {
            setAppointments(userData.appointments || [])
            setReports(userData.reports || [])
        }
    }, [userData]) // This will trigger whenever userData changes

    const formatedNumber = (number) => {
        if (!number) return '';

        let str = number.toString();

        if (str.startsWith("91")) {
            return str.replace(/^91/, "+91 - ");
        }

        return str;
    };

    const logoutUser = () => {
        logout()
        navigate('/home')
    }

    const editUserDetails = () => {
        navigate('/user-profile/edit')
    }

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const cancelAppointment = () => {
    }

    return (
        <div className="user-profile-cont">
            {userData &&
                <>
                    <div className="user-details-cont">
                        <div className="user-name">
                            <div className="" >Name : {userData.name}</div>
                        </div>
                        <div className="use-details-club">
                            <div className="user-details-2">
                                <div className="" ><b>Phone No : </b>{formatedNumber(userData.phone_no)}</div>
                                <div className="" ><b>Address : </b>{userData.address}</div>
                            </div>
                            <div className="userdetails-3">
                                <div className="" ><b>Second No : </b>{formatedNumber(userData.alt_no)}</div>
                                <div className="" ><b>Age : </b></div>
                            </div>
                        </div>
                        <div className="user-btns">
                            <div className="user-edit-btn">
                                <button onClick={editUserDetails}>
                                    Edit
                                </button>
                            </div>
                            <div className="user-logout-btn">
                                <button onClick={logoutUser} className='user-logout-btn'>
                                    Log Out
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="user-history">
                        <div className='user-history-selector' >

                            <div className={`user-appointments ${selected === 'appointments' && 'selected'}`} onClick={() => setSelected('appointments')}>
                                <CalendarMonthIcon sx={{ fontSize: '4rem' }} />
                                <div className="">Appointments</div>
                            </div>
                            <div className={`user-reports ${selected === 'reports' && 'selected'}`} onClick={() => setSelected('reports')}>
                                <SummarizeIcon sx={{ fontSize: '4rem' }} />
                                <div className="">Reports</div>
                            </div>
                        </div>
                        <div className="user-selector-result">
                            {selected === 'appointments' && (
                                <div className="user-result-appointments user-results">
                                    {appointments && appointments.length > 0 ? (
                                        appointments.map((test) => (
                                            <div className="result-appointments" key={test._id}>
                                                <div className="result">
                                                    <div className="appt-date appt">
                                                        <div className=""><b>Name</b></div>
                                                        <div className="">{test.name}</div>
                                                    </div>
                                                    <div className="appt-date appt">
                                                        <div className=""><b>Date</b></div>
                                                        <div className="">{formatDate(test.date)}</div>
                                                    </div>
                                                    <div className="appt-time appt">
                                                        <div className=""><b>Time</b></div>
                                                        <div className="">{test.time}</div>
                                                    </div>
                                                    <div className="appt-collection appt">
                                                        <div className=""><b>Collection</b></div>
                                                        <div className="">{test.radio}</div>
                                                    </div>
                                                    <div className="appt-tests appt">
                                                        <div className=""><b>Tests</b></div>
                                                        <div className="tests">{test.tests.map((item, idx) => (
                                                            <div className="" key={idx}>{item.name}</div>
                                                        ))}</div>
                                                    </div>
                                                    <div className="appt-price appt">
                                                        <div className=""><b>Total</b></div>
                                                        <div className="">{test.total}</div>
                                                    </div>
                                                </div>
                                                <div className="result-end">
                                                    <div className="result-status">
                                                        {test.completed === false ? "Status: Pending" : "Status: Completed"}
                                                    </div>
                                                    {(test.completed === false && (test.paymentStatus === 'Pending' || test.paymentStatus === 'Failed')) && (
                                                        <div className="result-delete-btn">
                                                            <button
                                                                onClick={cancelAppointment}
                                                            >Cancel Appointment
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>

                                            </div>
                                        ))

                                    ) : (
                                        <h2>No Appointments to show</h2>
                                    )
                                    }
                                </div>
                            )}
                            {selected === 'reports' && (
                                reports && reports.length > 0 ? (
                                    <div className="user-result-reports user-results">
                                        <table className='user-report-table'>
                                            <thead className='table-head'>
                                                <tr>
                                                    <th>Unique ID</th>
                                                    <th>Report</th>
                                                </tr>
                                            </thead>
                                            <tbody className='table-body'>
                                                {reports.map((rpt) => (
                                                    <tr key={rpt._id}>
                                                        <td>{rpt.uniq_id}</td>
                                                        <td>

                                                            <a href={rpt.file_url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                download
                                                            </a>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="user-result-reports user-results">
                                        <h2>No Reports to show</h2>
                                    </div>
                                )
                            )}

                        </div>
                    </div>
                </>
            }


        </div >
    )
}