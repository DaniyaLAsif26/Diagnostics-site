import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import './Nav-search.css';

export default function NavSearch({ onSideSearch }) {

    let [search, setSearch] = useState('');
    const navigate = useNavigate();

    let handleSearchChange = (e) => {
        setSearch(e.target.value);
    }

    let handleSubmit = (e) => {
        e.preventDefault();
        if (search.trim()) {
            navigate(`/search?q=${search}`);
            if (onSideSearch) {
                onSideSearch();
            }
        }
    }

    return (
        <div className="nav-search nav-space">
            <form action="" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={search}
                    placeholder='Search tests'
                    onChange={handleSearchChange} />
                <button type='submit' className='search-btn'>
                    <SearchIcon />
                </button>
            </form>
        </div>
    )
}