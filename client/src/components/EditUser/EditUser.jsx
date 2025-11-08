import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

import { useTrigger } from '../../context/TriggerContext';

import UserForm from '../UserDetails/UserForm';

import './edit-user.css'

export default function EditForm() {

    const { id } = useParams()

    const navigate = useNavigate();
    const location = useLocation();

    const { triggerDataUpdate } = useTrigger()

    const from = location.state?.from || '/admin/dashboard';

    const [number, setNumber] = useState('')
    const [userName, setUserName] = useState('')
    const [address, setAddress] = useState('')
    const [second_Number, setSecond_Number] = useState('')
    const [errors, setErrors] = useState({})

    useEffect(() => {
        const getEditUser = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/user/search/${id}`)

                const data = await res.json()
                console.log(data.user)

                if (data.Success === true) {
                    setNumber(String(data.user.number));
                    setUserName(data.user.name);
                    setAddress(data.user.address);
                    setSecond_Number(String(data.user.second_number));
                }
            }
            catch (err) {
                console.log(err.message)
            }

        }
        getEditUser()
    }, [])



    const validate = () => {
        const newErrors = {}

        if (!userName.trim()) newErrors.name = "Name is required"
        if (!second_Number) {
            newErrors.alt_no = "Alternate phone is required"
        } else if (!/^\d{12}$/.test(second_Number)) {
            newErrors.alt_no = "Alternate phone must be 10 digits"
        }
        if (!address.trim() || address.trim() == null) newErrors.address = "Address is required"

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const updateUserDetails = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        const updateUserData = {
            number,
            userName,
            address,
            second_Number
        };

        try {
            const res = await fetch("http://localhost:5000/api/user/edit", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(updateUserData)
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();

            if (data.Success === true) {

                triggerDataUpdate('USER_UPDATED');

                requestAnimationFrame(() => {
                    setTimeout(() => {
                        navigate(from, { replace: true });
                    }, 50);
                });
            } else {
                console.error('Update failed:', data.message || 'Unknown error');
                navigate('/home');
            }
        } catch (error) {
            console.error('Failed to update user details:', error);
        }
    };

    return (
        <div className="edit-form-cont">
            <button className='back-btn' onClick={()=> navigate('/admin/dashboard')}>Back</button>

            <UserForm number={number} userName={userName} setUserName={setUserName} address={address} setAddress={setAddress} second_Number={second_Number} setSecond_Number={setSecond_Number} errors={errors} setErrors={setErrors} updateUserDetails={updateUserDetails} />
        </div>


    )
}