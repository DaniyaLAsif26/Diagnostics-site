import NavLogo from './Nav-logo';
import NavPhone from './Nav-phone';
import NavSearch from './Nav-search';
import NavLoc from './Nav-loc';
import NavTime from './Nav-time';
import NavSign from './Nav-sign';
import './Navbar.css';


export default function Navbar() {

    return (
        <nav className='navbar'>
            <NavLogo />
            <NavPhone />
            <NavSearch />
            <NavLoc />
            <NavTime />
            <NavSign />
        </nav>
    )
}