import React from "react";

const defaultFE = [
  { name: "HTML", level: 70 },
  { name: "CSS", level: 60 },
  { name: "Bootstrap", level: 55 },
  { name: "React JS", level: 50 },
];

const defaultBE = [
  { name: "Node JS", level: 80 },
  { name: "Go (Fiber)", level: 55 },
  { name: "MySQL", level: 65 },
  { name: "MongoDB", level: 50 },
];

const SkillBar = ({ name, level }) => (
  <div className="skill__item">
    <div className="skill__header">
      <span className="skill__name">{name}</span>
      <span className="skill__pct">{level}%</span>
    </div>
    <div className="skill__track">
      <div className="skill__fill" style={{ width: `${level}%` }}></div>
    </div>
  </div>
);

const Experience = ({ skills = [] }) => {
  const fe = skills.length > 0
    ? skills.filter(s => s.category === 'frontend').sort((a, b) => a.sort_order - b.sort_order)
    : defaultFE;
  const be = skills.length > 0
    ? skills.filter(s => s.category === 'backend').sort((a, b) => a.sort_order - b.sort_order)
    : defaultBE;

  return (
    <section id="experience">
      <h5>What Skills I Have</h5>
      <h2>My Skills</h2>

      <div className="container experience__container">
        <div className="skill__card">
          <div className="skill__card-header">
            <div className="skill__card-badge skill__card-badge--fe">FE</div>
            <h3>FrontEnd Development</h3>
          </div>
          <div className="skill__list">
            {fe.map((s) => (
              <SkillBar key={s.name} name={s.name} level={s.level} />
            ))}
          </div>
        </div>

        <div className="skill__card">
          <div className="skill__card-header">
            <div className="skill__card-badge skill__card-badge--be">BE</div>
            <h3>BackEnd Development</h3>
          </div>
          <div className="skill__list">
            {be.map((s) => (
              <SkillBar key={s.name} name={s.name} level={s.level} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
