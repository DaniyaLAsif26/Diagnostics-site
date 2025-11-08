import './Relevance-cont.css';
import Relevance from './Relevance.jsx';

const relevances = [
    { img: '/relevance-imgs/blood.svg', name: 'Blood' },
    { img: '/relevance-imgs/diabetes.webp', name: 'Diabetes' },
    { img: '/relevance-imgs/heart.webp', name: 'Heart' },
    { img: '/relevance-imgs/infection.webp', name: 'Infection' },
    { img: '/relevance-imgs/kidney.webp', name: 'Kidney' },
    { img: '/relevance-imgs/liver.webp', name: 'Liver' },
    { img: '/relevance-imgs/lungs.webp', name: 'Lungs' },
    { img: '/relevance-imgs/stomach.webp', name: 'Stomach' },
    { img: '/relevance-imgs/thyroid.webp', name: 'Thyroid' },
    { img: '/relevance-imgs/bone.webp', name: 'Bone' },
    { img: '/relevance-imgs/pregnancy.webp', name: 'Pregnancy' },
    { img: '/relevance-imgs/hormone.jpg', name: 'Hormone' },
    { img: '/relevance-imgs/cancer.webp', name: 'Cancer' },
    { img: '/relevance-imgs/fertility.webp', name: 'Fertility' },
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
    );
}
