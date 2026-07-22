import React from "react";
import { BiBriefcase, BiBook } from "react-icons/bi";

const timelineData = [
  {
    id: 1,
    type: "career",
    title: "Full Stack Web Development",
    date: "January 2024 - Present",
    location: "PT Eluon",
    desc: "Contributed to SaaS solutions, developed advertising platforms (MyAds DSP/SSP), and built PMS. Utilized TypeScript, JavaScript, and collaborated with cross-functional teams.",
  },
  {
    id: 2,
    type: "career",
    title: "Full Stack Web Development Trainee",
    date: "July 2023 - September 2023",
    location: "PT Phincon",
    desc: "Developed websites using React.js, Next.js, and TypeScript. Implemented Redux Saga and conducted testing with Jest.",
  },
  {
    id: 3,
    type: "career",
    title: "Project-Based Intern: Backend Developer",
    date: "February 2023 - March 2023",
    location: "Evermos",
    desc: "Developed inventory API using Golang and Fiber. Managed and secured APIs, and worked with MySQL and SQL queries.",
  },
  {
    id: 4,
    type: "education",
    title: "Backend Web Development Bootcamp",
    date: "June 2022 - December 2022",
    location: "Dibimbing.id",
    desc: "Developed web platform backends using Node.js and JavaScript. Built and tested APIs using Postman.",
  },
  {
    id: 5,
    type: "career",
    title: "Warehouse Supervisor, IT Support & Purchasing",
    date: "August 2012 - May 2022",
    location: "PT. Expertest Kaliper Nusantara",
    desc: "Supervised warehouse operations, maintained hardware & software, and evaluated hardware needs. Handled purchasing and negotiated contracts.",
  },
  {
    id: 6,
    type: "education",
    title: "Bachelor Degree in Mechanical Engineering",
    date: "June 2007 - July 2012",
    location: "Universitas Trisakti",
    desc: "Laboratory Assistance for a Visual 3D Drawing using Catia V5 Software. Graduated with GPA 3.26/4.00.",
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
