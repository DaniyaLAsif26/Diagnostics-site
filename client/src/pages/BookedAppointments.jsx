import BookedTests from "../components/Admin/Booked-test";
import { Helmet } from 'react-helmet-async';


export default function BookedAppointmentsPage() {

    return (
        <>
            <Helmet>
                <title>Admin - Vision Diagnostic Centre</title>
                <meta name="description" content="Browse our comprehensive laboratory tests" />
            </Helmet>
            <BookedTests />
        </>
    )
}