import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Button from '@mui/material/Button';
import './Popular.css';
import { useCart } from "../../context/CartContext";

export default function Popular({ name, price, tests, patientPreparation, onClick }) {

    const { cartItem, addToCart, removeFromCart } = useCart();

    const isInCart = cartItem.some(item => item.name === name);

    const handleClick = (e) => {
    e.stopPropagation();

    if (!isInCart) {
        const itemToAdd = { name, price, tests };

        // Only add patientPreparation if it exists
        if (patientPreparation) {
            itemToAdd.patientPreparation = patientPreparation;
        }

        addToCart(itemToAdd);
    } else {
        removeFromCart(name);
    }
};

    const handleCardClick = () => {
        if (typeof onClick === 'function') {
            onClick({ name });
        }
    }

    return (
        // {isInCart ? "Remove" : "Add"}
        <div className={`popular ${isInCart ? " " : ""}`}onClick={handleCardClick}>
            <div className="popular-info">
                <h3>{name}</h3>
            </div>
            {Array.isArray(tests) && (
                <div className="parameters">{tests.length} Parameters</div>
            )}
            <div className="price-book">
                <div>&#8377;{price}</div>
                <Button
                    variant="contained"
                    onClick={handleClick}
                    endIcon={<AddShoppingCartIcon className='pop-shop-icon' />}>
                    {isInCart ? "Remove" : "Add"}
                </Button>
            </div>
        </div>
    )
}
