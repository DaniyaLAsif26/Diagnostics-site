// import { useState } from 'react'
import './App.css'

// App.jsx
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer-cont.jsx';
import Copyright from './components/Footer/Copyright.jsx';
import AppRoutes from './routes/AppRoutes.jsx';
import OptionsBar from './components/options/Options-bar.jsx';
import ScrollToTop from './components/Scroll-top/Scroll-to-top.jsx';
import BackToTop from "./components/Back-to-top/BackToTop";
import CartMessage from './components/FlashMessage/Cart-message.jsx';
import LoginForm from './components/Login/Login.jsx';
import OtpInput from './components/Login/Otp.jsx';
import AdminLoginForm from './components/Login/adminLogin.jsx';

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <OptionsBar />
      <LoginForm />
      <OtpInput />
      <AdminLoginForm />
      <AppRoutes />
      <Footer />
      <Copyright />
      <BackToTop />
      <CartMessage />
    </>
  );
}

export default App;

