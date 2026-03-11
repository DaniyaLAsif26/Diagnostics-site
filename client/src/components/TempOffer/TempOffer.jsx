import { useState } from "react";
import "./temp-offer.css";

const tests = [
  "Complete Blood Picture", "Complete Urine Examination", "Blood Urea",
  "Creatinine", "eGFR", "Urine for Microalbumin"
];

export default function KidneyDayBanner() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="wdb-wrapper">
      <div
        className={`wdb-banner ${hovered ? "wdb-hovered" : ""}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Left: Occasion */}
        <div className="wdb-left">
          <span className="wdb-tag">🫘 World Kidney Day</span>
          <p className="wdb-sub">Dr Saleem Ahmed Memorial Vision Diagnostic Centre</p>
        </div>

        {/* Center: Offer */}
        <div className="wdb-center">
          <div className="wdb-offer-label">Essential CKD Screening Package</div>
          <div className="wdb-price">
            <span className="wdb-currency">₹</span>900
          </div>
          <div className="wdb-pills">
            {tests.map((t) => (
              <span key={t} className="wdb-pill">{t}</span>
            ))}
          </div>
        </div>

        {/* Right: CTA */}
        <div className="wdb-right">
          <a href="/health-packages/CKD-Screening" className="wdb-cta">Book Now</a>
        </div>

        {/* Decorative kidney shapes */}
        <div className="wdb-petal wdb-petal-1">🫘</div>
        <div className="wdb-petal wdb-petal-2">🫘</div>
      </div>
    </div>
  );
}