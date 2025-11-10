import UserProfile from "../components/UserProfile/UserProfile"

import { Helmet } from 'react-helmet-async';

export default function UserProfilePage() {
    return (
        <>
              <Helmet>
        <title>Profile - Vision Diagnostic Centre</title>
        <meta name="description" content="Browse our comprehensive laboratory tests" />
      </Helmet>
            <UserProfile/>
        </>
    )
}