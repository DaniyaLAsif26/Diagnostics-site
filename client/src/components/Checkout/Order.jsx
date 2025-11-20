import './Order.css'
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useAppointment } from '../../context/AppointmentContext'
import { useLogin } from '../../context/LoginContext';
import { useTrigger } from "../../context/TriggerContext";
import { useNavigate } from 'react-router-dom';

const BackendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export default function Order() {

    const { triggerDataUpdate } = useTrigger();

    const navigate = useNavigate()

    const { appointment, clearAppointment, setAppointmentMessage } = useAppointment()
    const { userData } = useLogin()
    const { cartItem, subtotal, clearCart } = useCart();

    const [couponInput, setCouponInput] = useState('')
    const [discount, setDiscount] = useState(0)

    const total = subtotal - discount


    const clearAppointmentData = () => {
        clearAppointment();
    }
    const clearCartData = () => {
        clearCart()
    }

    const updateInput = (e) => {
        setCouponInput(e.target.value)
    }

    const payAmt = async () => {

        const appointmentData = {
            ...userData,
            ...appointment,
            day: new Date(appointment.date).toLocaleDateString("en-US", { weekday: "long" }),
            tests: cartItem.map((item) => ({
                name: item.name,
                price: item.price
            })),
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
                credentials : 'include',
                body: JSON.stringify(appointmentData),

            })
            if (!res.ok) {
                console.log(res)
                throw new Error("Failed to save appointment");
            }
            clearAppointmentData()
            clearCartData()
            setAppointmentMessage(` <ul>
    <li>Appointment booked successfully</li>
    <li>Our Team will contact you regarding the payment and other details</li>
    <li>Once the payment is completed your appointment will be confirmed</li>
  </ul>`)

            triggerDataUpdate('USER_UPDATED');
            requestAnimationFrame(() => {
                setTimeout(() => {
                    navigate('/home');
                }, 50);
            });
        }
        catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div className="order-cont">
            <div className="order-details">
                <div className="coupon">
                    <form className="coupon-form" action="">
                        <input className='coupon-input' type="text" value={couponInput} placeholder='Enter Coupon Code' onChange={updateInput} />
                        <Button className='coupon-btn' variant="outlined" size="medium">
                            Apply
                        </Button>
                    </form>
                </div>
                <div className="order-summary">
                    <div className="order-subtotal">
                        <div className="">Subtotal</div>
                        <div className="">&#8377;{subtotal}</div>
                    </div>
                    <div className="order-discount">
                        <div className="">Discount</div>
                        <div className="discount-price"><b>-&#8377;{discount}</b></div>
                    </div>
                    <div className="order-total">
                        <div className=""><b>Total</b></div>
                        <div className=""><b>&#8377;{total}</b></div>
                    </div>
                </div>
                <div className="pay-btn">
                    <Button variant="contained" color="success" onClick={payAmt} disabled={!appointment.radio || !appointment.date || !appointment.time || subtotal == 0}>
                        PAY &nbsp;<b>&#8377;{total}</b>
                    </Button>
                </div>
            </div>
        </div>
    )
}