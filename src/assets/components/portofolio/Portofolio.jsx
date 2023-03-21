import React from "react";
import "./portofolio.css";
import { SiPostman } from "react-icons/si";
import { BsGithub } from "react-icons/bs";
import IMG1 from "../../../assets/portfolio1_r.jpg";
import IMG2 from "../../../assets/portfolio2_r.jpg";
import IMG3 from "../../../assets/portfolio3_r.jpg";

const data = [
  {
    id: 1,
    image: IMG1,
    title: "Virtual ATM transaction with CLI (NodeJS)",
    github: "https://github.com/reandyferdinanto/ATM-simulation.git",
    demo: "https://github.com",
    credit: "starline on Freepik",
    credit_url:
      "https://www.freepik.com/free-vector/credit-card-going-inside-mobile-digital-transaction-concept_22535508.htm#query=atm%20code%20dark&position=1&from_view=search&track=ais",
  },
  {
    id: 2,
    image: IMG2,
    title: "Recipe Sharing API (BackEnd - ExpressJS MySQL)",
    github: "https://github.com",
    demo: "https://github.com",
    credit: "Freepik",
    credit_url:
      "https://www.freepik.com/free-psd/brunch-restaurant-design-landing-page_7247926.htm#query=recipe%20web%20dark%20code%20only&position=7&from_view=search&track=ais",
  },
  {
    id: 3,
    image: IMG3,
    title: "Suggestion for Users to Get Nearest Restaurant",
    github: "https://github.com",
    demo: "https://github.com",
    credit: "WangXiNa on Freepik",
    credit_url:
      "https://www.freepik.com/free-vector/map-point-abstract-3d-polygonal-wireframe-airplane-blue-night-sky-with-dots-stars-illustration-background_24126470.htm#query=gps%20navigation%20dark&position=8&from_view=search&track=ais",
  },
];

const Portofolio = () => {
  return (
    <section id="portofolio">
      <h5>My Recent Work</h5>
      <h2>Portfolio</h2>
      <div className="container portfolio__container">
        {data.map(({ id, image, title, github, demo, credit, credit_url }) => {
          return (
            <article key={id} className="portfolio__item">
              <div className="portfolio__item-image">
                <img src={image} alt={title} />
                <div>
                  <h3>{title}</h3>
                  <div className="portfolio__item-cta">
                    <a
                      href={demo}
                      className="btn btn-primary"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <SiPostman className="portfolio__item-icon" />
                      Postman
                    </a>
                    <a
                      href={github}
                      className="btn"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <BsGithub className="portfolio__item-icon" />
                      Github
                    </a>
                  </div>
                </div>
              </div>
              <div className="image-credit">
                <span className="credit-text">
                  Image by{" "}
                  <a
                    href={credit_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {credit}
                  </a>
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Portofolio;
