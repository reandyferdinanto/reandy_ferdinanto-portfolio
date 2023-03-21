import React from "react";
import "./testimonials.css";
import AVTR1 from "../../../assets/cert1schoters.jpg";
import AVTR2 from "../../../assets/cert2dibimbing.jpg";
import AVTR3 from "../../../assets/cert3evermos.jpg";
// import AVTR4 from "../../../assets/avatar4.jpg";

// import Swiper core and required modules
import { Pagination } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const data = [
  {
    avatar: AVTR1,
    name: "Shoters - Business English Program",
    review:
      "For completing Bussiness English Program that held by Schoters on the September - October 2022 and has proved to be competent in English languange at the level B1 - Intermediate",
  },
  {
    avatar: AVTR2,
    name: "Dibimbing.id - Back-End Web Development ",
    review: "For successfully completing Back-End Web Development Bootcamp",
  },
  {
    avatar: AVTR3,
    name: "Evermos | Rakamin - Project Based Intern: BackEnd Developer Virtual Internship",
    review:
      "For successfully completing back end developer Virtual Internship Program from Evermos",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials">
      <h5>My Achievements</h5>
      <h2>Certificate</h2>

      <Swiper
        className="container testimonials__container"
        // install Swiper modules
        modules={[Pagination]}
        spaceBetween={40}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
      >
        {data.map(({ avatar, name, review }, index) => {
          return (
            <SwiperSlide key={index} className="testimonial">
              <div className="client__avatar">
                <img src={avatar} alt="" />
              </div>
              <div>
                <h5 className="client__name">{name}</h5>
                <small className="client__review">{review}</small>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default Testimonials;
