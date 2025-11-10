import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import Search from '../pages/Search.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import LaboratoryTestsPage from '../pages/LaboratoryTestsPage.jsx'
import RadiologyTestsPage from '../pages/RadiologyTestsPage.jsx';
import AboutUs from '../pages/AboutUs.jsx';
import GalleryPage from '../pages/Gallery.jsx';
import AllPacks from '../pages/AllPacks.jsx';
import HomeRelevancePage from '../pages/HomeRelevancePage.jsx';
import ViewPackagePage from '../pages/ViewPackagePage.jsx';
import Cart from '../pages/Cart.jsx';
import AdminDashBoard from '../pages/Admin-Dash.jsx';
import Appointment from '../pages/Appointment.jsx';
import ProtectedRoute from '../components/ProtectedRoute.jsx';
import Checkout from '../pages/Checkout.jsx';
import BookedAppointmentsPage from '../pages/BookedAppointments.jsx';
import EditAppointmentPage from '../pages/Edit-Appointment.jsx';
import UserProfilePage from '../pages/UserProfile.jsx';
import EditUserProfile from '../pages/EditUser.jsx';
import DownloadReportsPage from '../pages/DownloadReportsPage.jsx';
import UploadReportsPage from '../pages/UploadReportsPage.jsx';


import AdminProtectedRoute from '../components/Protected-routes/Admin-route.jsx';
import AppointmentProtectedRoute from '../components/Protected-routes/AppointmentProtectedroute.jsx';
import CheckoutProtectedRoute from '../components/Protected-routes/CheckoutProtectedroute.jsx';

import AddUser from '../components/AddUser/AddUser.jsx';
import EditUser from '../components/EditUser/EditUser.jsx';
import BookAppointment from '../components/Admin/BookAppointment.jsx';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/index" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/tests/laboratory" element={<LaboratoryTestsPage />} />
      <Route path="/tests/radiology" element={<RadiologyTestsPage />} />
      <Route path="/cart-items" element={<Cart />} />
      <Route path="/all-packages" element={<AllPacks />} />
      <Route path="/relevance/:relevance" element={<HomeRelevancePage />} />
      <Route path="/health-packages/:pack" element={<ViewPackagePage />} />
      <Route path="/download-reports" element={<DownloadReportsPage />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/gallery" element={<GalleryPage />} />

      <Route path="/upload/reports" element={<UploadReportsPage />} />
      <Route path="/user/add" element={<AddUser />} />
      <Route path="/user/edit/:id" element={<EditUser />} />
      <Route path="/admin/book-appointment" element={<BookAppointment />} />

      <Route path="/Appointment" element={
        <AppointmentProtectedRoute>
          <Appointment />
        </AppointmentProtectedRoute>} />

      < Route path="/Cart/Checkout" element={
        <CheckoutProtectedRoute>
          < Checkout />
        </CheckoutProtectedRoute>} />

      < Route path="/appointments/:id" element={
        <AdminProtectedRoute>
          < BookedAppointmentsPage />
        </AdminProtectedRoute>
      } />

      < Route path="/appointments/edit/:id" element={
        <AdminProtectedRoute>
          < EditAppointmentPage />
        </AdminProtectedRoute>
      } />

      < Route path="/user-profile" element={
        <ProtectedRoute>
          < UserProfilePage />
        </ProtectedRoute>} />

      < Route path="/user-profile/edit" element={
        <ProtectedRoute>
          < EditUserProfile />
        </ProtectedRoute>
      } />

      < Route path="/admin/dashboard" element={
        <AdminProtectedRoute>
          <AdminDashBoard />
        </AdminProtectedRoute>
      } />
      < Route path="*" element={< NotFoundPage />} />
    </Routes >
  );
}

export default AppRoutes;
