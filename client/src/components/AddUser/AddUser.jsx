import './add-user.css'
import PhoneInput from 'react-phone-input-2';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

export default function AddUser() {
    const navigate = useNavigate()

    const [number, setNumber] = useState()
    const [name, setName] = useState()

    const addUser = async (e) => {
        e.preventDefault()

        if (!number || !name || number.length < 12) {
            return alert("Please Enter Valid Username and Number")
        }
        console.log(number, name)
        try {
            const res = await fetch('http://localhost:5000/api/user/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ number, name })
            })

            const data = await res.json()

            if (data.Success) {
                alert(data.message)
                setTimeout(() => {
                    navigate('/admin/dashboard')
                }, 260)
            } else {
                alert(data.message)
            }

        }
        catch (err) {
            console.log(err)
            alert('Something went wrong ,Please try again later')
        }

    }

    return (
        <div className="add-user">
            <button className="back-btn" onClick={() => navigate('/admin/dashboard')}>Back</button>
            <div className="add-user-head">
                <h3>Add a User</h3>
            </div>
            <div className="">
                <form onSubmit={addUser} className='add-user-form'>
                    <PhoneInput
                        className='input-field'
                        id='alt_phone_no'
                        country={'in'}
                        onlyCountries={['in']}
                        value={number}
                        onChange={(value) =>
                            setNumber(value)
                        }
                        countryCodeEditable={false}
                        disableDropdown={true}
                        containerStyle={{ width: '100%' }}
                    />
                    <input t
                        ype="text"
                        placeholder='Add name'
                        className='user-name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button
                        className='add-user-btn'
                        type='submit'
                    >Add User
                    </button>
                </form>
            </div>
        </div>
    )
}