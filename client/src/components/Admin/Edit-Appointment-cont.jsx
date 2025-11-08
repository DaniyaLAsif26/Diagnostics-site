import './Edit-Appointment.css'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";

import GppBadIcon from '@mui/icons-material/GppBad';

export default function EditAppointment() {

    const { id } = useParams()
    const navigate = useNavigate()

    const [appointment, setAppointment] = useState(null)

    // fields - using schema field names
    const [name, setName] = useState("")
    const [uniq_id, setUniq_Id] = useState("")
    const [phone_no, setPhone_no] = useState("")
    const [alt_no, setAlt_no] = useState("")
    const [radio, setRadio] = useState("")
    const [address, setAddress] = useState("")
    const [date, setDate] = useState("")
    const [day, setDay] = useState("")
    const [time, setTime] = useState("")
    const [bookedOn, setBookedOn] = useState("")
    const [subtotal, setSubtotal] = useState("")
    const [discount, setDiscount] = useState("")
    const [total, setTotal] = useState("")
    const [paymentStatus, setPaymentStatus] = useState("Pending")
    const [completedBy, setCompletedBy] = useState("")
    const [comments, setComments] = useState("")

    // errors
    const [errors, setErrors] = useState({})

    // fetch appointment
    useEffect(() => {
        fetch(`http://localhost:5000/api/appointments/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    const appt = data.appointment
                    setAppointment(appt)

                    setUniq_Id(appt.uniq_id || "")
                    setName(appt.name || "")
                    setPhone_no(appt.phone_no || "")
                    setAlt_no(appt.alt_no || "")
                    setRadio(appt.radio || "")
                    setAddress(appt.address || "")
                    setDate(new Date(appt.date).toLocaleDateString('en-GB') || "")
                    setDay(appt.day || "")
                    setTime(appt.time || "")
                    setBookedOn(new Date(appt.createdAt).toLocaleDateString('en-GB') || "")
                    setSubtotal(appt.subtotal || "")
                    setDiscount(appt.discount || "")
                    setTotal(appt.total || "")
                    setPaymentStatus(appt.paymentStatus || "Pending")
                    setCompletedBy(appt.completedBy || "")
                    setComments(appt.comments || "")
                }
            })
            .catch(err => console.error(err));
    }, [id])

    // validation
    const validate = () => {
        const newErrors = {}

        if (!name.trim()) newErrors.name = "Name is required"

        // Phone numbers should be 12 digits: 91 + 10 digits (frontend format)
        if (!phone_no.match(/^91\d{10}$/)) newErrors.phone_no = "Phone number must be 12 digits (91 + 10 digits)"
        if (alt_no && !alt_no.match(/^91\d{10}$/)) newErrors.alt_no = "Alternate phone must be 12 digits (91 + 10 digits)"

        if (!radio.trim()) newErrors.radio = "Sample type is required"
        if (!address.trim()) newErrors.address = "Address is required"
        if (!date.trim()) newErrors.date = "Date is required"
        if (!day.trim()) newErrors.day = "Day is required"
        if (!time.trim()) newErrors.time = "Time slot is required"
        if (!subtotal || isNaN(subtotal)) newErrors.subtotal = "Subtotal must be a number"
        if (discount && isNaN(discount)) newErrors.discount = "Discount must be a number"
        if (!total || isNaN(total)) newErrors.total = "Total must be a number"
        if (!paymentStatus) newErrors.paymentStatus = "Please select a payment status"
        if (!uniq_id || uniq_id.length < 13) newErrors.uniq_id = "Please enter valid Uniq-Id"

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!validate()) {
            console.log("Validation errors:", errors)
            return
        }

        // Convert date back to proper format for database
        const dateArray = date.split('/')
        const formattedDate = `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`

        const updatedData = {
            uniq_id,
            name,
            phone_no,
            alt_no,
            radio,
            address,
            date: formattedDate,
            day,
            time,
            subtotal: parseFloat(subtotal),
            discount: discount ? parseFloat(discount) : 0,
            total: parseFloat(total),
            paymentStatus,
            completedBy,
            comments
        }

        fetch(`http://localhost:5000/api/appointments/edit/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    navigate(`/appointments/${id}`)
                } else {
                    alert("Failed to update appointment: " + (data.message || "Unknown error"))
                }
            })
            .catch(err => {
                console.error("Error:", err)
                alert("Error updating appointment")
            })
    }

    const formatNumberForDisplay = (number) => {
        if (!number) return "+91 - ";
        let str = number.toString();
        str = str.replace(/^\+?91\s*-?\s*/, "").trim();
        return `+91 - ${str}`;
    };

    const handlePhoneChange = (value, setter) => {
        // Remove all non-digits
        let digits = value.replace(/\D/g, '');

        // If empty, set to empty string
        if (digits.length === 0) {
            setter('');
            return;
        }

        // Ensure it starts with 91
        if (!digits.startsWith('91')) {
            digits = '91' + digits;
        }

        // Limit to 12 digits (91 + 10)
        if (digits.length > 12) {
            digits = digits.substring(0, 12);
        }

        setter(digits);
    };

    if (!appointment) return <h2>Loading...</h2>;

    return (
        <div className="edit-appt-cont">
            <div className="edit-appt-cont-btn">
            <button className="back-btn" onClick={() => navigate('/admin/dashboard')}>Back</button>
            </div>
            <form className='edit-appt-form' onSubmit={handleSubmit}>
                <div className="form-row-1">
                    <div className="edit-appt-user">
                        <h2>User Details :</h2>
                        <div>
                            <label htmlFor="user-name">Name</label>
                            <input
                                type="text"
                                id="user-name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={errors.name ? "error-input" : ""}
                            />
                            {errors.name && <span className=''><GppBadIcon sx={{ color: 'red' }} /></span>}
                        </div>

                        <div>
                            <label htmlFor="phone-no">Phone No</label>
                            <input
                                type="text"
                                id="phone-no"
                                value={formatNumberForDisplay(phone_no)}
                                onChange={(e) => handlePhoneChange(e.target.value, setPhone_no)}
                                className={errors.phone_no ? "error-input" : ""}
                                placeholder="+91 - "
                            />
                            {errors.phone_no && <span className=''><GppBadIcon sx={{ color: 'red' }} /></span>}
                        </div>

                        <div>
                            <label htmlFor="alt-no">Alternate Phone No</label>
                            <input
                                type="text"
                                id="alt-no"
                                value={formatNumberForDisplay(alt_no)}
                                onChange={(e) => handlePhoneChange(e.target.value, setAlt_no)}
                                className={errors.alt_no ? "error-input" : ""}
                                placeholder="+91 - "
                            />
                            {errors.alt_no && <span className=''><GppBadIcon sx={{ color: 'red' }} /></span>}
                        </div>

                        <div>
                            <label htmlFor="collection">Sample Type</label>
                            <input
                                type="text"
                                id="collection"
                                value={radio}
                                onChange={(e) => setRadio(e.target.value)}
                                className={errors.radio ? "error-input" : ""}
                            />
                            {errors.radio && <span className=''><GppBadIcon sx={{ color: 'red' }} /></span>}
                        </div>

                        <div className='edit-address-cont'>
                            <label htmlFor="address">Address</label>
                            <textarea
                                onChange={(e) => setAddress(e.target.value)}
                                id="address"
                                className={errors.address ? "error-input" : ""}
                                value={address}
                            />
                            {errors.address && <span className=''><GppBadIcon sx={{ color: 'red' }} /></span>}
                        </div>
                    </div>

                    <div className="edit-appt-details">
                        <h2>Appointment details :</h2>

                        <div className="">
                            <label htmlFor="uniq_id">Uniq_Id</label>
                            <input
                                type="text"
                                id="uniq_id"
                                value={uniq_id}
                                onChange={(e) => setUniq_Id(e.target.value)}
                                className={errors.uniq_id ? "error-input" : ""}
                                placeholder="ABCD-EFGHIJ-X"
                            />
                            {errors.uniq_id && <span className=''><GppBadIcon sx={{ color: 'red' }} /></span>}
                        </div>
                        <div>
                            <label htmlFor="date">Date</label>
                            <input
                                type="text"
                                id="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className={errors.date ? "error-input" : ""}
                                placeholder="DD/MM/YYYY"
                            />
                            {errors.date && <span className=''><GppBadIcon sx={{ color: 'red' }} /></span>}
                        </div>

                        <div>
                            <label htmlFor="day">Day</label>
                            <input
                                type="text"
                                id="day"
                                value={day}
                                onChange={(e) => setDay(e.target.value)}
                                className={errors.day ? "error-input" : ""}
                            />
                            {errors.day && <span className=''><GppBadIcon sx={{ color: 'red' }} /></span>}
                        </div>

                        <div>
                            <label htmlFor="time-slot">Time Slot</label>
                            <input
                                type="text"
                                id="time-slot"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className={errors.time ? "error-input" : ""}
                            />
                            {errors.time && <span className=''><GppBadIcon sx={{ color: 'red' }} /></span>}
                        </div>

                        <div>
                            <label htmlFor="booked-on">Booked On</label>
                            <input type="text" id="booked-on" value={bookedOn} readOnly />
                        </div>
                    </div>
                </div>

                <div className="form-row-2">
                    <div className="edit-appt-price">
                        <h2>Price Details :</h2>

                        <div>
                            <label htmlFor="subtotal">Subtotal</label>
                            <input
                                type="number"
                                step="0.01"
                                id="subtotal"
                                value={subtotal}
                                onChange={(e) => setSubtotal(e.target.value)}
                                className={errors.subtotal ? "error-input" : ""}
                            />
                            {errors.subtotal && <span className=''><GppBadIcon sx={{ color: 'red' }} /></span>}
                        </div>

                        <div>
                            <label htmlFor="discount">Discount</label>
                            <input
                                type="number"
                                step="0.01"
                                id="discount"
                                value={discount}
                                onChange={(e) => setDiscount(e.target.value)}
                                className={errors.discount ? "error-input" : ""}
                            />
                            {errors.discount && <span className=''><GppBadIcon sx={{ color: 'red' }} /></span>}
                        </div>

                        <div>
                            <label htmlFor="total">Total</label>
                            <input
                                type="number"
                                step="0.01"
                                id="total"
                                value={total}
                                onChange={(e) => setTotal(e.target.value)}
                                className={errors.total ? "error-input" : ""}
                            />
                            {errors.total && <span className=''><GppBadIcon sx={{ color: 'red' }} /></span>}
                        </div>
                    </div>

                    <div className='payment-edit'>
                        <h2>Payment Status : </h2>
                        <div className="payment-from">
                            <div className="">
                                <input
                                    type="radio"
                                    id="pending"
                                    name="paymentStatus"
                                    value="Pending"
                                    checked={paymentStatus === "Pending"}
                                    onChange={(e) => setPaymentStatus(e.target.value)}
                                />
                                <label htmlFor="pending">Pending</label>
                            </div>
                            <div className="">
                                <input
                                    type="radio"
                                    id="paid"
                                    name="paymentStatus"
                                    value="Paid"
                                    checked={paymentStatus === "Paid"}
                                    onChange={(e) => setPaymentStatus(e.target.value)}
                                />
                                <label htmlFor="paid">Paid</label>
                            </div>
                            <div className="">
                                <input
                                    type="radio"
                                    id="failed"
                                    name="paymentStatus"
                                    value="Failed"
                                    checked={paymentStatus === "Failed"}
                                    onChange={(e) => setPaymentStatus(e.target.value)}
                                />
                                <label htmlFor="failed">Failed</label>
                            </div>
                        </div>
                        {errors.paymentStatus && <span className=''><GppBadIcon sx={{ color: 'red' }} /></span>}
                    </div>
                </div>

                <div className="form-row-3">

                    <div className="completed-by-cont">
                        <div className="">
                            <label htmlFor="completed-by">Appointment Completed by : </label>
                            <input
                                type="text"
                                id='completed-by'
                                value={completedBy}
                                onChange={(e) => setCompletedBy(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="comments-cont">
                        <div className="comments">
                            <label htmlFor="comments">Comments : </label>
                            <textarea
                                id="comments"
                                value={comments}
                                onChange={(e) => setComments(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="update-btn">
                    <button type="submit" className="submit-btn">Update Appointment</button>
                </div>
            </form>
        </div>
    )
}