import './Options-bar.css';
import Options from './Options';


import { v4 as uuidv4 } from 'uuid';

const options = [
    { id: uuidv4(), name: 'Book a Test', path: '/all-tests' },
    { id: uuidv4(), name: 'Health Packages', path: '/all-packages' },
    { id: uuidv4(), name: 'Home Sample Collection', path: '/home-sample-collection' },
    { id: uuidv4(), name: 'Download Reports', path: '' },
    { id: uuidv4(), name: 'About Us', path: '/about-us' },
    { id: uuidv4(), name: 'Gallery', path: '/gallery' },
];

export default function OptionsBar() {

    return (
        <div className="options-bar">
            <Options option={options} />
        </div>
    )
}