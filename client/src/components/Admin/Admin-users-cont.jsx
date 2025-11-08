import { useEffect, useState } from 'react';
import AllItems from './AllUsers';

const BackendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export default function AllUsersCont() {
    const [allUsers, setAllUsers] = useState([]);
    const [message, setMessage] = useState('');
    const [id, setId] = useState('');

    const getUsers = async (searchQuery = '') => {
        try {
            const res = await fetch(`${BackendURL}/api/user/search?q=${searchQuery}`);
            const data = await res.json();

            if (data.Success === true) {
                setAllUsers(data.allUsers);
                setMessage('');
            } else {
                setAllUsers([]);
                setMessage(data.message || 'No Users found');
            }
        } catch (err) {
            console.log(err);
            setAllUsers([]);
            setMessage(err.message);
        }
    };

    // Initial load
    useEffect(() => {
        getUsers();
    }, []);

    // Search with debounce
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            getUsers(id);
        }, 400);

        return () => clearTimeout(delayDebounce);
    }, [id]);

    const tableHead = ['No', 'Number', 'Name'];

    const contHead = {
        heading: 'All Users',
        input: 'Search Users',
        button: 'Add User',
        searchInput: setId,
        add_btn_url: '/user/add'
    };

    return (
        <div className="all-users">
            <AllItems 
                data={allUsers} 
                head={tableHead} 
                columns={2} 
                contHead={contHead} 
                message={message} 
            />
        </div>
    );
}