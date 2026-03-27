import React from "react";
import Link from 'next/link';
const CV = "/cv_reandy.pdf";

const CTA = () => {
  return (
    <div className="cta">
      <a href={CV} download className="neu-btn">
        Download CV
      </a>
      <a href="#contact" className="neu-btn">
        Let's Talk
      </a>
      <Link href="/order" className="neu-btn neu-btn-accent">
        Order Web
      </Link>
    </div>
  );
};

export default CTA;
