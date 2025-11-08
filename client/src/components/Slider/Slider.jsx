import { useState, useEffect } from 'react';
import './Slider.css';

const Slider = ({ images }) => {
    const [current, setCurrent] = useState(0);

    // Auto slide every 4 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent(prev => (prev + 1) % images.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="slider">
            {images.map((img, idx) => (
                <div key={idx} className={idx === current ? 'slide active' : 'slide'}>
                    <img src={img} alt={`slide-${idx}`} loading="lazy" />

                </div>
            ))}

        </div>
    );
};

export default Slider;
