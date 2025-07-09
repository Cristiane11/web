import { useState } from 'react';
import { NavLink } from "react-router-dom";
import Nav from '../components/Nav';



function Contact() {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');

    const formData = new FormData(e.target);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (result.success) {
      setStatus("Thanks! Your message has been sent.");
      e.target.reset();
    } else {
      setStatus("Oops! Something went wrong.");
    }
  };

  return (
    <section className="contact-section container">
      <Nav/>
      <h2 className="section-title">Contact Me</h2>

      <form onSubmit={handleSubmit} className="contact-form">
        <input type="hidden" name="access_key" value="48ee367a-5ec7-4e3b-abc6-2cb209719ebd" />

        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" required />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" required />
        </div>

        <div className="form-group">
          <label>Message</label>
          <textarea name="message" rows="5" required></textarea>
        </div>

        <button type="submit" className="submit-button">Send Message</button>

        {status && <p className="form-status">{status}</p>}
      </form>
    </section>
  );
}

export default Contact;