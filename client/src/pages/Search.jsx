import SearchResults from '../components/Search-results/SearchResults.jsx';
import { useNavigate } from "react-router-dom";

export default function Search() {

    const navigate = useNavigate();

    const handlePackClick = (pack) => {
        navigate(`/health-packages/${pack.name}`);
    }

    return (
        <>
            <SearchResults onPackClick={handlePackClick} />
        </>
    )
}