import SearchResults from '../components/Search-results/SearchResults.jsx';
import { useNavigate } from "react-router-dom";

import { Helmet } from 'react-helmet-async';

export default function Search() {

    const navigate = useNavigate();

    const handlePackClick = (pack) => {
        navigate(`/health-packages/${pack.name}`);
    }

    return (
        <>
            <Helmet>
                <title>Book Radiology Scans & Lab Tests Online at Vision Diagnostic Centre</title>
                <meta name="description" content="Browse our comprehensive laboratory tests" />
            </Helmet>
            <SearchResults onPackClick={handlePackClick} />
        </>
    )
}