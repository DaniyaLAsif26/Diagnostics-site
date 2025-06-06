import './Options.css';
import Kart from './Kart';

import { useNavigate } from 'react-router-dom';

export default function Options({ option }) {

    const navigate = useNavigate();

    return (
        <ul>
            {option.map((options) => (
                <li key={options.id} onClick={() => navigate(options.path)}>
                    {options.name}
                </li>
            ))}
            <Kart />

        </ul>
    );
}
