import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Button from '@mui/material/Button';
import './Popular.css';
import { useCart } from "../../context/CartContext";

export default function Popular({ name, price, tests, onClick }) {

    const { cartItem, addToCart, removeFromCart} = useCart();

    const isInCart = cartItem.some(item => item.name === name);

    const handleClick = (e) => {
        e.stopPropagation();
        if (!isInCart) {
            addToCart({ name, price, tests });
        } else {
            removeFromCart(name);
        }
    }

    const handleCardClick = () => {
        if (typeof onClick === 'function') {
            onClick({ name });
        }
    }

    return (
        <div className="popular" onClick={handleCardClick}>
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
                    endIcon={<AddShoppingCartIcon />}>
                    {isInCart ? "Remove" : "Add"}
                </Button>
            </div>
        </div>
    )
}
