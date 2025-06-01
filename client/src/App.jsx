// import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar.jsx'
import OptionsBar from './components/options/Options-bar.jsx'
import SliderCont from './components/Slider/Slider-cont.jsx'
import PopularCont from './components/Popular-packs/Popular-cont.jsx'
import Footer from './components/Footer/Footer-cont.jsx'
import Copyright from './components/Footer/Copyright.jsx'

function App() {

  return (
    <>
      <Navbar />
      <OptionsBar />
      <SliderCont />
      <PopularCont />
      <Footer />
      <Copyright />
    </>
  );
}

export default App;
