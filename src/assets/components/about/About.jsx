import React from "react";
import ME from "../../../assets/about_me_R.png";
import { FaAward } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { VscFolderLibrary } from "react-icons/vsc";

const iconMap = {
  award: FaAward,
  users: FiUsers,
  folder: VscFolderLibrary,
};

const defaultStats = [
  { icon: 'award', label: 'Experience', value: '1+ Year' },
  { icon: 'users', label: 'Clients', value: 'In Progress' },
  { icon: 'folder', label: 'Projects', value: '3+ Done' },
];

const defaultParagraphs = [
  'I am a passionate web developer with a background in warehousing, possessing valuable collaboration and teamwork skills. With a strong foundation in various programming languages and frameworks, I am dedicated to staying up-to-date with the latest web development trends.',
  'I am seeking opportunities to bring my creativity and drive to a team and contribute to the development of innovative web solutions.',
];

const defaultHighlights = [
  'Career switch from warehousing to tech',
  'BackEnd specialist (Node.js, Go, MySQL)',
  'Always learning new technologies',
];

const About = ({ data = {} }) => {
  const title = data.title || 'Who am I?';
  const paragraphs = data.paragraphs || defaultParagraphs;
  const highlights = data.highlights || defaultHighlights;
  const stats = data.stats || defaultStats;

  return (
    <section id="about">
      <h5>Get To Know</h5>
      <h2>About Me</h2>

      <div className="container about__container">
        {/* Left: Photo + Stats */}
        <div className="about__left">
          <div className="about__me-image">
            <img src={data.image_url || ME.src} alt="About Me" />
          </div>
          <div className="about__stats">
            {stats.map((s, i) => {
              const IconComp = iconMap[s.icon] || FaAward;
              return (
                <div key={i} className="about__stat">
                  <div className="about__stat-icon">
                    <IconComp />
                  </div>
                  <div className="about__stat-info">
                    <h4>{s.label}</h4>
                    <span>{s.value}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Bio */}
        <div className="about__right">
          <div className="about__bio-card">
            <h3>{title}</h3>
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <div className="about__highlights">
              {highlights.map((h, i) => (
                <div key={i} className="about__highlight">
                  <span className="about__highlight-dot"></span>
                  {h}
                </div>
              ))}
            </div>
            <a href="#contact" className="neu-btn neu-btn-accent">
              Let's Talk
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
