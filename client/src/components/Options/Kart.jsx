import './Kart.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from "../../context/CartContext";

export default function Kart() {

    const { cartItem } = useCart();

    return (
        <div className="kart-cont">
            <ShoppingCartIcon className="cart-icon" style={{ fontSize: '2.6rem' }} />
            <div className="cart">{cartItem.length}</div>
        </div>
    )
}