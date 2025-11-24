import { useEffect } from "react"
import { useState } from "react"

import AllItems from "./AllUsers"

export default function ReportsCont() {
    const [allReports, setAllReports] = useState([])
    const [id, setId] = useState('');
    const [message, setMessage] = useState('')

    const BackendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

    const getReports = async (searchQuery = '') => {
        try {
            const res = await fetch(`${BackendURL}/api/report/search/admin?q=${searchQuery}`, {
                credentials: 'include'
            })

            const data = await res.json()

            if (data.Success === true) {
                setAllReports(data.reports)
            }
            else {
                setAllReports([])
                setMessage(data.message)
            }
        }
        catch (err) {
            console.log(err)
            setMessage(err.message)
            setAllReports([])
        }
    }


    useEffect(() => {
        getReports()
    }, [])

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            getReports(id);
        }, 400);

        return () => clearTimeout(delayDebounce);
    }, [id]);

    const tableHead = [
        'No', "Uniq_Id", "Number", "Report"
    ]

    const contHead =
    {
        heading: "All Reports",
        input: "Search Reports",
        button: "Upload Reports",
        searchInput: setId,
        add_btn_url: '/upload/reports'
    }

    return (
        <div className="reports-cont">
            <AllItems data={allReports} head={tableHead} columns={3} contHead={contHead} message={message} />
        </div>
    )
}