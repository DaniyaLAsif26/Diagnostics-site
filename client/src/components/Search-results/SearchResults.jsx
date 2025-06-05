import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Popular from "../Popular-packs/Popular.jsx";
import '../Popular-packs/PopularCont.css';
import './SearchResults.css'

export default function SearchResults() {
    const [searchParams] = useSearchParams();
    const [results, setResults] = useState([]);
    const query = searchParams.get("q");

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/tests/search?query=${query}`);
                const data = await res.json();
                setResults(data);
                console.log(data)
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        };
        if (query) fetchResults();
    }, [query]);

    return (
        <div className="search-tests-cont">
            {results.length > 0 ? (
                <>
                <div className="search-heading">
                    <h1>Search results for "{query}"</h1>
                </div>
                    <div className="search-tests">
                    {results.map((test) => (
                        <Popular
                            key={test._id || test.name}
                            name={test.name}
                            price={test.price}
                        />
                    ))}
                    </div>
                </>
            ) : (
                <div className="search-heading">
                    <h1>No Search results for "{query}"</h1>
                </div>
            )}
        </div>
    );
}
