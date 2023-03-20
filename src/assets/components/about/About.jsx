import React from "react";
import "./about.css";
import ME from "../../../assets/about_me_R.jpg";
import { FaAward } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { VscFolderLibrary } from "react-icons/vsc";

const About = () => {
  return (
    <section id="about">
      <h5>Get To Know</h5>
      <h2>About Me</h2>

      <div className="container about__container">
        <div className="about__me">
          <div className="about__me-image">
            <img src={ME} alt="" />
          </div>
        </div>
        <div className="about__content">
          <div className="about__cards">
            <article className="about__card">
              <FaAward className="about__icon" />
              <h5>Experience</h5>
              <small>Switch career +1 year</small>
            </article>
            <article className="about__card">
              <FiUsers className="about__icon" />
              <h5>Clients</h5>
              <small>On Progress</small>
            </article>
            <article className="about__card">
              <VscFolderLibrary className="about__icon" />
              <h5>Projects</h5>
              <small>On Progress</small>
            </article>
          </div>
          <p>
            I am a passionate web developer with a background in warehousing,
            possessing valuable collaboration and teamwork skills. With a strong
            foundation in various programming languages and frameworks, I am
            dedicated to staying up-to-date with the latest web development
            trends. I am seeking opportunities to bring my creativity and drive
            to a team and contribute to the development of innovative web
            solutions.
          </p>

          <a href="#contact" className="btn btn-primary">
            Let's Talk
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
