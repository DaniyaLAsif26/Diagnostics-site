import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Button from '@mui/material/Button';
import './Popular.css';

export default function Popular({name,description,price}) {

    return (
        <div className="popular">
            <div className="popular-info">
            <h3 className="">{name}</h3>
            <div className="pop-desc">{description}</div>
            </div>
            <div className="price-book">
                <div className="">&#8377;{price}</div>
                <Button variant="contained" endIcon={<AddShoppingCartIcon />}>
                    Add
                </Button>
            </div>
        </div>
    )
}