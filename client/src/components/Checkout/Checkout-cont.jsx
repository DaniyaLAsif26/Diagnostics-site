import './Checkout-cont.css'
import CheckoutLeftGrid from './Checkout-left-grid'
import CheckoutRightGrid from './Checkout-right-grid'

export default function CheckoutCont() {

    return (
        <div className="checkout">
            <div className="checkout-cont">
                <h2 className='checkout-head'>Checkout Summary</h2>
                <div className="checkout-grid">
                    <CheckoutLeftGrid />
                    <CheckoutRightGrid />
                </div>
            </div>
        </div>
    )
}