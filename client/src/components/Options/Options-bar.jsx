import './Options-bar.css';
import Options from './Options';


import { v4 as uuidv4 } from 'uuid';

const options = [
  { id: uuidv4(), name: 'About Us' },
  { id: uuidv4(), name: 'Book a Test' },
  { id: uuidv4(), name: 'Home Sample Collection' },
  { id: uuidv4(), name: 'Health Packages' },
  { id: uuidv4(), name: 'Tests' },
  { id: uuidv4(), name: 'Download Reports' },
  { id: uuidv4(), name: 'Gallery' },
];

export default function OptionsBar() {

    return (
        <div className="options-bar">
            <Options option={options} />
        </div>
    )
}