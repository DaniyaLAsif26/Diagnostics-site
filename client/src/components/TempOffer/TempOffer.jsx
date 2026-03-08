import { useState } from "react";
import "./temp-offer.css";

const tests = [
  "Haemogram", "ESR & CUE", "Stool Routine & RBS",
  "Creatinine & TSH", "X-Ray Chest", "USG Abd & Pelvic", "Papsmear"
];

export default function WomensDayBanner() {
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
          <span className="wdb-tag">🌸 International Women's Day</span>
          <p className="wdb-sub">Dr Saleem Ahmed Memorial Vision Diagnostic Centre</p>
        </div>

        {/* Center: Offer */}
        <div className="wdb-center">
          <div className="wdb-offer-label">Well Women Checkup</div>
          <div className="wdb-price">
            <span className="wdb-currency">₹</span>1800
          </div>
          <div className="wdb-pills">
            {tests.map((t) => (
              <span key={t} className="wdb-pill">{t}</span>
            ))}
          </div>
        </div>

        {/* Right: CTA */}
        <div className="wdb-right">
          <a href="/health-packages/Well%20Women%20Check-up" className="wdb-cta">Book Now</a>
        </div>

        {/* Decorative petals */}
        <div className="wdb-petal wdb-petal-1">✿</div>
        <div className="wdb-petal wdb-petal-2">✾</div>
      </div>
    </div>
  );
}