import AllPacksCont from '../components/All-packs/All-packs-cont.jsx';
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet-async';

export default function AllPacks() {

    const navigate = useNavigate();

    const handlePackClick = (pack) => {
        navigate(`/health-packages/${pack.name}`);
    }

    return (
        <>
            <Helmet>
                <title>
                    Packages - Vision Diagnostic Centre
                    </title>
                <meta name="description" content="Browse our comprehensive laboratory tests" />
            </Helmet>
            <AllPacksCont onPackClick={handlePackClick} />

        </>
    )
}