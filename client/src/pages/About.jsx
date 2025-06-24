import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white text-gray-800 min-h-screen px-6 py-12 sm:px-12 lg:px-24">
      {/* Hero Section with Background */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative text-center mb-20 h-[300px] sm:h-[400px] bg-cover bg-center rounded-2xl overflow-hidden shadow-xl"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1606756790138-261d2b21cd75?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="px-6 text-white">
            <h1 className="text-3xl sm:text-5xl font-bold mb-4">
              Serving Happiness, One Bite at a Time 🍴
            </h1>
            <p className="text-lg max-w-2xl mx-auto">
              Discover local flavors, order with ease, and enjoy fast delivery — anytime, anywhere.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Our Mission */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <h2 className="text-2xl font-bold mb-4 text-orange-500">🚀 Our Mission</h2>
        <p className="text-gray-700 leading-relaxed max-w-4xl">
          We believe food brings people together. Our mission is to simplify your food journey — from discovery to doorstep —
          by partnering with passionate restaurants and delivering authentic flavors fast, safe, and fresh.
        </p>
      </motion.div>

      {/* Story */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <h2 className="text-2xl font-bold mb-4 text-orange-500">📖 Our Story</h2>
        <p className="text-gray-700 leading-relaxed max-w-4xl">
          It all started with a late-night craving. Our founder, a techie with a passion for biryani, realized how hard it was
          to find reliable delivery from local gems. So we built SB Foods — a platform to spotlight authentic, local kitchens
          and offer food lovers a fast and reliable way to eat what they love. Built by foodies, for foodies.
        </p>
      </motion.div>

      {/* Why Choose Us */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <h2 className="text-2xl font-bold mb-6 text-orange-500 text-center">🌟 Why Choose Us</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {[
            { icon: "📍", title: "Local Favorites", desc: "Discover real local food, not just big chains." },
            { icon: "⚡", title: "Fast Delivery", desc: "No more long waits. Hot food, fast lanes." },
            { icon: "🛡️", title: "Safe & Hygienic", desc: "Partners meet strict hygiene standards." },
            { icon: "🎯", title: "Simple to Use", desc: "Browse → Order → Enjoy — it's that easy." },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md"
            >
              <div className="text-3xl mb-2">{item.icon}</div>
              <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mt-20"
      >
        <h2 className="text-3xl font-bold mb-4 text-orange-600">
          Hungry already?
        </h2>
        <p className="text-gray-700 mb-6">Start your flavor journey now — discover restaurants near you.</p>
        <button
          onClick={() => navigate("/restaurants")}
          className="bg-primary hover:bg-orange-600 text-white px-6 py-3 rounded-full font-medium transition"
        >
          🍔 View All Restaurants
        </button>
      </motion.div>
    </div>
  );
};

export default About;
