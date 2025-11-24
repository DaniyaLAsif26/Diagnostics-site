import './upload-report.css'
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

import { useTrigger } from '../../context/TriggerContext'

const BackendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export default function UploadReportsCont() {
    const navigate = useNavigate()
    const location = useLocation();

    const from = location.state?.from || '/admin/dashboard';

    const { triggerDataUpdate } = useTrigger();

    const [uniq_id, setUniq_id] = useState('')
    const [reportMobileNo, setReportMobileNo] = useState('91')
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const { uniq_id, phone_no } = location.state || {};
        if (uniq_id || phone_no) {
            setUniq_id(uniq_id || '')
            setReportMobileNo(phone_no || '91')
        }
    }, [location.state]);

    const uploadReports = async (e) => {
        e.preventDefault()

        if (loading) return;

        const fileInput = document.getElementById('upload-file')
        const file = fileInput.files[0]

        if (!uniq_id || !file || reportMobileNo.length !== 12) {
            setErrorMessage("Please fill all fields correctly!")
            return
        }

        const formData = new FormData()
        formData.append('uniq_id', uniq_id)
        formData.append('reportMobileNo', reportMobileNo)
        formData.append('file', file)

        try {
            setLoading(true)

            const res = await fetch(`${BackendURL}/api/report/upload`, {
                method: "POST",
                credentials : 'include',
                body: formData
            })

            const data = await res.json()

            if (data.Success === false) {
                setErrorMessage(data.message)
            }

            if (data.Success === true) {
                setSuccessMessage(data.message)
                setReportMobileNo('91')
                setUniq_id('')
                triggerDataUpdate();
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        navigate(from, { replace: true });
                    }, 50);
                });
            }
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }

    const resetMsg = () => {
        setErrorMessage('')
        setSuccessMessage('')
    }

    useEffect(() => {
        if (loading === true) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        // cleanup on unmount
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [loading])


    return (
        <div className="upload-reports-cont">
            <div className="upload-reports-cont-head">
                <h3>Upload Reports</h3>
            </div>

            <div className="upload-reports-cont-form">
                <form className="upload-reports-from">

                    {/* Unique ID */}
                    <div className="upload-report-from-div">
                        <label htmlFor="uniq-id" className='upload-report-label'>Unique Id</label>
                        <input
                            type="text"
                            id='uniq-id'
                            placeholder='Enter Unique Id'
                            value={uniq_id}
                            onChange={(e) => setUniq_id(e.target.value)}
                            onClick={resetMsg}
                        />
                    </div>

                    {/* Upload File */}
                    <div className="upload-report-from-div">
                        <label htmlFor="upload-file" className='upload-report-label'>Upload File</label>
                        <input
                            type="file"
                            id='upload-file'
                            accept=".pdf"
                            className='upload-file-input'
                            onClick={resetMsg}
                        />
                    </div>

                    <div className="upload-report-from-div">
                        <label htmlFor="mobile-no" className='upload-report-label'>Mobile No</label>
                        <input
                            type="tel"
                            id='mobile-no'
                            placeholder='91 - XXXXXXXXXX'
                            value={`91 - ${reportMobileNo.slice(2)}`}
                            onChange={(e) => {
                                let digits = e.target.value.replace(/\D/g, '') // only digits
                                if (!digits.startsWith('91')) digits = '91' + digits
                                if (digits.length > 12) digits = digits.slice(0, 12)
                                setReportMobileNo(digits)
                            }}
                            onKeyDown={(e) => {
                                // Prevent backspace or arrow before prefix
                                if (
                                    (e.key === 'Backspace' && e.target.selectionStart <= 4) ||
                                    (e.key === 'ArrowLeft' && e.target.selectionStart <= 4)
                                ) {
                                    e.preventDefault()
                                }
                            }}
                            onClick={(e) => {
                                resetMsg()
                                // Always keep cursor after the prefix
                                if (e.target.selectionStart < 4) {
                                    e.target.setSelectionRange(4, 4)
                                }
                            }}
                            onFocus={(e) => {
                                // When focused, set cursor after prefix
                                if (e.target.selectionStart < 4) {
                                    e.target.setSelectionRange(4, 4)
                                }
                            }}
                            required
                        />
                    </div>
                </form>
            </div>
            {(errorMessage || successMessage) && (
                <div className={`msg ${errorMessage ? 'error-msg' : 'success-msg'}`}>
                    {errorMessage || successMessage}
                </div>
            )}

            <div className="upload-report-btn">
                <button className='revert-btn ' onClick={() => navigate('/admin/dashboard')} >Back</button>
                <button className='upload-btn' onClick={uploadReports}>Upload</button>
            </div>
            {loading && (
                <div className="overlay-loader">
                    <div className="spinner"></div>
                    <p>Uploading to Cloud...</p>
                </div>
            )}
        </div>
    )
}
