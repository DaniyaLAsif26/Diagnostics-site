import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLogin } from '../../context/LoginContext';
import { useTrigger } from '../../context/TriggerContext';

import UserForm from './UserForm';

const BackendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";


export default function UserDetailForm() {
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from || '/user-profile';

    const { userData, setAllUserData } = useLogin()
    const { triggerDataUpdate } = useTrigger()

    const [number, setNumber] = useState(userData.phone_no)
    const [userName, setUserName] = useState(userData.name)
    const [address, setAddress] = useState(userData.address)
    const [second_Number, setSecond_Number] = useState(userData.alt_no)
    const [errors, setErrors] = useState({})


    useEffect(() => {
        setNumber(userData.phone_no);
        setUserName(userData.name);
        setAddress(userData.address);
        setSecond_Number(userData.alt_no);
    }, [userData]);



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
            const res = await fetch(`${BackendURL}/api/user/edit`, {
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
                setAllUserData(data.user);

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
        <>
            <UserForm number={number} userName={userName} setUserName={setUserName} address={address} setAddress={setAddress} second_Number={second_Number} setSecond_Number={setSecond_Number} errors={errors} setErrors={setErrors} updateUserDetails={updateUserDetails} />
        </>
    )
}