import { useEffect, useState } from "react";
import Popular from "../Popular-packs/Popular.jsx";
import '../Popular-packs/PopularCont.css';
import '../Search-results/SearchResults.css';
import RelevanceCont from "../Relevance/Relevance-cont.jsx";

export default function AllTestsCont() {
    const [tests, setTests] = useState([]);

    useEffect(() => {
        const fetchAllTests = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/all-tests");
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.json();
                setTests(data);
            } catch (error) {
                console.error("Error fetching all tests:", error);
            }
        };

        fetchAllTests();
    }, []);

    return (
        <div className="all-tests ">
            <div className="relevance">
                <RelevanceCont />
            </div>

            <div className="search-tests-cont">
                {tests.length > 0 ? (
                    <>
                        <div className="search-heading">
                            <h1>All Tests Services</h1>
                        </div>
                        <div className="search-tests">
                            {tests.map((test) => (
                                <Popular
                                    key={test._id || test.name}
                                    name={test.name}
                                    price={test.price}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <p>Loading or no tests available.</p>

                )}
            </div>
        </div>
    );
}
