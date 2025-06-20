import HomeRelevance from "../components/Home-Relevance/Home-relevance";
import { useNavigate } from "react-router-dom";


export default function HomeRelevancePage() {

    const navigate = useNavigate();

    const handlePackClick = (pack) => {
        navigate(`/health-packages/${pack.name}`);
    }

    return (
        <>
            <HomeRelevance onPackClick={handlePackClick} />
        </>
    );
}