import './Kart.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

export default function Kart() {

    const { cartItem } = useCart();

    return (
        <div className="kart-cont">
            <Link to="/cart-items" className="cart-link" >
                <ShoppingCartIcon className="cart-icon" style={{ fontSize: '2.6rem' }} />
                <div className="cart">{cartItem.length}</div>
            </Link>
        </div>
    )
}