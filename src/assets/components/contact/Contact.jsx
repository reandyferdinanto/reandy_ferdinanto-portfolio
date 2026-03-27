import React from "react";
import { MdOutlineEmail } from "react-icons/md";
import { TbBrandTelegram } from "react-icons/tb";
import { BsWhatsapp, BsTelephone } from "react-icons/bs";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const iconMap = {
  email: MdOutlineEmail,
  whatsapp: BsWhatsapp,
  telegram: TbBrandTelegram,
  phone: BsTelephone,
};

const defaultContacts = [
  { type: 'email', label: 'Email', value: 'reandyferdinanto@gmail.com', link: 'mailto:reandyferdinanto@gmail.com' },
  { type: 'whatsapp', label: 'Whatsapp', value: '+62 813 15 341 342', link: 'https://wa.me/+6281313797880' },
  { type: 'telegram', label: 'Telegram', value: '@reandyF', link: 'https://t.me/reandyF' },
];

const Contact = ({ contacts = [] }) => {
  const form = useRef();
  const [sent, setSent] = useState(false);
  const items = contacts.length > 0 ? contacts : defaultContacts;

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm(
      "service_2kvruth",
      "template_9p74jwh",
      form.current,
      "J4KVsF4QyAP9jySCX"
    );
    e.target.reset();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact">
      <h5>Get In Touch</h5>
      <h2>Contact Me</h2>

      <div className="container contact__wrapper">
        {/* Contact channels row */}
        <div className="contact__channels">
          {items.map((c, i) => {
            const IconComp = iconMap[c.type] || MdOutlineEmail;
            return (
              <a
                key={c.id || i}
                href={c.link}
                className="contact__channel"
                target="_blank"
                rel="noreferrer"
              >
                <div className="contact__channel-icon">
                  <IconComp />
                </div>
                <div className="contact__channel-info">
                  <h4>{c.label}</h4>
                  <span>{c.value}</span>
                </div>
              </a>
            );
          })}
        </div>

        {/* Form card */}
        <div className="contact__form-card">
          <h3 className="contact__form-title">Send me a message</h3>
          <p className="contact__form-subtitle">
            Have a project in mind or want to collaborate? Drop me a message and I'll get back to you as soon as possible.
          </p>
          <form ref={form} onSubmit={sendEmail}>
            <div className="contact__form-row">
              <div className="contact__input-group">
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="contact__input-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>
            <div className="contact__input-group">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Tell me about your project..."
                required
              ></textarea>
            </div>
            <button type="submit" className={`contact__submit-btn ${sent ? 'contact__submit-btn--sent' : ''}`}>
              {sent ? '✓ Message Sent!' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
