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


function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <OptionsBar />
      <AppRoutes />
      <Footer />
      <Copyright />
      <BackToTop />
    </>
  );
}

export default App;

