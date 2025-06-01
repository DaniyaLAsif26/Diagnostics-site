import { useState, useEffect } from 'react';

import './Slider.css'; // Make sure this file exists

const Slider = ({ images,offer }) => {
    const [current, setCurrent] = useState(0);

    // Auto slide every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            goToNext();
        }, 3000);
        return () => clearInterval(interval);
    }, [current]);

    const goToPrev = () => {
        setCurrent(prev => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrent(prev => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="images">
            <div className="slider">
                {images.map((img, idx) => (
                    <div key={idx} className={idx === current ? 'slide active' : 'slide'}>
                        <img src={img} alt={`slide-${idx}`} />

                    </div>
                ))}

                <button className="nav prev" onClick={goToPrev}>&#10094;</button>
                <button className="nav next" onClick={goToNext}>&#10095;</button>
            </div>
            <div className="offer-img">
                <img src={offer} alt="" />
            </div>
        </div>
    );
};

export default Slider;
