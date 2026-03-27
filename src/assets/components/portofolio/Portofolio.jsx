import React from "react";
import { SiPostman } from "react-icons/si";
import { BsGithub } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";
import IMG1 from "../../../assets/portfolio1_r.jpg";
import IMG2 from "../../../assets/portfolio2_r.jpg";
import IMG3 from "../../../assets/portfolio3_r.jpg";

const defaultData = [
  {
    id: 1,
    image: IMG1.src,
    title: "Virtual ATM transaction with CLI (NodeJS)",
    github_url: "https://github.com/reandyferdinanto/ATM-simulation.git",
    demo_url: "#contact",
    image_credit: "starline on Freepik",
    image_credit_url: "https://www.freepik.com/free-vector/credit-card-going-inside-mobile-digital-transaction-concept_22535508.htm",
  },
  {
    id: 2,
    image: IMG2.src,
    title: "Recipe Sharing API (BackEnd - ExpressJS MySQL)",
    github_url: "https://github.com/reandyferdinanto/recipeSharing.git",
    demo_url: "https://documenter.getpostman.com/view/23401470/2s8Z6yXCpr",
    image_credit: "Freepik",
    image_credit_url: "https://www.freepik.com/free-psd/brunch-restaurant-design-landing-page_7247926.htm",
  },
  {
    id: 3,
    image: IMG3.src,
    title: "Suggestion for Users to Get Nearest Restaurant",
    github_url: "https://github.com/reandyferdinanto/foodBankProject.git",
    demo_url: "https://documenter.getpostman.com/view/23401470/2s93JtPiMd",
    image_credit: "WangXiNa on Freepik",
    image_credit_url: "https://www.freepik.com/free-vector/map-point-abstract-3d-polygonal-wireframe-airplane-blue-night-sky-with-dots-stars-illustration-background_24126470.htm",
  },
];

const localImages = [IMG1.src, IMG2.src, IMG3.src];

const Portofolio = ({ projects = [] }) => {
  const items = projects.length > 0 ? projects : defaultData;

  return (
    <section id="portofolio">
      <h5>My Recent Work</h5>
      <h2>Portfolio</h2>
      <div className="container portfolio__container">
        {items.map((item, index) => {
          const image = item.image || item.image_url || localImages[index] || localImages[0];
          const title = item.title;
          const github = item.github_url || item.github;
          const demo = item.demo_url || item.demo;
          const credit = item.image_credit || item.credit;
          const creditUrl = item.image_credit_url || item.credit_url;

          return (
            <article key={item.id || index} className="portfolio__item">
              <div className="portfolio__item-image">
                <img src={image} alt={title} />
                <div className="portfolio__item-overlay">
                  <a href={github} className="portfolio__overlay-btn" target="_blank" rel="noreferrer" title="View Code">
                    <BsGithub />
                  </a>
                  <a href={demo} className="portfolio__overlay-btn" target="_blank" rel="noreferrer" title="Live Demo">
                    <FiExternalLink />
                  </a>
                </div>
              </div>
              <div className="portfolio__item-body">
                <h3>{title}</h3>
                <div className="portfolio__item-cta">
                  <a href={demo} className="portfolio__link" target="_blank" rel="noreferrer">
                    <SiPostman /> Postman
                  </a>
                  <a href={github} className="portfolio__link" target="_blank" rel="noreferrer">
                    <BsGithub /> Github
                  </a>
                </div>
                {credit && (
                  <div className="portfolio__credit">
                    Image by{" "}
                    <a href={creditUrl} target="_blank" rel="noopener noreferrer">
                      {credit}
                    </a>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Portofolio;
