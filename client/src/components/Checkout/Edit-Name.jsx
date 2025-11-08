import './Edit-Name.css'
import { useState } from 'react'
import {useLogin} from '../../context/LoginContext.jsx'

export default function EditName({ name, addBtn }) {

    const { updateUserData } = useLogin()


    const [nameValue, setNameValue] = useState(name)
    const [displayInput, setDisplayInput] = useState(true)

    const displayNoInput = (e) => {
        e.preventDefault()
        setDisplayInput(false)
        addBtn()
        if (nameValue.trim() !== '') {
        updateUserData('name', nameValue)

        } else {
        updateUserData('name', name)
        }
    }

    return (
        <>
            {
                displayInput && (
                    <>
                        <div className="edit-name-cont" >
                            < form onSubmit={displayNoInput} className='edit-name-form'>
                                <input type="text" value={nameValue} className='edit-name-input'
                                    onChange={(e) => setNameValue(e.target.value)} />
                                <button className="add-btn" type='submit'>Add</button>
                            </form >
                        </div >
                    </>
                )
            }
        </>
    )
}