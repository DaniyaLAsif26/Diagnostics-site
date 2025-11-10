import CartCont from "../components/Cart/Cart-cont"

import { Helmet } from 'react-helmet-async';

export default function Cart() {

    return (
        <>
         <Helmet>
                <title>Cart - Vision Diagnostic Centre</title>
                <meta name="description" content="Browse our comprehensive laboratory tests" />
            </Helmet>
            <CartCont />
        </>
    )
}