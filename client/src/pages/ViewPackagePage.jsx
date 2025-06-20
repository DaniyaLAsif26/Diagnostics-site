import ViewPackage from "../components/View-Packs/View-packs";
import { useNavigate } from "react-router-dom";


export default function ViewPackagePage() {

    const navigate = useNavigate();

    const handlePackClick = (pack) => {
        navigate(`/health-packages/${pack.name}`);
    }

    return (
        <>
            <ViewPackage onPackClick={handlePackClick} />
        </>
    )
}