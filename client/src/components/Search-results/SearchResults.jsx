import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Popular from '../Popular-packs/Popular.jsx';
import '../Popular-packs/PopularCont.css';
import './SearchResults.css';

const BackendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";


export default function SearchResults({ onPackClick }) {
    const [searchParams] = useSearchParams();
    const [testResults, setTestResults] = useState([]);
    const [packageResults, setPackageResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const query = searchParams.get("q");

    useEffect(() => {
        const fetchResults = async () => {
            if (!query) return;

            setLoading(true);
            try {
                const res = await fetch(`${BackendURL}/api/search?q=${query}`);
                const data = await res.json();
                setTestResults(data.tests || []);
                setPackageResults(data.packages || []);
            } catch (error) {
                console.error("Error fetching search results:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [query]);

    return (
        <div className="search-tests-cont">
            <div className="search-heading">
                <h1>Search results for : "{query}"</h1>
            </div>

            {loading ? (
                <h3>Loading...</h3>
            ) : (
                <>

                    <div className="tests-result">
                        {testResults.length > 0 && (
                            <>
                                <div className="test-heading">
                                    <h2>Tests</h2>
                                </div>
                                <div className="search-tests">
                                    {testResults.map((test) => (
                                        <Popular
                                            key={test._id}
                                            name={test.name}
                                            price={test.price}
                                            tests={test.tests}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    <div className="packages-result">
                        {packageResults.length > 0 && (
                            <>
                                <div className="package-heading test-heading">
                                    <h2>Packages</h2>
                                </div>
                                <div className="search-tests , search-packages">
                                    {packageResults.map((pack) => (
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

                    {testResults.length === 0 && packageResults.length === 0 && (
                        <h3>No results found.</h3>
                    )}

                </>
            )}
        </div>
    );
}
