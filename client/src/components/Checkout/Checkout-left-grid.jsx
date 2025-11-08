import './Checkout-left-grid.css'
import Summary from './Summary'
import Test from './Test'

export default function CheckoutLeftGrid() {

    return (
        <div className="checkout-left-grid">
            <div className="left-grid">
                <Summary />
                <Test />
            </div>
        </div>
    )
}