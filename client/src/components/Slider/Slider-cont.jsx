import image1 from '../../assets/image1.jpg';
import image2 from '../../assets/image2.avif';
import offer from '../../assets/offer.jpg';

import Slider from './Slider.jsx';
import Image from './Image.jsx';

import './Slider-cont.css';

export default function SliderCont() {

     const images = [image1, image2];

     return(
        <div className="slider-cont">
        <Slider images={images}/>
        <Image offer={offer} /> 
        </div>
     )
}