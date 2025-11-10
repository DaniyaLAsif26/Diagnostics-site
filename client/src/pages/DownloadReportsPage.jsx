import DownloadReportsCont from "../components/DownloadReports/DownloadReportsCont"

import { Helmet } from 'react-helmet-async';

export default function DownloadReportsPage() {

    return (
        <>
            <Helmet>
                <title>Download Report - Vision Diagnostic Centre</title>
                <meta name="description" content="Browse our comprehensive laboratory tests" />
            </Helmet>
            < DownloadReportsCont />
        </>

    )
}