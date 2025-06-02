import './Choose-us-cont.css';
import ChooseCont from './Choose-us.jsx';

import choose1 from '../../assets/choose-1.jpg';
import choose2 from '../../assets/choose-2.jpg';
import choose3 from '../../assets/choose-3.jpg';
import choose4 from '../../assets/choose-4.png';

let chooseUs = [
    { img: choose1, head: 'Reliable', desc: 'Vision diagnostic centre was established in 2000 with the sole purpose of providing reliable diagnostic services to our patients at affordable costs.' },
    { img: choose2, head: 'Affordable', desc: 'Vision diagnostics was established to provide reliable diagnostic services while catering to not just the affluent but to all strata of society.' },
    { img: choose3, head: 'Ethical', desc: 'At Vision we believe in maintaining the sanctity of the medical profession. We take pride in not providing referrals and kickbacks to any of our doctors.' },
    { img: choose4, head: 'Accurate Reports', desc: 'We use cutting-edge technology and rigorous quality control to deliver highly accurate diagnostic results.' },
]

export default function ChooseUsCont() {

    return (
        <div className="choose-us-cont">
            <h2>Why Choose Us </h2>
            <ChooseCont choose={chooseUs} />
        </div>
    )
}