import './book-appointment.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RadioBtn from '../Appointment/Radio.jsx'
import TimeSlot from '../Appointment/TimeSlot.jsx'
import Calendar from '../Appointment/Calendar.jsx'

const BackendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export default function BookAppointment() {
    const navigate = useNavigate()

    const [search, setSearch] = useState('')
    const [message, setMessage] = useState('')

    const [number, setNumber] = useState(() => {
        return sessionStorage.getItem('userNumber') || '';
    });
    const [name, setName] = useState(() => {
        return sessionStorage.getItem('userName') || '';
    });
    const [radio, setRadio] = useState(() => {
        return sessionStorage.getItem('userRadio') || '';
    });
    const [address, setAddress] = useState(() => {
        return sessionStorage.getItem('userAddress') || '';
    });
    const [date, setDate] = useState(() => {
        return sessionStorage.getItem('appointmentDate') || '';
    });
    const [time, setTime] = useState(() => {
        return sessionStorage.getItem('appointmentTime') || '';
    });
    const [discount, setDiscount] = useState(() => {
        const saved = sessionStorage.getItem('discount');
        return saved ? Number(saved) : 0;
    });

    const [testResults, setTestResults] = useState([]);
    const [packageResults, setPackageResults] = useState([]);
    const [selectedItems, setSelectedItems] = useState(() => {
        const saved = sessionStorage.getItem('selectedItems');
        return saved ? JSON.parse(saved) : [];
    });
    let subtotal;

    useEffect(() => {
        sessionStorage.setItem('userName', name);
    }, [name]);

    useEffect(() => {
        sessionStorage.setItem('userNumber', number);
    }, [number]);

    useEffect(() => {
        sessionStorage.setItem('userRadio', radio);
    }, [radio]);

    useEffect(() => {
        sessionStorage.setItem('userAddress', address);
    }, [address]);

    useEffect(() => {
        sessionStorage.setItem('appointmentDate', date);
    }, [date]);

    useEffect(() => {
        sessionStorage.setItem('appointmentTime', time);
    }, [time]);

    useEffect(() => {
        sessionStorage.setItem('discount', discount.toString());
    }, [discount]);

    const getSearchresult = async () => {
        try {
            const res = await fetch(`${BackendURL}/api/search?q=${search}`);
            const data = await res.json();
            setTestResults(data.tests || []);
            setPackageResults(data.packages || []);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    }

    const getUsers = async (searchQuery = '') => {
        try {
            const res = await fetch(`${BackendURL}/api/user/search?q=${searchQuery}`, {
                credentials: 'include'
            });
            const data = await res.json();

            if (data.Success === true) {
                setMessage('User Found');
            } else {
                setMessage(data.message || 'No Users found');
            }
        } catch (err) {
            console.log(err);
            setMessage(err.message);
        }
    };

    useEffect(() => {
        if (number) {
            getUsers(number)
        }
    }, [number])

    useEffect(() => {
        if (search) {
            getSearchresult()
        } else {
            setTestResults([]);
            setPackageResults([]);
        }
    }, [search])

    useEffect(() => {
        sessionStorage.setItem('selectedItems', JSON.stringify(selectedItems));
    }, [selectedItems])

    const clearInput = () => {
        setSearch('')
    }

    const addItem = (item, type) => {
        const exists = selectedItems.some(selected => selected._id === item._id);
        if (!exists) {
            setSelectedItems([...selectedItems, { ...item, type }]);
        }
    }

    const removeItem = (id) => {
        setSelectedItems(selectedItems.filter(item => item._id !== id));
    }

    const isItemAdded = (id) => {
        return selectedItems.some(item => item._id === id);
    }

    const calculateTotal = () => {
        return subtotal = selectedItems.reduce((sum, item) => sum + item.price, 0);
    }

    const clearAllItems = () => {
        setSelectedItems([]);
        sessionStorage.removeItem('selectedItems');
    }

    const radioOption = (radio) => {
        setRadio(radio)
    }

    const getDate = (date) => {
        setDate(date)
    }

    const getTime = (time) => {
        setTime(time)
    }

    const bookAdminAppt = async () => {
        const total = subtotal - discount;

        if (!number || number.length < 10) {
            return alert('Please enter Number')
        }
        if (!name) {
            return alert('Please enter Name')
        }
        if (!radio) {
            return alert('Please enter Sample Collection')
        }
        if (!date) {
            return alert('Please enter Date')
        }
        if (!time) {
            return alert('Please enter Time')
        }
        if (radio === 'Home Address' && !address) {
            return alert('Please enter Address')
        }

        const appointmentData = {
            name: name,
            phone_no: `91${number}`,
            altno: '',
            address: address,
            radio: radio,
            date: date,
            day: new Date(date).toLocaleDateString("en-US", { weekday: "long" }),
            tests: selectedItems.map((item) => ({
                name: item.name,
                price: item.price,
            })),
            time: time,
            subtotal,
            discount,
            total,
            paymentStatus: 'Pending',
            completed: false,
            completedBy: "",
            comments: "",
        }
        try {
            const res = await fetch(`${BackendURL}/api/save/appointment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify(appointmentData),
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error("Failed to save appointment");
            }

            if (data.success === true) {
                sessionStorage.clear();
                navigate('/admin/dashboard');
            }

        }
        catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div className="book-appointment">
            <button className="back-btn" onClick={() => navigate('/admin/dashboard')}>Back</button>
            <div className="book-appointment-head">
                <h3>Book Appointment</h3>
            </div>
            <div className="item-search-form">
                <input
                    type="text"
                    placeholder='Search Appointments & Tests'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button onClick={clearInput} className='clear-btn'>Clear</button>
            </div>

            <div className="search-results">
                {testResults.length > 0 && (
                    <>
                        <div className="admin-test-heading">
                            <h2>Tests</h2>
                        </div>
                        <div className="test-results">
                            {testResults.map((test) => (
                                <div
                                    className={`admin-search-tests ${isItemAdded(test._id) ? 'added' : ''}`}
                                    key={test._id}
                                >
                                    <div>{test.name}</div>
                                    <div>&#8377; {test.price}</div>
                                    <div>
                                        <button
                                            className='add-appt-btn'
                                            onClick={() => addItem(test, 'test')}
                                            disabled={isItemAdded(test._id)}
                                        >
                                            {isItemAdded(test._id) ? 'ADDED' : 'ADD'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {packageResults.length > 0 && (
                    <>
                        <div className="admin-package-heading admin-test-heading">
                            <h2>Packages</h2>
                        </div>
                        <div className="pack-results">
                            {packageResults.map((pack) => (
                                <div
                                    className={`admin-search-packs ${isItemAdded(pack._id) ? 'added' : ''}`}
                                    key={pack._id}
                                >
                                    <div>{pack.name}</div>
                                    <div>&#8377; {pack.price}</div>
                                    <div>
                                        <button
                                            className='add-appt-btn'
                                            onClick={() => addItem(pack, 'package')}
                                            disabled={isItemAdded(pack._id)}
                                        >
                                            {isItemAdded(pack._id) ? 'ADDED' : 'ADD'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            <div className={`book-appt-details ${selectedItems.length === 0 ? 'empty' : ''}`}>
                {selectedItems.length === 0 ? (
                    <p>No items added yet. Search and add tests or packages above.</p>
                ) : (
                    <>
                        <div className="selected-item-head">
                            <h3>Selected Items : </h3>
                        </div>
                        <div className="selected-items-list">
                            {selectedItems.map((item) => (
                                <div className="selected-item" key={item._id}>
                                    <div className="selected-item-info">
                                        <span className="selected-item-name">{item.name}</span>
                                        <span className="selected-item-type">{item.type}</span>
                                    </div>
                                    <div className="selected-item-price">
                                        &#8377; {item.price}
                                    </div>
                                    <button
                                        className="remove-item-btn"
                                        onClick={() => removeItem(item._id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="appt-total">
                            <div className="appt-total-label">Total Amount:</div>
                            <div className="appt-total-amount">&#8377; {calculateTotal()}</div>
                        </div>
                        <div className="appt-user">
                            <h3>Add User</h3>
                            <div className="item-search-cont">
                                <form className="item-search-form">
                                    <input
                                        value={number}
                                        type="text"
                                        placeholder='Add User'
                                        onChange={(e) => {
                                            setNumber(e.target.value)
                                            setMessage('')
                                        }}
                                    />
                                </form>
                                {message &&
                                    <div className="no-msg">{message}</div>
                                }

                                <div className="">
                                    <form className="item-search-form">
                                        <input
                                            value={name}
                                            type="text"
                                            placeholder='Add Name'
                                            onChange={(e) => {
                                                setName(e.target.value)
                                                setMessage('')
                                            }}
                                        />
                                    </form>
                                </div>
                            </div>
                            <div className="radio-cont">
                                <RadioBtn sendRadioData={radioOption} selectedRadio={radio} />
                            </div>
                            {radio === 'Home Address' && radio != 'Diagnostic Center' && (

                                <>
                                    < div className="addr-input">
                                        <form className="item-search-form">
                                            <input
                                                value={address}
                                                type="text"
                                                placeholder='Add Address'
                                                onChange={(e) => {
                                                    setAddress(e.target.value)
                                                    setMessage('')
                                                }}
                                            />
                                        </form>
                                    </div>
                                </>)}
                            <div className="calendar-slot">
                                <Calendar sendDate={getDate} selectedDate={date} />
                            </div>
                            {date &&
                                <div className="time-slot">
                                    <TimeSlot onSelectTime={getTime} selectedDate={date}
                                        selectedTime={time} />
                                </div>
                            }

                        </div>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button
                                className="book-appointment-btn"
                                onClick={bookAdminAppt}
                                disabled={!name || !number || !radio || !date || !time}
                            >
                                Book Appointment
                            </button>
                            <button
                                className="book-appointment-btn"
                                style={{ backgroundColor: '#ff9800' }}
                                onClick={clearAllItems}
                            >
                                Clear All
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div >
    )
}

