import Test from '../../assets/Guide-imgs/test.webp';
import Kart from '../../assets/Guide-imgs/tokart.webp';
import Scooter from '../../assets/Guide-imgs/scooter.webp';
import Arrow from '../../assets/Guide-imgs/arrow.webp';
import Correct from '../../assets/Guide-imgs/correct.jpg';

import './Sample-guide.css';

export default function SampleGuide() {

    return (
        <div className="sample-guide">
            <h1>Book Home Sample Collection </h1>
            <div className="guide-cont">
                <div className="select-test box">
                    <img src={Test} alt="" loading="lazy"/>
                    <div className="">Book a test </div>
                </div>
                <div className="arrow">
                    <img src={Arrow} alt="" loading="lazy"/>
                </div>
                <div className="Kart box">
                    <img src={Kart} alt="" loading="lazy"/>
                    <div className="">Go to Cart</div>
                </div>
                <div className="arrow">
                    <img src={Arrow} alt="" loading="lazy"/>
                </div>
                <div className="Scooter box">
                    <img src={Scooter} alt="" loading="lazy"/>
                    <div className="">Book Appointment</div>
                </div>
                <div className="arrow">
                    <img src={Arrow} alt="" loading="lazy"/>
                </div>
                <div className="done box">
                    <img src={Correct} alt="" loading="lazy"/>
                    <div className="">Done </div>
                </div>
            </div>
        </div>
    )
}