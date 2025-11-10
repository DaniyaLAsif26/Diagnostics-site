import RadiologyTests from '../components/AllTests/RadiologyTests.jsx';

import { Helmet } from 'react-helmet-async';

export default function RadiologyTestsPage() {

    return (
        <>
            <Helmet>
                <title>Radiology Tests - Vision Diagnostic Centre</title>
                <meta name="description" content="Browse our comprehensive laboratory tests" />
            </Helmet>
            <RadiologyTests />
        </>
    )
}