// import { useState, useEffect } from "react";
// import "./Gallery.css";

// import SkipNextIcon from '@mui/icons-material/SkipNext';
// import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
// import images from "../../gallery.json";

// const Gallery = () => {
//     const [currentIndex, setCurrentIndex] = useState(null);

//     const openModal = (index) => setCurrentIndex(index);
//     const closeModal = () => setCurrentIndex(null);
//     const showPrev = () => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
//     const showNext = () => setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

//     useEffect(() => {
//         if (currentIndex !== null) {
//             document.body.style.overflow = "hidden";
//         } else {
//             document.body.style.overflow = "auto";
//         }
//     }, [currentIndex]);

//     return (
//         <>
//             <div className={`gallery-container ${currentIndex !== null ? "blurred" : ""}`}>
//                 <h2 className="heading">Image Gallery</h2>
//                 <div className="gallery">
//                     {images.map((img, index) => (
//                         <img
//                             key={index}
//                             src={img}
//                             alt={`Gallery ${index}`}
//                             onClick={() => openModal(index)}
//                         />
//                     ))}
//                 </div>
//             </div>

//             {currentIndex !== null && (
//                 <div className="modal">
//                     <span className="close" onClick={closeModal}>×</span>
//                     <button className="nav prev" onClick={showPrev}>
//                         <SkipPreviousIcon />
//                     </button>
//                     <img
//                         className="modal-img"
//                         src={images[currentIndex]}
//                         alt={`Zoomed ${currentIndex}`}
//                         loading="lazy"
//                     />
//                     <button className="nav next" onClick={showNext}>
//                         <SkipNextIcon  />
//                     </button>
//                 </div>
//             )}
//         </>
//     );
// };

// export default Gallery;


import { useState, useEffect } from "react";
import "./Gallery.css";

import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';

const Gallery = () => {
    const [images, setImages] = useState([]); // store URLs
    const [currentIndex, setCurrentIndex] = useState(null);

    // Load gallery.json from public folder
    useEffect(() => {
        fetch("/gallery.json")
            .then(res => res.json())
            .then(data => setImages(data))
            .catch(err => console.error("Failed to load gallery:", err));
    }, []);

    const openModal = (index) => setCurrentIndex(index);
    const closeModal = () => setCurrentIndex(null);
    const showPrev = () => setCurrentIndex(prev => prev === 0 ? images.length - 1 : prev - 1);
    const showNext = () => setCurrentIndex(prev => prev === images.length - 1 ? 0 : prev + 1);

    // Disable scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = currentIndex !== null ? "hidden" : "auto";
    }, [currentIndex]);

    return (
        <>
            <div className={`gallery-container ${currentIndex !== null ? "blurred" : ""}`}>
                <h2 className="heading">Image Gallery</h2>
                <div className="gallery">
                    {images.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`Gallery ${index}`}
                            onClick={() => openModal(index)}
                            loading="lazy" // lazy-load thumbnails
                        />
                    ))}
                </div>
            </div>

            {currentIndex !== null && (
                <div className="modal">
                    <span className="close" onClick={closeModal}>×</span>
                    <button className="nav prev" onClick={showPrev}>
                        <SkipPreviousIcon />
                    </button>
                    <img
                        className="modal-img"
                        src={images[currentIndex]}
                        alt={`Zoomed ${currentIndex}`}
                        loading="lazy" // lazy-load modal image
                    />
                    <button className="nav next" onClick={showNext}>
                        <SkipNextIcon />
                    </button>
                </div>
            )}
        </>
    );
};

export default Gallery;
