import EditAppointment from "../components/Admin/Edit-Appointment-cont"

import { Helmet } from 'react-helmet-async';

export default function EditAppointmentPage() {

    return (
        <>
            <Helmet>
                <title>Edit Appointment - Vision Diagnostic Centre</title>
                <meta name="description" content="Browse our comprehensive laboratory tests" />
            </Helmet>
            <EditAppointment />
        </>
    )
}