import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Popular from "../Popular-packs/Popular";
import "../Popular-packs/PopularCont.css";

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { useCart } from "../../context/CartContext";

import './View-packs.css';

const BackendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export default function ViewPackage({ onPackClick }) {
    const { pack } = useParams();
    const { cartItem, addToCart, removeFromCart } = useCart();
    const [Packs, setPacks] = useState();
    const [matchingPacks, setMatchingPacks] = useState();
    const [suggestedPacks, setSuggestedPacks] = useState();

    const isInCart = matchingPacks
        ? cartItem.some(item => item.name === matchingPacks.name)
        : false;

    const handleClick = (e) => {
        e.stopPropagation();
        if (!isInCart) {
            addToCart({ name: matchingPacks.name, price: matchingPacks.price, tests: matchingPacks.tests });
        } else {
            removeFromCart(matchingPacks.name);
        }
    }



    useEffect(() => {
        const fetchPackageDetails = async () => {
            try {
                const res = await fetch(`${BackendURL}/api/all-packages`);
                const data = await res.json();
                setPacks(data);

                const filtered = data.find((item) =>
                    item.name.toLowerCase().includes(pack.toLowerCase())
                );
                setMatchingPacks(filtered);
            }
            catch (error) {
                console.error("Error fetching packages:", error);
            }
        }
        fetchPackageDetails();
    }, [pack])



    useEffect(() => {
        const fetchSuggestedPacks = async () => {
            try {
                const res = await fetch(`${BackendURL}/api/all-packages`);
                const data = await res.json();
                const suggestedData = data.slice(2, 4);
                setSuggestedPacks(suggestedData);
            }
            catch (error) {
                console.error("Error fetching suggested packs:", error);
            }
        }
        fetchSuggestedPacks();
    }, [])

    return (
        <>
            <>
                {matchingPacks ? (
                    <>
                        <p className="view-nav">
                            <a href="/home">Home</a>
                            {'>'}
                            <a href="/all-packages">Health Packages </a>
                            {'>'}
                            <span className="current-package">{matchingPacks.name}</span>
                        </p>

                        <div className="view-pack-cont">
                            <div className="view-pack">
                                <h2>{matchingPacks.name.toUpperCase()}</h2>
                                <div className="view-pack-parameter">
                                    Parameter Count : {matchingPacks.tests.length}
                                </div>
                                <div className="view-pack-price">&#8377;{matchingPacks.price}</div>
                                <Button
                                    variant="contained"
                                    onClick={handleClick}
                                    endIcon={<AddShoppingCartIcon />}
                                >
                                    {isInCart ? "Remove" : "Add"}
                                </Button>
                            </div>

                            <div className="view-pack-tests">
                                <h3>Tests/Parameters</h3>
                                <ul>
                                    {matchingPacks.tests.map((test, index) => (
                                        <li key={index}>
                                            <CheckCircleIcon className="check-icon" /> {test}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="suggested-packs-cont">
                                <h2>Suggested Health Packages</h2>
                                <div className="suggested-packs">
                                    {suggestedPacks && suggestedPacks.map((pack) => (
                                        <Popular
                                            key={pack._id || pack.name}
                                            name={pack.name}
                                            price={pack.price}
                                            tests={pack.tests}
                                            onClick={onPackClick}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="no-package-found">
                        <h2>No Package Found</h2>
                        <p>We couldn't find any package matching your search.</p>
                        <Button variant="contained" href="/all-packages">
                            View All Packages
                        </Button>
                    </div>
                )}
            </>
        </>
    );
}
