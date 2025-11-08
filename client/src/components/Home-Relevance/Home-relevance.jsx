import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Popular from "../Popular-packs/Popular.jsx";
import RelevanceCont from "../Relevance/Relevance-cont.jsx";

export default function HomeRelevance({onPackClick}) {

    const { relevance } = useParams();

    const [tests, setTests] = useState([]);
    const [packs, setPacks] = useState([]);
    const [selectedRelevance, setSelectedRelevance] = useState(relevance);

    const navigate = useNavigate();

    const handleRelevanceClick = (relevance) => {
        navigate(`/relevance/${relevance}`);
        setSelectedRelevance(relevance);
    };


    useEffect(() => {

        const fetchResults = async () => {
            try {
                // const res = await fetch(`http://localhost:5000/api/search?q=${relevance}`);
                const res = await fetch(`http://localhost:5000/api/search/relevance?q=${relevance}`);
                const data = await res.json();
                setTests(data.tests || []);
                setPacks(data.packages || []);
            }
            catch {
                console.error("Error fetching data for relevance:", relevance);
            }
        }
        fetchResults();
    }, [relevance]);


    return (
        <div className="search-tests-cont">
            <RelevanceCont
                onRelevanceClick={handleRelevanceClick}
                selected={selectedRelevance}
            />
            <div className="search-heading">
                <h1>Search results for "{relevance}"</h1>
            </div>

                <>

                    {tests.length > 0 && (
                        <div className="tests-result">
                            <>
                                <div className="test-heading">
                                    <h2>Tests</h2>
                                </div>
                                <div className="search-tests">
                                    {tests.map((test) => (
                                        <Popular
                                            key={test._id}
                                            name={test.name}
                                            price={test.price}
                                            tests={test.tests}
                                        />
                                    ))}
                                </div>
                            </>
                        </div>
                    )}


                    <div className="packages-result">
                        {packs.length > 0 && (
                            <>
                                <div className="package-heading test-heading">
                                    <h2>Packages</h2>
                                </div>
                                <div className="search-tests , search-packages">
                                    {packs.map((pack) => (
                                        <Popular
                                            key={pack._id}
                                            name={pack.name}
                                            price={pack.price}
                                            tests={pack.tests}
                                            onClick={onPackClick}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {tests.length === 0 && packs.length === 0 && (
                        <h3>No results found.</h3>
                    )}

                </>
            
        </div>
    );
}