import AllPacksCont from '../components/All-packs/All-packs-cont.jsx';
import { useNavigate } from "react-router-dom";


export default function AllPacks() {

    const navigate = useNavigate();

    const handlePackClick = (pack) => {
        navigate(`/health-packages/${pack.name}`);
    }

    return (
        <AllPacksCont onPackClick ={handlePackClick} />
    )
}