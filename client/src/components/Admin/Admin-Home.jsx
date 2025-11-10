import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../../context/LoginContext';

import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SummarizeIcon from '@mui/icons-material/Summarize';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

import AdminControlBox from "./Admin-control-box";
import AllUsersCont from './Admin-users-cont';
import AllBookedTests from './All-booked-tests';
import ReportsCont from './ReportsCont';
import './admin.css';

const adminControl = [
    { name: 'Users', className: 'adminUser', icon: <PeopleAltIcon /> },
    { name: 'Appointments', className: 'adminAppt', icon: <LocalHospitalIcon /> },
    { name: 'Reports', className: 'adminRept', icon: <SummarizeIcon /> },
];

export default function AdminHome() {
    const [selected, setSelected] = useState(()=> {
        return sessionStorage.getItem('selected') || 'Users';
    });

useEffect(()=>{
    sessionStorage.setItem("selected" , selected)
},[selected])

    const navigate = useNavigate();
    const { logoutAdmin } = useLogin();

    const logOutAdmin = () => {
        logoutAdmin();
        navigate('/home');
    };

    const navigateBack = () => {
        navigate('/home');
    };

    return (
        <div className="admin-home">
            <header>
                <div className="header-content">
                    <h1>Admin Dashboard</h1>
                    <div className="header-buttons">
                        <button className="btn-home" onClick={navigateBack}>
                            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                />
                            </svg>
                            Home
                        </button>
                        <button className="btn-logout" onClick={logOutAdmin}>
                            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                            </svg>
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <main>
                <div className="admin-main">
                <AdminControlBox box={adminControl} selected={selected} setSelected={setSelected} />

                {selected === 'Users' && (
                    <div className="selected-results all-users">
                        <AllUsersCont />
                    </div>
                )}

                {selected === 'Appointments' && (
                    <div className="selected-results">
                        <AllBookedTests />
                    </div>
                )}

                {selected === 'Reports' && (
                    <div className="selected-results">
                        <ReportsCont />
                    </div>
                )}
                </div>
            </main >
        </div>
    );
}
