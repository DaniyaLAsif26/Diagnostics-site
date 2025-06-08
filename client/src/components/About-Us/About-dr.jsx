import './About-dr.css';
import dr from '../../assets/dr.avif';

export default function AboutDr() {

    return (
        <div className="about-dr">
            <h2>Meet Dr. Irshad Ahmed</h2>
            <div className="desc">
                <div className="dr-img">
                    <img src={dr} alt="" />
                    <div className="dr-degre">MBBS, MD(osm) Pathology</div>
                </div>
                <div className="dr-desc">
                    Dr. Mohammad Irshad Ahmed, the son of the late Dr. Saleem Ahmed, now leads the center with a deep sense of purpose and responsibility. A highly qualified and compassionate medical professional, Dr. Irshad brings both modern medical knowledge and a strong ethical foundation to the center.

                    Under his leadership, the center has embraced the latest diagnostic technologies, streamlined patient care, and expanded its services—while staying true to the compassionate, patient-focused care his father envisioned. His mission is to make accurate and affordable diagnostics accessible to all, while ensuring a warm and trustworthy healthcare experience for every visitor.
                </div>
            </div>
        </div>
    )
}