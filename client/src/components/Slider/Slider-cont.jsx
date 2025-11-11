import { useNavigate } from 'react-router-dom';
import Slider from './Slider.jsx';
import './Slider-cont.css';

export default function SliderCont() {
   const navigate = useNavigate();

   // Slider images from public folder
   const images1 = [
      '/Slider-img/slider-img-1.jpg',
      '/Slider-img/slider-img-7.avif',
      '/Slider-img/slider-img-2.jpg',
      '/Slider-img/slider-img-3.jpg',
      '/Slider-img/slider-img-4.jpg',
      '/Slider-img/slider-img-5.jpg',
   ];

   // Offer images from public folder
   const offer = [
      '/Offer-img/offer-3.jpg',
      '/Offer-img/offer-4.jpg',
      '/Offer-img/offer-1.jpg',
   ];

   const goToGallery = () => {
      navigate('/gallery');
   };

   return (
      <div className="slider" onClick={goToGallery}>
         <div className="slider-cont">
            <div className="first-slider">
               <Slider images={images1} />
            </div>
            <div className="second-slider">
               <Slider images={offer} />
            </div>
         </div>
      </div>
   );
}
