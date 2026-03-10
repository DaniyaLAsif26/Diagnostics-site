import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DiagTests from './AdminDiadFilters/DiagTests';

import './Admin-Diagnostics.css'

export default function AdminDianostics() {
    const [allLaboratoryTests, setAllLaboratoryTests] = useState([])
    const [allRadiologyTests, setAllRadiologyTests] = useState([])
    const [allPacks, setAllPacks] = useState([])

    const [allDiagnosticsFilter, setAllDiagnosticsFilter] = useState(() => {
        return sessionStorage.getItem('diagnosticFilter') || 'Laboratory Tests'
    })

    useEffect(() => {
        sessionStorage.setItem('diagnosticFilter', allDiagnosticsFilter)
    }, [allDiagnosticsFilter])

    const [id, setId] = useState('');
    const [message, setMessage] = useState('')

    const BackendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

    const contHead =
    {
        heading: "All Diagnostics",
        input: "Search Tests/Packs",
        button1: "Add Tests",
        button2: "Add Packs",
        searchInput: setId,
        add_btn_url1: '/upload/tests',
        add_btn_url2: '/upload/packs'
    }

    const diagnosticsFilter = [
        'Laboratory Tests', 'Radiology Tests', 'Packages'
    ]

    const getTests = async () => {
        try {
            const res1 = await fetch(`${BackendURL}/api/tests/laboratory`);
            const res2 = await fetch(`${BackendURL}/api/tests/radiology`);
            const res3 = await fetch(`${BackendURL}/api/packs/all-packages`);

            const data1 = await res1.json()
            const data2 = await res2.json()
            const data3 = await res3.json()

            if (data1.success === true) {
                setAllLaboratoryTests(data1.tests)
            }
            if (data2.success === true) {
                setAllRadiologyTests(data2.tests)
            }
            if (data3.success === true) {
                setAllPacks(data3.packs)
            }

        }
        catch (err) {
            console.log(err)
            setMessage(err.message)
        }
    }

    useEffect(() => {
        getTests()
    }, [])

    const filterConfig = {
        'Laboratory Tests': allLaboratoryTests,
        'Radiology Tests': allRadiologyTests,
        'Packages': allPacks,
    }

    return (
        <div className="all-diagnostics-cont">
            <div className="Laboratory-cont">
                <div className="all-items-cont-head">
                    <h3 className="">{contHead.heading}</h3>
                    <div className="item-search">
                        <form className="item-search-form">
                            <input
                                type="text"
                                placeholder={contHead.input}
                                onChange={(e) => contHead.searchInput(e.target.value)}
                            />
                        </form>
                    </div>

                    <div className="add-item">
                        <button className='add-item-btn' onClick={() => navigate(contHead.add_btn_url1)}>{contHead.button1}</button>
                        <button className='add-item-btn' onClick={() => navigate(contHead.add_btn_url2)}>{contHead.button2}</button>
                    </div>
                </div>
            </div>

            <div className="all-diagnostics">
                <div className="all-diagnostics-filter">
                    {diagnosticsFilter.map((name, key) =>
                        <button
                            key={key}
                            className={`add-item-btn ${allDiagnosticsFilter === name ? 'diagFilterSelected' : null}`}
                            onClick={() => setAllDiagnosticsFilter(name)}
                        >
                            {name}
                        </button>
                    )}
                </div>
                <div className="all-diagnostics-results">
                    {allDiagnosticsFilter && (
                        <DiagTests
                            results={filterConfig[allDiagnosticsFilter]}
                            heading={allDiagnosticsFilter}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}