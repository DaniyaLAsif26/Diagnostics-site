import Test from '../../assets/Guide-imgs/test.webp';
import Kart from '../../assets/Guide-imgs/toKart.webp';
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
                    <img src={Test} alt="" />
                    <div className="">Book a test </div>
                </div>
                <div className="arrow">
                    <img src={Arrow} alt="" />
                </div>
                <div className="Kart box">
                    <img src={Kart} alt="" />
                    <div className="">Go to Cart</div>
                </div>
                <div className="arrow">
                    <img src={Arrow} alt="" />
                </div>
                <div className="Scooter box">
                    <img src={Scooter} alt="" />
                    <div className="">Home Sample
                        Collection</div>
                </div>
                <div className="arrow">
                    <img src={Arrow} alt="" />
                </div>
                <div className="done box">
                    <img src={Correct} alt="" />
                    <div className="">Done </div>
                </div>
            </div>
        </div>
    )
}