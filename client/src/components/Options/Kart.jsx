import './Kart.css';
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Badge, { badgeClasses } from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined'

export default function Kart() {

    const { cartItem } = useCart();

    const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -13px;
    right: -8px;
  }
`;

    return (
        <div className="kart-cont">
            <Link to="/cart-items" className="cart-link" >
                <IconButton>
                    <ShoppingCartIcon fontSize="small" sx={{ fontSize: '2rem', color: 'black' }} />
                    <CartBadge badgeContent={cartItem.length} color="primary" overlap="circular"
                        sx={{
                            '& .MuiBadge-badge': {
                                fontSize: '1rem',
                                minWidth: '1rem',
                                height: '1.5rem',
                                fontWeight: '600',
                            }
                        }} />
                </IconButton>
            </Link>
        </div>
    )
}