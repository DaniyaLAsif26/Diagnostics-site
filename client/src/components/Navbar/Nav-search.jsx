import { useState } from 'react';
import Button from '@mui/material/Button';
import './Nav-search.css';

export default function NavSearch() {

let [search, setSearch] = useState('');

let handleSearchChange = (e) => {
    setSearch(e.target.value);
}

    return(
        <div className="nav-search">
                <form action="">
                    <input type="text" value={search} placeholder='Search tests' onChange={handleSearchChange}/>
                    <Button
                        variant="contained"
                        color="success"
                        size="large">
                        Search
                    </Button>
                </form>
            </div>
    )
}