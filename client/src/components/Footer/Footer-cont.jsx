import './Footer.css';
import FotLeft from './Fot-left.jsx';
import FotCenter from './Fot-center.jsx';
import FotRight from './Fot-right.jsx';
import Copyright from './Copyright.jsx';

import { v4 as uuidv4 } from 'uuid';

const links = [
    { id: uuidv4(), name: 'Home' },
    { id: uuidv4(), name: 'About Us' },
    { id: uuidv4(), name: 'Book a Test' },
    { id: uuidv4(), name: 'Home Sample Collection' },
    { id: uuidv4(), name: 'Health Packages' },
    { id: uuidv4(), name: 'Tests' },
    { id: uuidv4(), name: 'Download Reports' },
    { id: uuidv4(), name: 'Privacy Policy' },
    { id: uuidv4(), name: 'Gallery' },
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