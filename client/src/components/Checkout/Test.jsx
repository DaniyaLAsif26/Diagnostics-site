import './Test.css'
import { useCart } from '../../context/CartContext';

export default function Test() {
    const { cartItem , subtotal } = useCart();

    return (
        <div className="test-cont">
            <h2 className="test-cont-head">Diagnostic Tests</h2>
            {cartItem && cartItem.length > 0 && (
                <div className="test-details-cont">
                    {cartItem.map((item, index) => (
                        <div className="test-details">
                            <div className="test-details-name">{item.name}</div>
                            <div className="test-details-price"> &#8377; {item.price}</div>
                        </div>
                    ))}
                </div>
            )}
            <div className="test-subtotal">
                <h3>Subtotal: &#8377; {subtotal}</h3>
            </div>
            <div className="note">
                <b>Note</b> : Please make sure to read the Patient Preparedness at Cart before booking an appointment
            </div>
        </div>
    )
}