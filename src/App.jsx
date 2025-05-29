import { useState } from 'react'
import './App.css'
import Navbar from './Navbar'
import OptionsBar from './Options-bar'
import Popular from './Popular';
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
      <Popular /> 
    </>
  );
}

export default App;
