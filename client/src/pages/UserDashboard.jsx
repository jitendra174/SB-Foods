import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const UserDashboard = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto min-h-[80vh]">
      <h2 className="text-3xl font-bold text-center text-red-600 mb-10">
        🧑‍🍳 User Dashboard
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[
          { to: "/user/profile", label: "👤 Profile" },
          { to: "/user/orders", label: "📦 Orders" },
          { to: "/user/settings", label: "⚙️ Settings" },
        ].map(({ to, label }, i) => (
          <motion.div
            key={to}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
          >
            <Link
              to={to}
              className="block bg-white border-2 border-transparent hover:border-red-500 hover:shadow-lg transition-all duration-300 p-6 rounded-2xl text-center font-semibold text-gray-800 text-lg"
            >
              {label}
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
