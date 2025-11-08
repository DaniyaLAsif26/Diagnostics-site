import { useEffect, useState } from "react"
import './Book-test.css'
import { useParams, useNavigate } from "react-router-dom";

import { useTrigger } from "../../context/TriggerContext";

export default function BookedTests() {

    const { triggerDataUpdate } = useTrigger();

    const { id } = useParams();
    const navigate = useNavigate();

    const [appointment, setAppointment] = useState(null);

    const [completedBy, setCompletedBy] = useState('')

    useEffect(() => {
        fetch(`http://localhost:5000/api/appointments/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    const appt = data.appointment
                    setAppointment(appt);
                    setCompletedBy(appt.completedBy || '')
                }
            })
            .catch(err => console.error(err));
    }, [id]);

    const handleDelete = (id) => {
        fetch(`http://localhost:5000/api/appointments/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {

                if (data.success) {
                    triggerDataUpdate('USER_UPDATED');
                    requestAnimationFrame(() => {
                        setTimeout(() => {
                            navigate("/admin/dashboard");
                        }, 50);
                    });
                }
            })
            .catch(err => console.error(err));
    }

    const completeAppointment = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/appointments/complete/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    completed: true,
                    completedBy: completedBy.trim()
                }),
            });

            const data = await response.json();

            if (data.success) {
                console.log("Appointment marked as completed successfully!");
                navigate("/admin/dashboard");
                triggerDataUpdate()
            } else {
                alert("Failed to complete appointment: " + (data.message || "Unknown error"));
            }
        } catch (error) {
            console.error("Error completing appointment:", error);
            alert("Error completing appointment. Please try again.");
        }
    }

    const revertAppointment = async (e) => {
        e.preventDefault()

        try {
            const res = await fetch(`http://localhost:5000/api/appointments/complete/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    completed: false
                })
            })

            const data = await res.json()

            if (data.success === true) {
                navigate('/admin/dashboard')
                triggerDataUpdate()
            }
        }
        catch {

        }
    }
    const UploadReportsCont = (uniq_id, phone_no, id) => {
        navigate('/upload/reports', { state: { uniq_id, phone_no, from: `/appointments/${id}` } });
    }

    if (!appointment) {
        return <h2>Loading appointment...</h2>;
    }

    return (
        <div className="booked-tests-cont">
            <button className="back-btn" onClick={() => navigate('/admin/dashboard')}>Back</button>
            <div className="booked-tests">
                <div className="booking-table">
                    <div className="booked-tests-table booked-tests-table1">
                        <table border="1" cellPadding="8" className="Booked-test-table" style={{ borderCollapse: "collapse" }}>
                            <thead>
                                <tr>
                                    <th>Uniq-Id</th>
                                    <th>Name</th>
                                    <th>Number</th>
                                    <th>Date</th>
                                    <th>Day</th>
                                    <th>Time</th>
                                    <th>Sample</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{appointment.uniq_id}</td>
                                    <td>{appointment.name}</td>
                                    <td>{appointment.phone_no}</td>
                                    <td>{new Date(appointment.date).toLocaleDateString('en-GB')}</td>
                                    <td>{appointment.day}</td>
                                    <td>{appointment.time}</td>
                                    <td>{appointment.radio}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="booked-tests-table booked-tests-table2">
                        <table border="1" cellPadding="8" className="Booked-test-table" style={{ borderCollapse: "collapse" }}>
                            <thead>
                                <tr>
                                    <th>Subtotal</th>
                                    <th>Discount</th>
                                    <th>Total</th>
                                    <th>2nd No</th>
                                    <th>Booking Date</th>
                                    <th> Home Address</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{appointment.subtotal}</td>
                                    <td>{appointment.discount}</td>
                                    <td>{appointment.total}</td>
                                    <td>{appointment.alt_no || '--'}</td>
                                    <td>{new Date(appointment.createdAt).toLocaleDateString('en-GB')}</td>
                                    <td>{appointment.address || '--'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="all-appointment-test">
                    {appointment.tests?.map((t, i) => (
                        <div className="appointment-test" key={i}>
                            <div className="test-name">{t.name}</div>
                            <div className="test-price">₹{t.price}</div>
                        </div>
                    ))}
                </div>

                <div className="appointment-report">
                    <h2>Appointment Report :</h2>
                    <div className="">
                        {appointment.report != null || appointment.report ? (
                            <div className="">
                                <a href={`http://localhost:5000/api/report/download/${appointment.report._id}`} download target="_blank" rel="noopener noreferrer">download</a></div>
                        ) : (
                            <>
                                <div className="">No Report Uploaded</div>
                                <button className="upload-btn" onClick={() => UploadReportsCont(appointment.uniq_id, appointment.phone_no, appointment._id)}>Uppload Report</button>
                            </>
                        )}
                    </div>
                </div>

                <div className="appointment-payment-btn">
                    <div className="payment-comment-cont">
                        <div className="appointment-payment-radio">
                            <h2>Payment Status&nbsp; : </h2>
                            <div className="pyt-status">{appointment.paymentStatus}</div>
                        </div>
                        <div className="comments-con">
                            <div className="comments">
                                <h4>Comments &nbsp;:&nbsp;</h4>
                                <textarea name="" id="comments" value={appointment.comments} readOnly></textarea>
                            </div>
                        </div>
                        <div className="completed-by-cont">
                            <div className="">
                                <h4>Appointment Completed By &nbsp;: &nbsp;" {appointment.completedBy} "</h4>
                            </div>
                        </div>

                    </div>
                    <div className="payment-radio">
                        <div className="appointment-btn">
                            <button className="edit-btn" onClick={() => navigate(`/appointments/edit/${appointment._id}`)}>Edit</button>
                            <button className="edit-btn complete-btn" onClick={completeAppointment} disabled={completedBy.length === 1 || completedBy.length === 0 || appointment.completed === true}>Complete</button>
                            {appointment.completed === true &&
                                <button className="edit-btn revert-btn" onClick={revertAppointment} disabled={appointment.completed === false}>Revert</button>
                            }
                            <button onClick={() => handleDelete(appointment._id)} className="edit-btn dlt-btn">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
