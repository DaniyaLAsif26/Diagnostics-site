import './Options.css';
import Kart from './Kart';

export default function Options({ option }) {
    return (
        <ul>
            {option.map((options) => (
                <li key={options.id}>
                    <a href="">{options.name}
                    </a>
                </li>
            ))}
            <Kart />

        </ul>
    );
}
