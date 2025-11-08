import './Address.css'
import { useState } from 'react'
import {useLogin} from '../../context/LoginContext'

export default function Address({ address }) {

    const { updateUserData } = useLogin()

    const [addr, setAddr] = useState(address)
    const [error, setError] = useState(false)

    const updateTextarea = (e) => {
        const newValue = e.target.value
        setAddr(newValue)
        if (newValue.trim() === '') {
            setError(true)
        } else {
            setError(false)
            updateUserData('address', newValue)
        }
    }

    return (
        <div className="address-cont">
            <form className='addr-form' >
                <textarea className={`addr-textarea ${error ? 'error' : ''}`} onChange={updateTextarea} value={addr}></textarea>
            </form>
        </div>
    )
}