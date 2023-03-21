import React from "react";
import "./services.css";
import { BiCheck } from "react-icons/bi";

const Services = () => {
  return (
    <section id="services">
      <h5>Experience</h5>
      <h2>My Career</h2>

      <div className="container service__container">
        <article className="services">
          <div className="service__head">
            <h3>Project-based Intern: Backend Developer Vitual Internship</h3>
            <h5>February - March 2023</h5>
            <h4>Evermos - Rakamin </h4>
          </div>

          <ul className="service__list">
            <li>
              <BiCheck className="service__list-icon" />
              <p>Developed inventory API using Golang and Fiber</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>Gained experience in managing and securing APIs</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>Worked with MySQL and SQL queries to manage inventory data</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>Learned software development best practices from mentor</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>Added inventory API to portfolio to showcase skills</p>
            </li>
          </ul>
        </article>

        {/* END OF EVERMOS */}

        <article className="services">
          <div className="service__head">
            <h3>Switch Career Program - Backend Developer Bootcamp </h3>
            <h5>Juni - December 2022</h5>
            <h4>Dibimbing.id</h4>
          </div>

          <ul className="service__list">
            <li>
              <BiCheck className="service__list-icon" />
              <p>Developed web platform back ends using node.JS</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>Developed server-side logic in JavaScript</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>Built APIs and data clients to consume APIs</p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>Tested and documented with POSTMAN application</p>
            </li>
          </ul>
        </article>

        {/* END OF DIBIMBING */}

        <article className="services">
          <div className="service__head">
            <h3>Warehouse Supervisor & IT Support</h3>
            <h5>2018 - 2022 </h5>
            <h4>PT. Expertest Kaliper Nusantara</h4>
          </div>

          <ul className="service__list">
            <h4>Warehouse Supervisor</h4>
            <li>
              <BiCheck className="service__list-icon" />
              <p>
                Plan, organized, supervised, and participated in daily warehouse
                operation
              </p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>
                Supported production workers in meeting goals without
                compromising safety and compliance
              </p>
            </li>
            <h4>IT Support</h4>
            <li>
              <BiCheck className="service__list-icon" />
              <p>
                Installing, configuring, and maintaining hardware & software
              </p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>
                Assisting IT Supervisor with any troubleshooting on the server
                remotely
              </p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>
                Evaluate current hardware and software needs and identify
                opportunities for improvement
              </p>
            </li>
            <li>
              <BiCheck className="service__list-icon" />
              <p>
                Recommend and purchase new hardware and software solutions that
                meet the company's needs and budget
              </p>
            </li>
          </ul>
        </article>

        {/* END OF EKN */}
      </div>
    </section>
  );
};

export default Services;
