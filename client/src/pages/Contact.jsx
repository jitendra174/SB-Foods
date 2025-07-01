import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaFacebook, FaTwitter, FaEnvelope } from "react-icons/fa";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <motion.div
      className="min-h-screen bg-white text-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Hero Banner */}
      <motion.div
        className="relative h-[300px] sm:h-[400px] bg-cover bg-center mb-12 rounded-b-3xl overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80')",
        }}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl font-bold mb-2">Contact SB Foods</h1>
            <p className="text-lg">We'd love to hear from you. Let's make something delicious together!</p>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-start pb-16">
        {/* Left Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-red-600 mb-4">Let’s Connect</h2>
          <p className="text-gray-600 text-lg mb-6">
            Whether you're a food lover, restaurant partner, or just curious about our journey —
            reach out! We’re always open to new flavors and conversations.
          </p>
          <div className="flex gap-5 mt-6 text-xl">
            <a href="#" className="text-red-600 hover:text-red-800 transition"><FaInstagram /></a>
            <a href="#" className="text-blue-500 hover:text-blue-700 transition"><FaFacebook /></a>
            <a href="#" className="text-sky-500 hover:text-sky-700 transition"><FaTwitter /></a>
            <a href="mailto:hello@sbfoods.com" className="text-gray-600 hover:text-black transition"><FaEnvelope /></a>
          </div>
        </motion.div>

        {/* Right Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 space-y-4"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows="5"
            placeholder="Your Message"
            required
            className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
          ></textarea>
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white w-full py-3 rounded-full font-medium transition"
          >
            📩 Send Message
          </button>

          {submitted && (
            <p className="text-green-600 font-medium text-center">
              ✅ Message sent! We’ll get back to you soon.
            </p>
          )}
        </motion.form>
      </div>

      {/* Google Map */}
      <motion.div
        className="max-w-6xl mx-auto px-6 md:px-10 pb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl font-semibold text-red-600 mb-2 text-center">📍 Find Us</h3>
        <p className="text-gray-600 mb-4 text-center">SB Foods HQ, Food Plaza Street, Hyderabad, India</p>
        <div className="w-full h-72 rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="SB Foods Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.309278395029!2d78.4866822746777!3d17.441793501229665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9739edaf0b71%3A0xc5c0f42c6e099d52!2sEat%20India%20Company!5e0!3m2!1sen!2sin!4v1719220228250!5m2!1sen!2sin"
            width="100%"
            height="100%"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </motion.div>
    </motion.div>
  );
}
