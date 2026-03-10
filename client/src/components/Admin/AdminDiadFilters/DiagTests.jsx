import './diag-tests.css'
import { useNavigate } from 'react-router-dom'

export default function DiagTests({ results, heading}) {
    const navigate = useNavigate()

    const editTest = (id) => {
        if(heading === 'Packages'){
            navigate(`/admin/pack/edit/${id}`)
        }
        else{
            navigate(`/admin/test/edit/${id}`)
        }
    }

    return (
        <div className="diag-tests-cont">
            <h2>{heading}</h2>
            <div className="diag-tests">
                <table className='diag-tests-table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Discounted Price</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((tests, key) =>
                            <tr key={key} >
                                <td>{tests.name}</td>
                                <td>{tests.price}</td>
                                <td>{tests.discountPrice}</td>
                                <td>
                                    <button onClick={() => editTest(tests._id)}>Edit</button>
                                </td>
                                <td>
                                    <button>Delete</button>
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>
        </div>
    )
}