import './download-reports.css'

export default function DownloadReports({ data }) {

    return (
        <div className="download-reports-cont-table">
            <table className="cart-table report-table">
                <thead>
                    <tr>
                        <th className="cart-head1">Unique Id</th>
                        <th className="cart-head3">Report</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{data.uniq_id}</td>
                        <td><a href={`http://localhost:5000/api/report/download/${data._id}`} download target="_blank" rel="noopener noreferrer">download</a></td>
                    </tr>


                </tbody>
            </table>
        </div>
    )
}