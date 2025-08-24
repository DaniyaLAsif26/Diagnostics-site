import './Cart-cont.css';
import { useCart } from '../../context/CartContext';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CartCont() {
    const navigate = useNavigate();

    const { cartItem, removeFromCart } = useCart();

    // Calculate subtotal
    let subtotal = 0;
    if (cartItem && cartItem.length > 0) {
        subtotal = cartItem.reduce((total, item) => total + item.price, 0);
    };

    const [selectedOption, setSelectedOption] = useState('option1'); // Default selected: Diagnostic Center

    const handleRadioChange = (e) => {
        setSelectedOption(e.target.value);
    }

    const redirectAppointment = (e) => {
        e.preventDefault()
        navigate('/cart/Appointment')
    }

    return (
        <div className="cart-cont">
            <h2>Cart items</h2>
            <div className="cart-items">
                {cartItem && cartItem.length > 0 ? (
                    <>
                        {cartItem.map((item, index) => (
                            <div className="cart-item" key={index}>
                                <button className="delete-btn" onClick={() => removeFromCart(item.name)}>
                                    <DeleteIcon style={{ fontSize: '1.8rem' }} />
                                </button>
                                <div className="cart-info">
                                    <div className="cart-test">
                                        <h4>{item.name}</h4>
                                        <div className="item-price"><b>&#8377; {item.price}</b></div>
                                    </div>
                                    <div className="item-inst">
                                        <div><b>Patient Preparation:</b> No special preparation is required</div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="subtotal">
                            <h3>Subtotal: &#8377; {subtotal}</h3>
                        </div>

                        <div className='submit-btn'>
                            <Button
                                type='submit'
                                variant="contained"
                                color="success"
                                onClick={redirectAppointment}
                                size="large">
                                Proceed
                            </Button>
                        </div>
                    </>
                ) : (
                    <div>No items in cart</div>
                )}
            </div>
        </div>
    );
}
