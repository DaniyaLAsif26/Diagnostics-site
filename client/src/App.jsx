import { useLocation } from 'react-router-dom'
// import './App.css'

import { useLogin } from './context/LoginContext';

// App.jsx
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer-cont.jsx';
import Copyright from './components/Footer/Copyright.jsx';
import AppRoutes from './routes/AppRoutes.jsx';
import OptionsBar from './components/Options/Options-bar.jsx';
import ScrollToTop from './components/Scroll-top/Scroll-to-top.jsx';
import BackToTop from "./components/Back-to-top/BackToTop";
import CartMessage from './components/FlashMessage/Cart-message.jsx';
import LoginForm from './components/Login/Login.jsx';
import OtpInput from './components/Login/Otp.jsx';
import AdminLoginForm from './components/Login/adminLogin.jsx';
import AppointmentMessage from './components/FlashMessage/Appointment-messge.jsx';
import LoginMsg from './components/FlashMessage/Login-msg.jsx';

function App() {
  const { showLoginForm, OtpForm, showAdminForm, loginMsg } = useLogin();

  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  const nonStickyRoutes = ["/Cart/Checkout", "/Appointment"];
  const isNonSticky = nonStickyRoutes.includes(location.pathname);

  return (
    <>
      <ScrollToTop />

      {!isAdminRoute && (
        <div className={` ${isNonSticky ? '' : "navbar-cont"}`}>
          <Navbar />
          <OptionsBar />
        </div>
      )}

      {showLoginForm && <LoginForm />}
      {OtpForm && <OtpInput />}
      {showAdminForm && <AdminLoginForm />}
      <AppRoutes />
      <Footer />
      <Copyright />
      <BackToTop />
      <CartMessage />
      <AppointmentMessage />
      <LoginMsg />
    </>
  );
}

export default App;

