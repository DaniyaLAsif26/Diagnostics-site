import './Kart.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function Kart() {

    return (
        <div className="kart-cont">
            <ShoppingCartIcon className="cart-icon" style={{fontSize:'2.6rem'}}/>
            <div className="cart">0</div>
        </div>
    ) 
}