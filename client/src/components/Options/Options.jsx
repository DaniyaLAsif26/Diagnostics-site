import './Options.css';
import Kart from './Kart';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Options({ option, dropOptins }) {
    const navigate = useNavigate();
    const location = useLocation();

    const [openDropdown, setOpenDropdown] = useState(false);

    const [optionSize, setOptionSize] = useState(window.innerWidth >= 1000);

    useEffect(() => {
        const handleResize = () => {
            setOptionSize(window.innerWidth >= 1000);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <ul className="option-ul">
            {option.map((options) => (
                <li
                    className={`option-item
                     ${location.pathname === options.path ? "option-selected" : ""}
                     ${options.name === "Book a Test" ? "test-li" : ""}
                     ${options.name === "Book a Test" &&
                            (location.pathname === "/tests/laboratory" ||
                                location.pathname === "/tests/radiology")
                            ? "option-selected"
                            : ""
                        }
`}
                    key={options.id}
                    onClick={() => {
                        if (options.name === "Book a Test") {
                            setOpenDropdown(prev => !prev);
                            // setOpenDropdown(true);
                        } else {
                            navigate(options.path);
                            setOpenDropdown(false);
                        }
                    }}
                >
                    <div className="dropdown-wrapper">
                        {options.name === "Book a Test" ? (
                            <>
                                <div className="dropdown-icon"> {options.name} < ArrowDropDownIcon className="dropdown-icon" />
                                </div>
                            </>
                        )
                            : (
                                <>{options.name}</>
                            )
                        }

                        {options.name === "Book a Test" && openDropdown && (
                            <div className="dropdown-cont">
                                <ul className="dropdown-ul">
                                    {dropOptins.map((subtest) => (
                                        <li
                                            className={`dropdown-li ${subtest.category === location.pathname.replace('/tests/', "") ? 'drop-li-selected' : ''} `}
                                            key={subtest.name}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(subtest.path);
                                                setOpenDropdown(false);
                                            }}
                                        >
                                            {subtest.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </li>
            ))
            }

            {optionSize && <Kart />}
        </ul >
    );
}