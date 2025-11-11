import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './temp-offer.css';

// Simple SVG Icons as components
const Sparkles = ({ className, size }) => (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 3v18M3 12h18M7.5 7.5l9 9M16.5 7.5l-9 9" />
    </svg>
);

const Stethoscope = ({ className, size }) => (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
        <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
        <circle cx="20" cy="10" r="2" />
    </svg>
);

const Heart = ({ className, size }) => (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
);

export default function TempOffer() {

const navigate = useNavigate();

    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            id: 1,
            title: "World Diabetes Day",
            mainOffer: "Get Sugar Test For Free",
            icon: Stethoscope,
            cardClass: "temp-offer-slide-card-blue",
            titleClass: "temp-offer-slide-title-blue",
            offerClass: "temp-offer-slide-main-offer-blue",
            iconClass: "temp-offer-slide-icon-blue",
            offers: [],
            button: false
        },
        {
            id: 2,
            title: "Children's Day Celebration",
            mainOffer: "Health Packages for Kids",
            icon: Heart,
            cardClass: "temp-offer-slide-card-pink",
            titleClass: "temp-offer-slide-title-pink",
            offerClass: "temp-offer-slide-main-offer-pink",
            iconClass: "temp-offer-slide-icon-pink",
            offers: [
                { name: "Well Baby Checkup", price: "₹500", nameClass: "temp-offer-offer-name-pink", priceClass: "temp-offer-offer-price-pink" },
                { name: "Child Growth and Development Profile", price: "₹900", nameClass: "temp-offer-offer-name-pink", priceClass: "temp-offer-offer-price-pink" }
            ],
            button: true
        }
    ];

      useEffect(() => {
        const interval = setInterval(() => {
          setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
      }, []);

    return (
        <div className="temp-offer-slider-container">
            <div className="temp-offer-slider-wrapper">
                <div className="temp-offer-slider-card">
                    {/* Header */}
                    <div className="temp-offer-slider-header">
                        <div className="temp-offer-header-content">
                            <Sparkles className="temp-offer-sparkle-icon" size={20} />
                            <h2 className="temp-offer-header-title">
                                Special Double Celebration
                            </h2>
                            <Sparkles className="temp-offer-sparkle-icon" size={20} />
                            <span className="temp-offer-header-date">• November 14th</span>
                        </div>
                    </div>

                    {/* Slider Content */}
                    <div className="temp-offer-slider-content">
                        <div
                            className="temp-offer-slider-track"
                            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                            {slides.map((slide) => {
                                const SlideIcon = slide.icon;
                                return (
                                    <div key={slide.id} className="temp-offer-slide">
                                        <div className={`temp-offer-slide-card ${slide.cardClass}`}>
                                            <div className="temp-offer-slide-header">
                                                <div className={`temp-offer-slide-icon-wrapper ${slide.iconClass}`}>
                                                    <SlideIcon className="temp-offer-slide-icon" size={28} />
                                                </div>
                                                <div className="temp-offer-slide-text">
                                                    <h3 className={`temp-offer-slide-title ${slide.titleClass}`}>
                                                        {slide.title}
                                                    </h3>
                                                    <p className={`temp-offer-slide-main-offer ${slide.offerClass}`}>
                                                        {slide.mainOffer}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Offers Section */}
                                            {slide.offers.length > 0 ? (
                                                <div className="temp-offer-offers-list">
                                                    {slide.offers.map((offer, idx) => (
                                                        <div key={idx} className="temp-offer-offer-item">
                                                            <span className={`temp-offer-offer-name ${offer.nameClass}`}>
                                                                {offer.name}
                                                            </span>
                                                            <span className={`temp-offer-offer-price ${offer.priceClass}`}>
                                                                {offer.price}
                                                            </span>
                                                        </div>
                                                    ))}

                                                </div>
                                            ) : (
                                                <div className="temp-offer-free-offer">
                                                    <p className="temp-offer-free-text temp-offer-free-text-blue">
                                                        FREE ✨
                                                    </p>
                                                    <p className="temp-offer-free-description temp-offer-free-description-blue">
                                                        Complete blood sugar testing and consultation
                                                    </p>
                                                </div>
                                            )}
                                            {slide.button === true &&
                                                <button className="temp-offer-cta-button" onClick={()=> navigate('/health-packages/Well%20Baby%20Checkup')}>
                                                    Book Your Appointment
                                                </button>
                                            }
                                        </div>

                                    </div>
                                );
                            })}
                        </div>

                        {/* Dots Indicator */}
                        <div className="temp-offer-dots-container">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`temp-offer-dot ${currentSlide === index ? 'temp-offer-dot-active' : 'temp-offer-dot-inactive'}`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="temp-offer-slider-footer">
                        <p className="temp-offer-footer-text">
                            🎉 Limited Time Offer - November 14th Only! Walk-ins Welcome 🎉
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}