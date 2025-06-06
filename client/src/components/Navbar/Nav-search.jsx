import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import './Nav-search.css';

export default function NavSearch() {

    let [search, setSearch] = useState('');
    const navigate = useNavigate();

    let handleSearchChange = (e) => {
        setSearch(e.target.value);
    }

    let handleSubmit = (e) => {
        e.preventDefault();
        if (search.trim()) {
            navigate(`/search/tests?q=${search}`);
        }
    }

    return (
        <div className="nav-search">
            <form action="" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={search}
                    placeholder='Search tests'
                    onChange={handleSearchChange} />
                <Button
                    type='submit'
                    variant="contained"
                    color="success"
                    size="large">
                    Search
                </Button>
            </form>
        </div>
    )
}