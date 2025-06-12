import Popular from "./Popular.jsx"
import './PopularCont.css';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';

export default function PopularPackCont() {
    const [popularPacks, setPopularPacks] = useState([]);

    useEffect(() => {
        const fetchPopularPacks = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/home/popular-tests-packs");
                const data = await res.json();
                setPopularPacks(data.packages);
            }
            catch {
                console.error("Error fetching popular packages:", err);
            }
        }
        fetchPopularPacks();
    }, [])

    return (
        <div className="popular-cont" style={{ backgroundColor: "pink" }}>
            <h2>Popular Packages</h2>
            <div className="popular-items popular-pack">
                {popularPacks.map((pack) => (
                    <Popular
                        key={pack._id}
                        name={pack.name}
                        price={pack.price}
                        tests={pack.tests} />
                ))}

                <Link to="/all-packages" className="link">
                    <div className="more">
                        <div className="more-text">See more </div>
                        <ReadMoreIcon className="more-icon" style={{ fontSize: '3rem' }} />
                    </div>
                </Link>
            </div>
        </div>
    )
}