import { useNavigate } from 'react-router-dom';

export default function AllItems({ data = [], head = [], columns = 2, contHead, message = "" }) {
    const hasData = data && data.length > 0;

    const navigate = useNavigate()

    const BackendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

    const editUser = async (id) => {
        navigate(`/user/edit/${id}`)
    }

    const deleteUser = async (id, number) => {
        const confirmDelete = confirm(`Are you sure you want to delete User ${number}?`);

        if (!confirmDelete) return;

        try {
            const res = await fetch(`${BackendURL}/api/user/delete/${id}`, {
                method: "DELETE"
            })

            const data = await res.json()

            if (data.Success) {
                alert(`User ${number} deleted Successfully`)
                window.location.reload();
            }
            else {
                return alert(`Unable to delete User ${number}`)
            }

        }
        catch (error) {
            console.log(error)
            alert(error.message)
        }
    }

    const deleteReport = async (id, uniq_id) => {
        const confirmDelete = confirm(`Are you sure you want to delete Report ${uniq_id}?`);

        if (!confirmDelete) return;

        try {
            const res = await fetch(`${BackendURL}/api/report/delete/${id}`, {
                method: "DELETE"
            })

            const data = await res.json()

            if (data.Success) {
                alert(`Report ${uniq_id} deleted Successfully`)
                window.location.reload();
            }
            else {
                return alert(`Unable to delete Report ${uniq_id}`)
            }

        }
        catch (error) {
            console.log(error)
            alert(error.message)
        }
    }


    return (
        <div className="all-items-cont">
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
                    <button className='add-item-btn' onClick={() => navigate(contHead.add_btn_url)}>{contHead.button}</button>
                </div>
            </div>

            {/* <div className="all-items-table-cont">
                {hasData ? (
                    <table className='all-items-table cart-table'>
                        <thead>
                            <tr>
                                {head.map((item, index) => (
                                    <th key={index}>{item}</th>
                                ))}
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.map((item, index) => (
                                <tr key={item._id || index}>
                                    <td>{index + 1}</td>

                                    {item.uniq_id ? (
                                        <>
                                            <td>{item.uniq_id}</td>
                                            <td>{item.number}</td>
                                            <td>
                                                {item.file_url ? (
                                                    <a href={`${BackendURL}/api/report/download/${item._id}`} target="_blank" rel="noopener noreferrer">download</a>
                                                ) : (
                                                    "No report"
                                                )}
                                            </td>
                                            <td><button className='item-edit-btn' >Edit</button></td>
                                            <td><button className='item-delete-btn' onClick={() => deleteReport(item._id, item.uniq_id)}>Delete</button></td>
                                        </>
                                    ) : (
                                        <>
                                            <td>{item.number}</td>
                                            <td>{item.name}</td>
                                            <td><button className='item-edit-btn' onClick={() => editUser(item._id)}>Edit</button></td>
                                            <td><button className='item-delete-btn' onClick={() => deleteUser(item._id, item.number)}>Delete</button></td>
                                        </>
                                    )}

                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="msg">{message || "No data found"}</p>
                )}
            </div> */}
        </div>
    );
}
