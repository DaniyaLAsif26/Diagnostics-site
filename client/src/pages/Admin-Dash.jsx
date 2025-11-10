import { Helmet } from 'react-helmet-async';

import AdminHome from "../components/Admin/Admin-Home.jsx";

export default function AdminDashBoard() {
    return (
  <>
            <AdminHome />
            <Helmet>
                <title>Admin - Vision Diagnostic Centre</title>
                <meta name="description" content="Browse our comprehensive laboratory tests" />
            </Helmet>
  </>

    );
}