import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useState } from 'react';
import Button from '@mui/material/Button';
import './Popular.css';

export default function Popular({ name, price, tests, onClick }) {

    const [message, setMessage] = useState('');
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        if (!clicked) {
            setClicked(true);
            setMessage('Added to cart');
            setTimeout(() => setMessage(""), 3500);
        } else {
            setClicked(false);
            setMessage('Removed from cart');
            setTimeout(() => setMessage(""), 3500);
        }

    }
    const handleCardClick = () => {
        if (typeof onClick === 'function') {
            onClick({ name });
        }
    }

    return (

        <div className="popular"
            onClick={handleCardClick}
        >
            <div className="popular-info">
                <h3 className="">{name}</h3>
            </div>
            {Array.isArray(tests) && (
                <div className="parameters">{tests.length} Parameters</div>
            )}
            <div className="price-book">
                <div className="">&#8377;{price}</div>
                <Button
                    variant="contained"
                    onClick={handleClick}
                    endIcon={<AddShoppingCartIcon />}>
                    {clicked ? "Remove" : "Add"}
                </Button>
            </div>
        </div>
    )
}