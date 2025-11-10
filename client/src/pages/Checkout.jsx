import CheckoutCont from "../components/Checkout/Checkout-cont"
import { Helmet } from 'react-helmet-async';


export default function Checkout() {

    return (
        <>
            <Helmet>
                <title>Checkout - Vision Diagnostic Centre</title>
                <meta name="description" content="Browse our comprehensive laboratory tests" />
            </Helmet>
            <CheckoutCont />
        </>
    )
}