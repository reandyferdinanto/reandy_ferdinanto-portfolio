import React from "react";
import "./footer.css";
import { FiInstagram } from "react-icons/fi";
import { BsLinkedin } from "react-icons/bs";

const Footer = () => {
  return (
    <footer>
      <a href="#" className="footer__logo">
        Reandy Ferdinanto
      </a>
      <ul className="permalinks">
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#experience">Experience</a>
        </li>
        <li>
          <a href="#services">Services</a>
        </li>
        <li>
          <a href="#portofolio">Portfolio</a>
        </li>
        <li>
          <a href="#testimonials">Testimonials</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>

      <div className="footer__socials">
        <a href="https://instagram.com/reandyferdinanto?igshid=N2JhNDIwYjc=">
          <FiInstagram />
        </a>
        <a href="https://www.linkedin.com/in/reandyf/">
          <BsLinkedin />
        </a>
      </div>

      <div className="footer__copyright">
        <small>&copy; All rights reserved</small>
      </div>
    </footer>
  );
};

export default Footer;
