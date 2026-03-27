import React from "react";
import Head from "next/head";
import Header from "../assets/components/header/Header";
import Nav from "../assets/components/nav/Nav";
import About from "../assets/components/about/About";
import Experience from "../assets/components/experience/Experience";
import Services from "../assets/components/services/Services";
import Portofolio from "../assets/components/portofolio/Portofolio";
import Testimonials from "../assets/components/testimonials/Testimonials";
import Contact from "../assets/components/contact/Contact";
import Footer from "../assets/components/footer/Footer";
import { usePortfolioData } from "../lib/usePortfolioData";

const Home = () => {
  const { settings, skills, projects, certificates, contacts, timeline, loaded } = usePortfolioData();

  const header = settings.header || {};
  const about = settings.about || {};

  return (
    <>
      <Head>
        <title>{header.name || 'Reandy Ferdinanto'} | {header.role || 'BackEnd Developer'} Portfolio</title>
        <meta name="description" content={`Portfolio of ${header.name || 'Reandy Ferdinanto'} - ${header.role || 'BackEnd Developer'}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header data={header} />
      <Nav />
      <About data={about} />
      <Experience skills={skills} />
      <Services timeline={timeline} />
      <Portofolio projects={projects} />
      <Testimonials certificates={certificates} />
      <Contact contacts={contacts} />
      <Footer />
    </>
  );
};

export default Home;
