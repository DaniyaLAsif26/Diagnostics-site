import './Checkout-right-grid.css'
import Order from './Order'

export default function CheckoutRightGrid() {

    return (
        <div className="checkout-right-grid">
            <div className="sticky">
                <Order />
            </div>
        </div>
    )
}