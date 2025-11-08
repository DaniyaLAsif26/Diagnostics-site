import './Summary-row.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AltNo from './AltNo'
import Address from './Address'
import EditName from './Edit-Name'

export default function SummaryRow({ heading, data, altAddr, altPhone, edit, editName }) {
    const navigate = useNavigate()

    const [editAddrBtn, setEdiAddrBtn] = useState(edit)
    const [editNameBtn, setEditNameBtn] = useState(edit)

    const [altNoVisible, setAltNoVisible] = useState(false);

    const handleEditAddr = () => {
        setEdiAddrBtn(false)
    }

    const handleEditName = () => {
        setEditNameBtn((prev) => !prev)
    }

    const addAddr = () => {
        setEdiAddrBtn(true)
    }

    const redirectUserProfile = () => {
        navigate('/user-profile/edit' , { state: { from: '/Cart/Checkout' } })
    }

    return (
        <div className="checkout-row">
            <div className="check-head">{heading}</div>
            <p className='check-sep'>:</p>

            <div className={'check-data '}>
                {altPhone ? (
                    <>
                        {data ? (
                            <>
                                <span>{data}</span>
                                <button
                                    onClick={redirectUserProfile}
                                    className="add-btn edit-btn"
                                >
                                    Edit
                                </button>
                            </>
                        ) : altNoVisible ? (
                            <AltNo />
                        ) : null}
                    </>
                ) : altAddr ? (
                    <>
                        {editAddrBtn ? (
                            <>
                                {data && <span>{data}</span>}
                                <button onClick={handleEditAddr} className="add-btn edit-btn">Edit</button>
                            </>
                        )
                            : (
                                <>
                                    <div className="edit-addr-row">
                                        <Address address={data} />
                                        <button className="add-btn" onClick={addAddr}>Add</button>
                                    </div>
                                </>
                            )}
                    </>
                ) : editName ? (
                    <>
                        {editNameBtn ? (
                            <>
                                {data && <span>{data}</span>}
                                <button onClick={handleEditName} className="add-btn edit-btn">Edit</button>
                            </>
                        )
                            : (
                                <>
                                    <EditName name={data} addBtn={handleEditName} />
                                </>
                            )}
                    </>
                )
                    :
                    (
                        data
                    )}
            </div>
        </div>
    )
}