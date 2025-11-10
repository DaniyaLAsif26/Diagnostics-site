import UserDetailForm from "../components/UserDetails/UserDetailsForm"

import { Helmet } from 'react-helmet-async';

export default function EditUserProfile(){

    return (
        <>
                <Helmet>
                <title>Edit User Details- Vision Diagnostic Centre</title>
                <meta name="description" content="Browse our comprehensive laboratory tests" />
            </Helmet>
       <UserDetailForm/>
        </>
    )
}