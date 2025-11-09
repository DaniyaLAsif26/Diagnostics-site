import './About-dr.css';
import dr from '../../assets/dr.avif';

export default function AboutDr() {

    return (
        <div className="about-dr">
            <h2>Meet Dr. Mohammed Irshad Ahmed</h2>
            <div className="desc">
                <div className="dr-img">
                    <img src={dr} alt="Dr. Mohammed Irshad Ahmed" />
                    <div className="dr-degre">
                        <p> MBBS, MD (Osmania) Pathology, </p>
                        <p> Professor of Pathology,</p>
                        <p> Senior Pathologist.</p>
                    </div>
                </div>

                <div className="dr-desc">
                    <b>Dr. Mohammed Irshad Ahmed</b> leads the centre with a deep sense of purpose and responsibility.
                    A highly qualified and compassionate medical professional, he combines modern medical expertise
                    with a strong ethical foundation to guide the centre’s growth and operations.

                    <p>
                        Under his leadership, Vision Diagnostic Centre has adopted the latest diagnostic technologies,
                        streamlined patient care, and expanded its services — all while staying true to the compassionate,
                        patient-focused values envisioned by his father. His mission is to make accurate and affordable diagnostics
                        accessible to all, while ensuring a warm and trustworthy healthcare experience for every patient.
                    </p>
                    <p>
                        Beyond his diagnostic expertise, Dr. Mohammed Irshad Ahmed has actively participated in numerous national
                        conferences and CME programs. He has also organized and overseen several health awareness initiatives
                        in and around the City of Hyderabad. He is a permanent member of the <b>Indian Medical Association</b>.
                    </p>
                </div>
            </div>
        </div>
    )
}
