import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Popular from "../Popular-packs/Popular.jsx";
import "../Popular-packs/PopularCont.css";
import "../Search-results/SearchResults.css";
import RelevanceCont from "../Relevance/Relevance-cont.jsx";

export default function AllTestsCont() {
    const [tests, setTests] = useState([]);
    const [selectedRelevance, setSelectedRelevance] = useState("");
    const [filteredTests, setFilteredTests] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const fetchAllTests = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/all-tests");
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.json();
                setTests(data);
                setFilteredTests(data); 
            } catch (error) {
                console.error("Error fetching all tests:", error);
            }
        };

        fetchAllTests();
    }, []);

    useEffect(() => {
        setSelectedRelevance("");
        setFilteredTests(tests);
    }, [location.key, tests]);

    const handleRelevanceClick = (relevance) => {
        if (relevance === selectedRelevance) {
           
            setSelectedRelevance("");
            setFilteredTests(tests);
        } else {
            setSelectedRelevance(relevance);
            const filtered = tests.filter((test) => test.relevance === relevance);
            setFilteredTests(filtered);
        }
    };

    return (
        <div className="all-tests">
            <div className="relevance">
                <RelevanceCont
                    onRelevanceClick={handleRelevanceClick}
                    selected={selectedRelevance}
                />
            </div>

            <div className="search-tests-cont">
                {filteredTests.length > 0 ? (
                    <>
                        <div className="search-heading">
                            <h1>{selectedRelevance ? `'${selectedRelevance}' Tests` : "All Test Services"}</h1>
                        </div>
                        <div className="search-tests">
                            {filteredTests.map((test) => (
                                <Popular
                                    key={test._id || test.name}
                                    name={test.name}
                                    price={test.price}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="no-tests">
                        <h2>No tests available for the selected relevance.</h2>
                    </div>
                )}
            </div>
        </div>
    );
}
