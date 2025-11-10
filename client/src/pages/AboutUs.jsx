import { Helmet } from 'react-helmet-async';

import AboutUsCont from "../components/About-Us/About-us-cont";

export default function AboutUs() {

    return (
        <>
        <Helmet>
                <title>About Us - Vision Diagnostic Centre</title>
                <meta name="description" content="Browse our comprehensive laboratory tests" />
            </Helmet>
        <AboutUsCont />
        </>
    )
}