import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';



import './View-packs.css';

export default function ViewPackage() {

    const { pack } = useParams();

    const [Packs, setPacks] = useState();
    const [matchingPacks, setMatchingPacks] = useState();
    const [clicked, setClicked] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchPackageDetails = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/all-packages");
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
                                    {clicked ? "Remove" : "Add"}
                                </Button>

                                {message && <p className="cart-message">{message}</p>}
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
