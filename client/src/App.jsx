// import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar.jsx'
import OptionsBar from './components/options/Options-bar.jsx'
import SliderCont from './components/Slider/Slider-cont.jsx'
import PopularPackCont from './components/Popular-packs/Popular-pack-cont.jsx'
import PopularTestCont from './components/Popular-tests/Popular-test-cont.jsx'
import Footer from './components/Footer/Footer-cont.jsx'
import Copyright from './components/Footer/Copyright.jsx'
import RelevanceCont from './components/Relevance/Relevance-cont.jsx'
import ChooseUsCont from './components/Choose-us/Choose-us-cont.jsx'

function App() {

  return (
    <>
      <Navbar />
      <OptionsBar />
      <SliderCont />
      <PopularPackCont />
      <RelevanceCont />
      <PopularTestCont />
      <ChooseUsCont />
      <Footer />
      <Copyright />
    </>
  );
}

export default App;
