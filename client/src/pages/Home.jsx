import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { categoryIcons } from "../utils/categoryIcons";
import { motion } from "framer-motion";
import heroImg from "../assets/hero-food.jpg";
import qualityImg from "../assets/QualityFood.jpg";
import deliveryImg from "../assets/delivery.jpg";

const Home = () => {
  const [featuredRestaurants, setFeaturedRestaurants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/restaurants?limit=4`)
      .then((res) => res.json())
      .then((data) => setFeaturedRestaurants(data))
      .catch((err) => console.error("Error fetching featured restaurants", err));
  }, []);


  return (
    <div className="min-h-screen bg-orange-50 text-orange-900 font-sans">

      {/* Welcome Bar */}
      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-5 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold text-lg tracking-wide shadow-md"
      >
        👋 Welcome to <span className="font-bold">SB Foods – OrderOnTheGo</span>
      </motion.div>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 sm:px-16 py-16 max-w-7xl mx-auto gap-16">

        {/* Left Text */}
        <div className="flex-1 max-w-xl">
          <h1 className="text-5xl md:text-6xl font-extrabold text-orange-900 mb-8 leading-tight tracking-tight">
            Hungry? <br /> Order from SB Foods in minutes!
          </h1>
          <p className="text-lg md:text-xl font-semibold text-orange-700 mb-10 tracking-wide">
            🍔 <span className="font-bold">24/7 availability</span> · 🚀{" "}
            <span className="font-bold">Superfast 10-minute delivery</span> · 🍽️{" "}
            <span className="font-bold">500+ restaurants</span>
          </p>
          <button
            onClick={() => navigate("/restaurants")}
            className="bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 transition text-white px-10 py-4 rounded-full font-semibold text-lg shadow-xl transform hover:scale-105"
          >
            Browse Restaurants
          </button>
        </div>

        {/* Right Images */}
        <div className="flex space-x-8">
          {[qualityImg, deliveryImg, heroImg].map((src, idx) => (
            <motion.img
              key={idx}
              src={src}
              alt={`hero-img-${idx}`}
              className="w-52 h-52 rounded-full border-8 border-orange-100 shadow-2xl object-cover cursor-pointer hover:shadow-4xl transition-transform duration-300 ease-in-out"
              whileHover={{ scale: 1.15 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          ))}
        </div>
      </section>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-10 py-20 bg-orange-100 px-10 sm:px-20 max-w-7xl mx-auto">
        {Object.entries(categoryIcons).map(([name, icon]) => (
          <motion.div
            key={name}
            whileHover={{ scale: 1.15 }}
            className="flex flex-col items-center cursor-pointer"
            title={name}  
            onClick={() =>
              navigate({
                pathname: "/restaurants",
                search: `?category=${name.toLowerCase()}`,
              })
            }
          >
            <div className="w-28 h-28 rounded-full overflow-hidden shadow-lg border-4 border-orange-300 hover:border-orange-500 transition-all duration-300">
              <img src={icon} alt={name} className="w-full h-full object-cover" />
            </div>
            <p className="mt-4 text-lg font-semibold text-orange-700">{name}</p>
          </motion.div>
        ))}
      </div>

      {/* Featured Restaurants */}
      <section className="py-20 px-10 sm:px-20 bg-orange-200 max-w-7xl mx-auto rounded-xl shadow-lg">
        <h2 className="text-4xl font-extrabold text-orange-800 mb-16 text-center tracking-wider">
          🌟 Featured Restaurants
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
          {featuredRestaurants.map((res, idx) => (
            <motion.div
              key={res._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => navigate(`/restaurant/${res._id}`)}
              className="bg-orange-50 rounded-3xl shadow-md hover:shadow-2xl cursor-pointer overflow-hidden border border-orange-300"
            >
              <div className="relative overflow-hidden rounded-t-3xl">
                <img
                  src={res.image}
                  alt={res.name}
                  className="w-full h-52 object-cover transform hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-orange-900 mb-2">{res.name}</h3>
                <p className="text-sm font-medium text-orange-700 mb-1">{res.category}</p>
                <p className="text-sm text-orange-800">{res.location}</p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-orange-600 font-semibold text-lg">{res.price || '-'}</span>
                  <button
                    className="bg-gradient-to-r from-orange-600 to-orange-800 hover:from-orange-700 hover:to-orange-900 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/restaurant/${res._id}`);
                    }}
                  >
                    View Menu
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-20">
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => navigate("/restaurants")}
            className="bg-gradient-to-r from-orange-600 to-orange-800 text-white px-12 py-4 rounded-full font-semibold shadow-xl transition"
          >
            View All Restaurants
          </motion.button>
        </div>
      </section>

      {/* Why Choose SB Foods */}
      <section className="py-24 px-10 sm:px-20 bg-orange-100 max-w-7xl mx-auto rounded-xl shadow-lg mt-24">
        <h2 className="text-4xl font-extrabold text-orange-900 mb-16 text-center tracking-widest">
          🧑‍🍳 Why Choose SB Foods?
        </h2>

        <div className="grid md:grid-cols-3 gap-16 text-left text-orange-900">
          <div>
            <h3 className="text-2xl font-bold mb-3">🚀 Instant Delivery</h3>
            <p className="text-lg font-medium text-orange-700">
              Get your food delivered in just 10 minutes!
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-3">🏆 Top Restaurants</h3>
            <p className="text-lg font-medium text-orange-700">
              We partner with the best restaurants in town.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-3">🔐 Secure Payments</h3>
            <p className="text-lg font-medium text-orange-700">
              Pay safely using cards, UPI, or wallets.
            </p>
          </div>
        </div>
      </section>

      {/* Order in 3 Steps */}
      <section className="py-24 px-10 sm:px-20 bg-orange-200 max-w-7xl mx-auto rounded-xl shadow-lg mt-24">
        <h2 className="text-4xl font-extrabold text-orange-900 mb-16 text-center tracking-widest">
          📍 Order in 3 Easy Steps
        </h2>

        <div className="grid md:grid-cols-3 gap-16 text-orange-900">
          {[
            {
              step: "1",
              title: "Choose Restaurant",
              desc: "Pick from 500+ restaurants.",
            },
            {
              step: "2",
              title: "Add to Cart",
              desc: "Select your favorite dishes.",
            },
            {
              step: "3",
              title: "Track Order",
              desc: "Get real-time delivery updates.",
            },
          ].map(({ step, title, desc }) => (
            <div key={step} className="text-center">
              <div className="text-6xl font-extrabold text-orange-600 mb-5">{step}</div>
              <h3 className="text-2xl font-bold mb-3">{title}</h3>
              <p className="text-lg font-medium text-orange-700 max-w-xs mx-auto">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Festive Offers */}
      <section className="py-24 px-10 sm:px-20 bg-orange-100 max-w-7xl mx-auto rounded-xl shadow-lg mt-24 mb-24">
        <h2 className="text-4xl font-extrabold text-orange-900 mb-16 text-center tracking-widest">
          🎉 Festive Offers
        </h2>

        <div className="grid md:grid-cols-3 gap-16">
          <div className="bg-orange-200 border-l-8 border-orange-600 p-8 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-2xl font-bold text-orange-700 mb-4">🔥 Flat 50% on First Order</h3>
            <p className="text-lg font-medium text-orange-800">
              Limited time only. Hurry up!
            </p>
          </div>

          <div className="bg-orange-200 border-l-8 border-orange-600 p-8 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-2xl font-bold text-orange-700 mb-4">🎁 Free Dessert on ₹299+</h3>
            <p className="text-lg font-medium text-orange-800">
              Sweeten your meal on us.
            </p>
          </div>

          <div className="bg-orange-200 border-l-8 border-orange-600 p-8 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-2xl font-bold text-orange-700 mb-4">🏖️ Summer Combo @ ₹99</h3>
            <p className="text-lg font-medium text-orange-800">
              Cool off with our refreshing deals.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
