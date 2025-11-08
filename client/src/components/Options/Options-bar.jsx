import './Options-bar.css';
import Options from './Options';
import NavSearch from '../Navbar/Nav-search'
import NavLogo from '../Navbar/Nav-logo'

import PersonIcon from '@mui/icons-material/Person';
import Button from '@mui/material/Button';

import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { useLogin } from '../../context/LoginContext';

import { v4 as uuidv4 } from 'uuid';

const options = [
    { id: uuidv4(), name: 'Book a Test', path: '/all-tests' },
    { id: uuidv4(), name: 'Health Packages', path: '/all-packages' },
    { id: uuidv4(), name: 'Download Reports', path: '/download-reports' },
    { id: uuidv4(), name: 'About Us', path: '/about-us' },
    { id: uuidv4(), name: 'Gallery', path: '/gallery' },
];

const bookTestSubmenu = [
    { name: "Laboratory Tests", path: "/tests/laboratory", category: "laboratory" },
    { name: "Radiology Tests", path: "/tests/radiology", category: "radiology" },
];


export default function OptionsBar() {
    const { userData, isLoggedIn, toggleLoginForm } = useLogin()
    const location = useLocation()
    const navigate = useNavigate()

    const [sideBar, setSideBar] = useState(window.innerWidth < 665)
    const [openSideBar, setOpenSideBar] = useState(false)
    const [shouldRender, setShouldRender] = useState(false)
    const [animateIn, setAnimateIn] = useState(false)

    const [openSideDropdown, setOpenSideDropdown] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setSideBar(window.innerWidth < 665)
        }

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [])

    useEffect(() => {
        document.body.style.overflow = openSideBar ? 'hidden' : 'auto'
    }, [openSideBar])

    // Handle mounting/unmounting with delay for transition
    useEffect(() => {
        if (openSideBar) {
            setShouldRender(true)
            // Small delay to trigger animation after mount
            const timer = setTimeout(() => {
                setAnimateIn(true)
            }, 10)
            return () => clearTimeout(timer)
        } else {
            setAnimateIn(false)
            // Delay unmounting to allow closing animation
            const timer = setTimeout(() => {
                setShouldRender(false)
            }, 320) // Slightly longer than CSS transition to ensure smooth close

            return () => clearTimeout(timer)
        }
    }, [openSideBar])

    const formatedNumber = (number) => {
        if (!number) return '';

        let str = number.toString();

        if (str.startsWith("91")) {
            return str.replace(/^91/, "");
        }

        return str;
    };

    return (
        <div className="options-bar-cont">
            {sideBar ? (
                <>
                    <div
                        className="sidebar"
                        onClick={() => setOpenSideBar(true)} >
                        <DensityMediumIcon style={{ color: 'black' }} />
                    </div>
                    {shouldRender && (
                        <div className={`sidebar-cont ${animateIn ? "show" : ""}`} onClick={() => setOpenSideBar(false)}>
                            <div className={`side-drawer ${animateIn ? "show" : ""}`} onClick={(e) => e.stopPropagation()}>
                                <div className="side-close-btn">
                                    <CancelIcon
                                        fontSize="medium"
                                        className="cancel-icon"
                                        onClick={() => setOpenSideBar(false)}
                                    />
                                </div>

                                <div className="side-logo"  onClick={() => setOpenSideBar(false)}>
                                    <NavLogo />
                                </div>
                                <div className="side-search">
                                    <NavSearch
                                        onSideSearch={() =>
                                            setOpenSideBar(false)}
                                    />
                                </div>
                                <div className="side-options">
                                    <ul className='side-options-ul'>
                                        {options.map((option) => (
                                            <>
                                                <li
                                                    key={option.id}
                                                    className={` ${location.pathname === option.path ? 'side-selected' : ''}
                                                ${option.name === "Book a Test" && 'side-dropdown'}
                                                `}

                                                    onClick={() => {
                                                        if (option.name === "Book a Test") {
                                                            setOpenSideBar(true)
                                                            setOpenSideDropdown(prev => !prev);
                                                        } else {
                                                            navigate(option.path);
                                                            setOpenSideBar(false)
                                                            setOpenSideDropdown(false)
                                                        }
                                                    }
                                                    }
                                                >
                                                    {option.name === "Book a Test" ? (
                                                        <>
                                                            <div className={`side-dropdown-icon ${location.pathname === '/tests/laboratory' || location.pathname === '/tests/radiology' ? 'side-drop-li-selected' : ''}`}>
                                                                {option.name}
                                                                <ArrowDropDownIcon className="dropdown-icon" />
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            {option.name}
                                                        </>
                                                    )}
                                                    {/* openSideDropdown && */}
                                                    {option.name === "Book a Test" && (
                                                        <>
                                                            <ul className={`subtest-ul ${openSideDropdown ? "open" : ""}`}>
                                                                {bookTestSubmenu.map((subtest) => (
                                                                    < li
                                                                        className={` ${location.pathname === subtest.path ? 'side-selected' : ''}
                                                `}
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            navigate(subtest.path);
                                                                            setOpenSideBar(false)
                                                                        }}
                                                                    >
                                                                        {subtest.name}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </>
                                                    )}
                                                </li >
                                            </>
                                        ))}
                                    </ul>
                                </div>
                                <div className="side-user-login">
                                    {isLoggedIn ?
                                        <div className="side-user">
                                            <div className="user-icon">
                                                <PersonIcon sx={{ border: '2px solid black', cursor: 'pointer' }} />
                                            </div>
                                            <div className="side-user-details" onClick={() => {
                                                navigate('/user-profile');
                                                setOpenSideBar(false)
                                            }
                                            }>
                                                <div className="side-user-name">{userData.name}</div>
                                                <div className="side-user-number">{formatedNumber(userData.phone_no)}</div>
                                            </div>
                                        </div>
                                        : (
                                            <div className="side-login">
                                                <Button
                                                    onClick={() => {
                                                        setOpenSideBar(false);
                                                        toggleLoginForm();
                                                    }}
                                                    variant="contained"
                                                    size="small">
                                                    Sign in
                                                </Button>
                                            </div>
                                        )}
                                </div>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className="options-bar">
                    <Options option={options} dropOptins={bookTestSubmenu} />
                </div>
            )
            }
        </div >
    )
}