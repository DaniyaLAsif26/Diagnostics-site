import './download-reports.css'
import { useState } from 'react'
import DownloadReports from './download-reports'

const BackendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export default function DownloadReportsCont() {

    const [search, setSearch] = useState('')
    const [reportData, setReportData] = useState(null)
    const [message, setMessage] = useState('')

    const searchReport = async (e) => {
        e.preventDefault()
        console.log(search)

        if (!search.trim()) return;

        try {
            const res = await fetch(`${BackendURL}/api/report/search?uniq_id=${search}`)

            const data = await res.json()

            if (data.Success === false) {
                setMessage(data.message)
            }

            if (data.Success === true) {
                setMessage(data.message)
                setReportData(data.report)
                console.log(data.report)
            }
        }
        catch (error) {
            console.log(error)
        }

    }

    return (
        <div className="donwload-reports-cont">
            <div className="donwload-reports-cont-head">
                <h3>Donwload Test Reports</h3>
            </div>
            <div className="donwload-reports-cont-form">
                <form action="" className='download-reports-form' onSubmit={searchReport}>
                    <input
                        type="text"
                        placeholder='Enter Unique Id'
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value)
                            setMessage('')
                        }}
                    />
                    <button
                        className='report-search-btn'
                        type='submit'
                    >
                        Enter
                    </button>
                </form>
            </div>
            {reportData ? (
                <DownloadReports data={reportData} />
            ) : (
                message && (
                    <div className="msg">
                        {message}
                    </div>
                )
            )}
        </div>
    )
}