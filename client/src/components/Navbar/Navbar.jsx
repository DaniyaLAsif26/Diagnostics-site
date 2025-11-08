import NavLogo from './Nav-logo';
import NavPhone from './Nav-phone';
import NavSearch from './Nav-search';
import NavLoc from './Nav-loc';
import NavTime from './Nav-time';
import NavSign from './Nav-sign';

import { useLogin } from '../../context/LoginContext';

import LocationPinIcon from '@mui/icons-material/LocationPin';
import Person2Icon from '@mui/icons-material/Person2';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import './Navbar.css';

import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const [navbarSize, setNavbarSize] = useState(window.innerWidth < 1090)
    const [removeSearch, setRemoveSearch] = useState(window.innerWidth < 665)

    const navigate = useNavigate()

    const { isloggedIn, toggleLoginForm } = useLogin()

    useEffect(() => {
        const handleResize = () => {
            setNavbarSize(window.innerWidth < 1090)
            setRemoveSearch(window.innerWidth < 665)
        }

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };

    }, [])

    const redirectMap = () => {
        window.open("https://www.google.com/maps/place/VISION+DIAGNOSTIC+CENTRE%7C+BloodTest+at+Home+%7C+Free+Home+Sample+Collection/@17.3594085,78.476408,1023m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3bcb982015555569:0x2ba2bc81d9dc7eda!8m2!3d17.3594085!4d78.476408!16s%2Fg%2F11hcs2qrvq?entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D",
            "_blank",
            "noopener,noreferrer"
        );
    }

    const redirectUser = () => {
        if (isloggedIn) {
            navigate('/user-profile')
        } else {
            toggleLoginForm()
        }
    }


    return (

        <nav className='navbar'>
            {navbarSize ?
                <>
                    <NavLogo />
                    {removeSearch ?
                        null
                        :
                        <NavSearch />}
                    <div className="navbar-right">

                        <LocationPinIcon onClick={redirectMap} />

                        <Person2Icon onClick={redirectUser} />
                        <ShoppingCartIcon onClick={()=> navigate('/cart-items')} />
                    </div>
                </>
                :
                <>
                    <NavLogo />
                    <NavPhone />
                    <NavSearch />
                    <NavLoc />
                    <NavTime />
                    <NavSign />

                </>
            }
        </nav>


    )
}