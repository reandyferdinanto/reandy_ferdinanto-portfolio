import React from "react";
import { FiExternalLink, FiMonitor, FiCloud, FiCode, FiSmartphone } from "react-icons/fi";
import IMG4 from "../../../assets/dental-app.png";
import IMG5 from "../../../assets/harold-porto.png";
import IMG6 from "../../../assets/anomali-saham.png";

const defaultData = [
  {
    id: 4,
    image: IMG4.src || IMG4,
    title: "Dental Appointment System",
    technologies: "React, Web App",
    demo_url: "https://drg-bunga-appointment.vercel.app/",
  },
  {
    id: 5,
    image: IMG5.src || IMG5,
    title: "Harold Portfolio",
    technologies: "React, Web App",
    demo_url: "https://harold-porto-2026.vercel.app/",
  },
  {
    id: 6,
    image: IMG6.src || IMG6,
    title: "Cerita Saham Dashboard",
    technologies: "React, Web App",
    demo_url: "https://ceritasaham-dashboard.my.id/",
  }
];

const CategoryPlaceholder = ({ category }) => {
  let Icon = FiMonitor;
  let label = "Portfolio Project";

  if (category === 'saas') {
    Icon = FiCloud;
    label = "SaaS / Platform";
  } else if (category === 'appscript') {
    Icon = FiCode;
    label = "AppScript / Code";
  } else if (category === 'other') {
    Icon = FiSmartphone;
    label = "Application";
  }

  return (
    <div className="portfolio__category-placeholder">
      <div className="portfolio__category-icon"><Icon /></div>
      <span>{label}</span>
    </div>
  );
};

const localImages = [IMG4.src || IMG4, IMG5.src || IMG5, IMG6.src || IMG6];

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
          const techString = item.technologies || item.tech || "";
          const techList = techString ? techString.split(",").map(t => t.trim()).filter(Boolean) : [];
          const demo = item.demo_url || item.demo;
          const credit = item.image_credit || item.credit;
          const creditUrl = item.image_credit_url || item.credit_url;

          const category = item.category || 'other';

          return (
            <article key={item.id || index} className="portfolio__item">
              <div className="portfolio__item-image-container">
                <div className="portfolio__item-image-flipper">
                  <div className="portfolio__item-image-front">
                    <CategoryPlaceholder category={category} />
                  </div>
                  <div className="portfolio__item-image-back">
                    <img src={image} alt={title} />
                    <div className="portfolio__item-overlay">
                      <a href={demo} className="portfolio__overlay-btn" target="_blank" rel="noreferrer" title="Live Demo">
                        <FiExternalLink />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="portfolio__item-body">
                <h3>{title}</h3>
                
                {techList.length > 0 && (
                  <div className="portfolio__tags">
                    {techList.map((tag, i) => (
                      <span key={i} className="portfolio__tag">{tag}</span>
                    ))}
                  </div>
                )}

                <div className="portfolio__item-cta">
                  <a href={demo} className="portfolio__link" target="_blank" rel="noreferrer">
                    <FiExternalLink /> Live Demo
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
