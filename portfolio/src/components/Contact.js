import React, { useState } from "react";

const ContactForm = () => {
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    access_key: "48ee367a-5ec7-4e3b-abc6-2cb209719ebd"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (result.success) {
        setStatus("✅ Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          message: "",
          access_key: "48ee367a-5ec7-4e3b-abc6-2cb209719ebd"
        });
      } else {
        setStatus("❌ Failed to send. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("❌ An error occurred. Please try again later.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          required
          value={formData.message}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Send Message
        </button>
      </form>
      {status && (
        <p className="mt-4 text-sm text-gray-700 font-medium">{status}</p>
      )}
    </div>
  );
};

export default ContactForm;