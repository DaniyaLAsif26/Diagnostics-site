import { useState } from "react";
import "./Gallery.css";

import image1 from "../../assets/Gallery-imgs/Gallery1.avif";
import image2 from "../../assets/Gallery-imgs/Gallery2.avif";
import image3 from "../../assets/Gallery-imgs/Gallery3.avif";
import image4 from "../../assets/Gallery-imgs/Gallery4.webp";
import image5 from "../../assets/Gallery-imgs/Gallery5.webp";
import image6 from "../../assets/Gallery-imgs/Gallery6.webp";
import image7 from "../../assets/image1.jpg";
import image8 from "../../assets/image2.avif";
import offer from "../../assets/offer.jpg";

import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';

const images = [
    { title: "Image 1", src: image1 },
    { title: "Image 2", src: image2 },
    { title: "Image 3", src: image3 },
    { title: "Image 4", src: image4 },
    { title: "Image 5", src: image5 },
    { title: "Image 6", src: image6 },
    { title: "Image 7", src: image7 },
    { title: "Image 8", src: image8 },
    { title: "Image 9", src: offer },
];

const Gallery = () => {
    const [currentIndex, setCurrentIndex] = useState(null);

    const openModal = (index) => setCurrentIndex(index);
    const closeModal = () => setCurrentIndex(null);
    const showPrev = () => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    const showNext = () => setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

    return (
        <>
            <div className={`gallery-container ${currentIndex !== null ? "blurred" : ""}`}>
                <h2 className="heading">Image Gallery</h2>
                <div className="gallery">
                    {images.map((img, index) => (
                        <img
                            key={index}
                            src={img.src}
                            alt={img.title}
                            onClick={() => openModal(index)}
                        />
                    ))}
                </div>
            </div>

            {currentIndex !== null && (
                <div className="modal">
                    <span className="close" onClick={closeModal}>×</span>
                    <button className="nav prev" onClick={showPrev}> <SkipPreviousIcon style={{ fontSize: '3rem' }} /> </button>
                    <img className="modal-img" src={images[currentIndex].src} alt="zoomed" />
                    <button className="nav next" onClick={showNext}> <SkipNextIcon style={{ fontSize: '3rem' }} /> </button>
                </div>
            )}
        </>
    );
};

export default Gallery;
