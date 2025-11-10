import UploadReportsCont from "../components/Upload-Reports/Upload-reports-comt"

import { Helmet } from 'react-helmet-async';

export default function UploadReportsPage() {

    return (
        <>
        <Helmet>
                <title>Admin - Vision Diagnostic Centre</title>
                <meta name="description" content="Browse our comprehensive laboratory tests" />
              </Helmet>
        <UploadReportsCont />
        </>
    )
}