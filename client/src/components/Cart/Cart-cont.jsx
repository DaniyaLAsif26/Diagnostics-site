import './Cart-cont.css';
import { useCart } from '../../context/CartContext';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { useState } from 'react';

export default function CartCont() {
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

                        <div className="cart-check-box">
                            <h3>Home Sample Collection at</h3>
                            <form>
                                <div className="option-1">
                                    <input
                                        type="radio"
                                        name="radio-btn"
                                        id="option1"
                                        value="option1"
                                        checked={selectedOption === 'option1'}
                                        onChange={handleRadioChange}
                                    />
                                    <label htmlFor="option1">Diagnostic Center</label>
                                </div>
                                <div className="option-2">
                                    <input
                                        type="radio"
                                        name="radio-btn"
                                        id="option2"
                                        value="option2"
                                        checked={selectedOption === 'option2'}
                                        onChange={handleRadioChange}
                                    />
                                    <label htmlFor="option2">Home Address</label>
                                </div>
                            </form>
                            <div className='submit-btn'>
                                <Button

                                    type='submit'
                                    variant="contained"
                                    color="success"
                                    size="large">
                                    Proceed
                                </Button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div>No items in cart</div>
                )}
            </div>
        </div>
    );
}
