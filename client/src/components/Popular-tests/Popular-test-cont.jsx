import Popular from "../Popular-packs/Popular.jsx";
import '../Popular-packs/PopularCont.css';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function PopularTestCont() {

    const [popularTests, setPopularTests] = useState([]);

    useEffect(() => {

        const fetchPopularTests = async () => {

            try {
                const res = await fetch("http://localhost:5000/api/home/popular-tests-packs");
                const data = await res.json();
                setPopularTests(data.tests);
            }

            catch (err) {
                console.error("Error fetching popular tests:", err);
            }

        }
        fetchPopularTests();
    }, [])

    return (
        <div className="popular-cont" style={{ backgroundColor: "pink" }}>
            <h2>Popular Tests</h2>
            <div className="popular-items popular-test">

                {popularTests.map((test) => (
                    <Popular
                        key={test._id}
                        name={test.name}
                        price={test.price}
                    />
                ))}

                <Link to="/all-tests" className="link">
                    <div className="more">
                        <div className="more-text">See more </div>
                        <ReadMoreIcon className="more-icon" style={{ fontSize: '3rem' }} />
                    </div>
                </Link>
            </div>
        </div>
    )
}