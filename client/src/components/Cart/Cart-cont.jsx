import './Cart-cont.css';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

import { useCart } from '../../context/CartContext';
import { useLogin } from '../../context/LoginContext';

export default function CartCont() {
    const navigate = useNavigate();

    const { cartItem, removeFromCart, subtotal } = useCart();
    const { toggleLoginForm, isLoggedIn, setFromPath } = useLogin()

    const redirectAppointment = (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            setFromPath(location.pathname);
            toggleLoginForm();
            return;
        }

        // if()
        navigate('/Appointment');
    }

    return (
        <div className="shopping-cart">
            <div className="cart-cont">
                <div className="cart-head">
                    <h2>Cart</h2>
                    <h3>{cartItem.length} Items</h3>
                </div>
                <div className="cart-items">
                    {cartItem && cartItem.length > 0 ? (
                        <>
                            <table className="cart-table">
                                <thead>
                                    <tr>
                                        <th className="cart-head1">TEST DETAILS</th>
                                        <th className="cart-head2">PRICE</th>
                                        <th className="cart-head3"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItem.map((item, index) => (
                                        <tr key={index} className="cart-table-row">
                                            <td className="cart-test-details">
                                                <div className="cart-test-name">{item.name}</div>
                                                <div className="test-pre">
                                                    <b>Patient Preparation:</b> {item.patientPreparation}
                                                </div>
                                            </td>
                                            <td className="cart-test-price">
                                                &#8377; {item.price}
                                            </td>
                                            <td className="cart-test-action">
                                                <button
                                                    className="delete-btn"
                                                    onClick={() => removeFromCart(item.name)}
                                                    aria-label={`Remove ${item.name} from cart`}
                                                >
                                                    <DeleteIcon />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

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
                                    Book &nbsp; Appointment
                                </Button>
                            </div>
                        </>
                    ) : (
                        <div className='empty-msg'>No items in cart</div>
                    )}
                </div>
            </div>
        </div>
    );
}