// import { useState } from 'react'
import './App.css'

// App.jsx
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer-cont.jsx';
import Copyright from './components/Footer/Copyright.jsx';
import AppRoutes from './routes/AppRoutes.jsx';

function App() {
  return (
    <>
      <Navbar />
      <AppRoutes />
      <Footer />
      <Copyright />
    </>
  );
}

export default App;

