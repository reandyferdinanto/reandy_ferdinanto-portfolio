import React from "react";
import "./services.css";
import { BiCheck } from "react-icons/bi";

const Services = () => {
  return (
    <section id="services">
      <h5>What I Offer</h5>
      <h2>Services</h2>

      <div className="container service__container">
        <article className="services">
          <div className="service__head">
            <h3>Mobile App - GlideApps</h3>
          </div>

          <ul className="service__list">
            <li>
              <BiCheck className="service__list-icon" />
              <p>1 Lorem, ipsum</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>2 Lorem, ipsum</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>3 Lorem, ipsum</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>4 Lorem, ipsum</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>5 Lorem, ipsum</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>6 Lorem, ipsum</p>
            </li>
          </ul>
        </article>

        {/* END OF WEBSITE DESIGN */}
        <article className="services">
          <div className="service__head">
            <h3>Web Development</h3>
          </div>

          <ul className="service__list">
            <li>
              <BiCheck className="service__list-icon" />
              <p>1 Lorem, ipsum</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>2 Lorem, ipsum</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>3 Lorem, ipsum</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>4 Lorem, ipsum</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>5 Lorem, ipsum</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>6 Lorem, ipsum</p>
            </li>
          </ul>
        </article>

        {/* END OF WEB DEVELOPMENT */}
        <article className="services">
          <div className="service__head">
            <h3>BackEnd Development </h3>
          </div>

          <ul className="service__list">
            <li>
              <BiCheck className="service__list-icon" />
              <p>1 Lorem, ipsum</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>2 Lorem, ipsum</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>3 Lorem, ipsum</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>4 Lorem, ipsum</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>5 Lorem, ipsum</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>6 Lorem, ipsum</p>
            </li>
          </ul>
        </article>

        {/* END OF BACKEND DEVELOPMENT */}
      </div>
    </section>
  );
};

export default Services;
