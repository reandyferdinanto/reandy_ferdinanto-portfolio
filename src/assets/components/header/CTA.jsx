import React from "react";
const CV = "/cv_reandy.pdf";

const CTA = () => {
  return (
    <div className="cta">
      <a href={CV} download className="neu-btn">
        Download CV
      </a>
      <a href="#contact" className="neu-btn neu-btn-accent">
        Let's Talk
      </a>
    </div>
  );
};

export default CTA;
