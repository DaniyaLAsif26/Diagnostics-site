import './Relevance-cont.css';
import Relevance from './Relevance.jsx';

import blood from '../../assets/blood.svg'
import diabetes from '../../assets/diabetes.webp'
import heart from '../../assets/heart.webp'
import infection from '../../assets/infection.webp'
import kidney from '../../assets/kidney.webp'
import liver from '../../assets/liver.webp'
import lungs from '../../assets/lungs.webp'
import stomach from '../../assets/stomach.webp'
import thyroid from '../../assets/thyroid.webp'

const relevances = [
    { img: blood, name: 'Blood' },
    { img: diabetes, name: 'Diabetes' },
    { img: heart, name: 'Heart' },
    { img: infection, name: 'Infection' },
    { img: kidney, name: 'kidney' },
    { img: liver, name: 'Liver' },
    { img: lungs, name: 'Lungs' },
    { img: stomach, name: 'Stomach' },
    { img: thyroid, name: 'Thyroid' },
];

export default function RelevanceCont({ onRelevanceClick, selected }) {

    return (
        <div className="relevance-cont">
            <h2>Search by Relevance</h2>
            <Relevance
                relevance={relevances}
                onClick={onRelevanceClick}
                selected={selected}
            />
        </div>
    )
}