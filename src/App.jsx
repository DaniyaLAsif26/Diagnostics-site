// import { useState } from 'react'
import './App.css'
import Navbar from './Navbar'
import Slider from './Slider.jsx'
import OptionsBar from './Options-bar'
import PopularCont from './Popular-cont.jsx'
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
