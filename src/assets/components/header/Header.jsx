import React from "react";
import CTA from "./CTA";
import ME from "../../../assets/me_R.png";
import HeaderSocials from "./HeaderSocials";

const Header = ({ data = {} }) => {
  return (
    <header>
      <div className="container header__container">
        <div className="header__content">
          <div className="header__text">
            <span className="header__badge">
              {data.greeting || "Hello I'm"} 👋
            </span>
            <h1 className="header__name">
              {data.name || 'Reandy Ferdinanto'}
            </h1>
            <h2 className="header__role">
              {data.role || 'Fullstack Web Developer'}
            </h2>
            <p className="header__tagline">
              Building scalable backend systems & crafting modern web experiences
            </p>
            <CTA />
            <HeaderSocials />
          </div>

          <div className="header__photo">
            <div className="header__photo-ring">
              <div className="header__photo-inner">
                <img src={ME.src} alt={data.name || 'Reandy Ferdinanto'} />
              </div>
            </div>
            <div className="header__photo-dot header__photo-dot--1"></div>
            <div className="header__photo-dot header__photo-dot--2"></div>
            <div className="header__photo-dot header__photo-dot--3"></div>
          </div>
        </div>

        <a href="#about" className="scroll__down">
          Scroll Down ↓
        </a>
      </div>
    </header>
  );
};

export default Header;
