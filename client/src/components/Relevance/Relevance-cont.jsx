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
    { img: blood, name: 'blood' },
    { img: diabetes, name: 'diabetes' },
    { img: heart, name: 'heart' },
    { img: infection, name: 'infection' },
    { img: kidney, name: 'kidney' },
    { img: liver, name: 'liver' },
    { img: lungs, name: 'lungs' },
    { img: stomach, name: 'stomach' },
    { img: thyroid, name: 'thyroid' },
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