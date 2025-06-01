// import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar.jsx'
import Slider from './components/Slider.jsx'
import OptionsBar from './components/Options-bar.jsx'
import PopularCont from './components/Popular-cont.jsx'
import image1 from './assets/image1.jpg';
import image2 from './assets/image2.png';
import offer from './assets/offer.jpg';

function App() {
  const images = [image1, image2];

  return (
    <>
      <Navbar />
      <OptionsBar />
      <Slider images={images} offer={offer}/>
      <PopularCont />
    </>
  );
}

export default App;
