import './Image.css';

export default function Image({ offer }) {

    return (
        <div className="offer-img">
            <img src={offer} alt="" />
        </div>
    )
}