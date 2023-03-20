import React from "react";
import Header from "./assets/components/header/Header";
import Nav from "./assets/components/nav/Nav";
import About from "./assets/components/about/About";
import Experience from "./assets/components/experience/Experience";
import Services from "./assets/components/services/Services";
import Portofolio from "./assets/components/portofolio/Portofolio";
import Testimonials from "./assets/components/testimonials/Testimonials";
import Contact from "./assets/components/contact/Contact";
import Footer from "./assets/components/footer/Footer";

const App = () => {
  return (
    <>
      <Header />
      <Nav />
      <About />
      <Experience />
      <Services />
      <Portofolio />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
};

export default App;
