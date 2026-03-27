import React from "react";
import AVTR1 from "../../../assets/cert1schoters.jpg";
import AVTR2 from "../../../assets/cert2dibimbing.jpg";
import AVTR3 from "../../../assets/cert3evermos.jpg";

import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const defaultData = [
  {
    avatar: AVTR1.src,
    name: "Schoters - Business English Program",
    review: "For completing Business English Program that held by Schoters on the September - October 2022 and has proved to be competent in English language at the level B1 - Intermediate",
  },
  {
    avatar: AVTR2.src,
    name: "Dibimbing.id - Back-End Web Development",
    review: "For successfully completing Back-End Web Development Bootcamp",
  },
  {
    avatar: AVTR3.src,
    name: "Evermos | Rakamin - Project Based Intern: BackEnd Developer Virtual Internship",
    review: "For successfully completing back end developer Virtual Internship Program from Evermos",
  },
];

const localAvatars = [AVTR1.src, AVTR2.src, AVTR3.src];

const Testimonials = ({ certificates = [] }) => {
  const items = certificates.length > 0 ? certificates : defaultData;

  return (
    <section id="testimonials">
      <h5>My Achievements</h5>
      <h2>Certificates</h2>

      <Swiper
        className="container testimonials__container"
        modules={[Pagination]}
        spaceBetween={40}
        slidesPerView={1}
        pagination={{ clickable: true }}
      >
        {items.map((item, index) => {
          const avatar = item.avatar || item.avatar_url || localAvatars[index] || localAvatars[0];
          const name = item.name;
          const review = item.review;

          return (
            <SwiperSlide key={item.id || index} className="testimonial">
              <div className="client__avatar">
                <img src={avatar} alt={name} />
              </div>
              <h5 className="client__name">{name}</h5>
              <small className="client__review">{review}</small>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default Testimonials;
