import { Helmet } from 'react-helmet-async';

import LaboratoryTests from '../components/AllTests/LaboratoryTests.jsx';

export default function LaboratoryTestsPage() {

    return (
        <>
            <Helmet>
                <title>Laboratory Tests - Vision Diagnostic Centre</title>
                <meta name="description" content="Browse our comprehensive laboratory tests" />
            </Helmet>
            <LaboratoryTests />
        </>
    )
}