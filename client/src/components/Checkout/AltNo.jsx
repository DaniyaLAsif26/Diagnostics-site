import './AltNo.css'
import { useState } from 'react'
import { useLogin } from '../../context/LoginContext'

export default function AltNo() {

    const { updateUserData } = useLogin()

    const [error, setError] = useState(false)
    const [input, setInput] = useState('')
    const [displayAltForm, setdisplayAltForm] = useState(true)

    const updateInput = (e) => {
        setInput(e.target.value)
        setError(false)
    }

    const handleAddSubmit = (e) => {
        e.preventDefault()
        if (!input || input.length < 10) {
            setError(true)
            return
        }
        updateUserData('alt_no', input)
        setdisplayAltForm(false)

    }

    const handleEditSubmit = () => {
        getAltNo1(null)
        setdisplayAltForm(true)
        setInput('')
    }

    return (
        <div className="alt-no-cont">
            {displayAltForm ? (
                <form onSubmit={handleAddSubmit} className="alt-no-form">
                    <input
                        type="tel"
                        className={`alt-no-input ${error ? 'error' : ''}`}
                        pattern="[0-9]{10}"
                        maxLength="10"
                        value={input}
                        onChange={
                            updateInput
                        }
                    />
                    <button type="submit" className="add-btn">Add</button>
                </form>
            ) : (<button onClick={handleEditSubmit} className="add-btn edit-btn">Edit</button>)}
        </div>
    )
}
