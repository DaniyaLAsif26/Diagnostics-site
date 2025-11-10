import CheckoutCont from "../components/Appointment/Appointment-cont.jsx"
import { Helmet } from 'react-helmet-async';

export default function Checkout() {

    return (
        <>
            <Helmet>
                <title>Book Appointment - Vision Diagnostic Centre</title>
                <meta name="description" content="Browse our comprehensive laboratory tests" />
            </Helmet>
            <CheckoutCont />
        </>
    )
}