import Popular from "./Popular.jsx"
import './PopularCont.css';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';

export default function PopularPackCont({ onPackClick }) {
    const [popularPacks, setPopularPacks] = useState([]);

    const [viewMore, setViewMore] = useState(window.innerWidth >= 1290);

    useEffect(() => {

        const handleResize = () => {
            setViewMore(window.innerWidth <= 1290)
        }

        handleResize()
        window.addEventListener("resize", handleResize);

        const fetchPopularPacks = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/home/popular-tests-packs");
                const data = await res.json();
                setPopularPacks(data.packages);
            }
            catch (err) {
                console.error("Error fetching popular packages:", err);
            }
        }
        fetchPopularPacks();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [])

    return (
        <div className="popular-cont popular-packs" >
            <div className="popular-cont-head">
                <h2>Popular Packages</h2>
                {viewMore &&
                    <Link to="/all-packages" className="link">
                        <div className="more-link">VIEW MORE</div>
                    </Link>
                }
            </div>

            <div className="popular-items-wrapper">
                <div className="popular-items popular-pack">
                    {popularPacks.map((pack) => (
                        <Popular
                            key={pack._id}
                            name={pack.name}
                            price={pack.price}
                            tests={pack.tests}
                            onClick={onPackClick}
                        />
                    ))}

                    <Link to="/all-packages" className="link">
                        <div className="more">
                            <div className="more-text">View more </div>
                            <ReadMoreIcon className="more-icon" style={{ fontSize: '3rem' }} />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}