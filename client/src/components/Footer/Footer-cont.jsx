import './Footer.css';
import FotLeft from './Fot-left.jsx';
import FotCenter from './Fot-center.jsx';
import FotRight from './Fot-right.jsx';
import Copyright from './Copyright.jsx';

import { v4 as uuidv4 } from 'uuid';

const links = [
    { id: uuidv4(), name: 'Home', href: '/' },
    { id: uuidv4(), name: 'About Us', href: 'about-us' },
    { id: uuidv4(), name: 'Book a Test', href: 'all-tests' },
    { id: uuidv4(), name: 'Health Packages', href: 'all-packages' },
    { id: uuidv4(), name: 'Tests', href: 'all-tests' },
    { id: uuidv4(), name: 'Download Reports', href: '/' },
    { id: uuidv4(), name: 'Privacy Policy', href: '/' },
    { id: uuidv4(), name: 'Gallery', href: 'gallery' },
    { id: uuidv4(), name: 'Admin Login', href: '/' }
];

export default function Fotter() {

    return (
        <footer>
            <FotLeft />
            <FotCenter link={links} />
            <FotRight />
        </footer>
    )
}