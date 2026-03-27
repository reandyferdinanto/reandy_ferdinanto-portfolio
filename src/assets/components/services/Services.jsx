import React from "react";
import { BiBriefcase, BiBook } from "react-icons/bi";

const timelineData = [
  {
    id: 1,
    type: "career",
    title: "Project-based Intern: Backend Developer Virtual Internship",
    date: "February - March 2023",
    location: "Evermos & Rakamin",
    desc: "Developed inventory API using Golang and Fiber. Gained experience in managing and securing APIs and worked with MySQL.",
  },
  {
    id: 2,
    type: "career",
    title: "Switch Career Program - Backend Developer Bootcamp",
    date: "June - December 2022",
    location: "Dibimbing.id",
    desc: "Developed web platform back ends using NodeJS. Built APIs and data clients. Tested and documented with POSTMAN.",
  },
  {
    id: 3,
    type: "career",
    title: "Warehouse Supervisor & IT Support",
    date: "2018 - 2022",
    location: "PT. Expertest Kaliper Nusantara",
    desc: "Supervised daily warehouse operations. Maintained hardware & software. Assisted IT Supervisor with server remote troubleshooting.",
  },
  {
    id: 4,
    type: "education",
    title: "Bachelor of Information Systems",
    date: "2012 - 2017",
    location: "STMIK Dharma Putra",
    desc: "Studied Information Systems with a strong focus on Software Engineering, Database Administration, and Business Logic.",
  }
];

const Services = ({ timeline = [] }) => {
  const data = timeline.length > 0 ? timeline : timelineData;

  return (
    <section id="services">
      <h5>My Journey</h5>
      <h2>Career & Education</h2>

      <div className="container service__container">
        <div className="timeline">
          {data.map((item, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div key={item.id} className={`timeline__item ${isLeft ? 'left' : 'right'}`}>
                <div className="timeline__icon">
                  {item.type === 'career' ? <BiBriefcase /> : <BiBook />}
                </div>
                <div className="timeline__content">
                  <h3>{item.title}</h3>
                  <h4>{item.location}</h4>
                  <div className="timeline__date">{item.date}</div>
                  <p>{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
