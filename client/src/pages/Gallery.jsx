import Gallery from "../components/Gallery/Gallery";

import { Helmet } from 'react-helmet-async';

export default function GalleryPage() {

    return (
        <>
                <Helmet>
                <title>Gallery - Vision Diagnostic Centre</title>
                <meta name="description" content="Browse our comprehensive laboratory tests" />
            </Helmet>
        <Gallery />
        </>
    )
}