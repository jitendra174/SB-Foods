import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

export default function CategoryMenu() {
  const { name } = useParams();

  return (
    <motion.div
      className="text-center mt-20 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-extrabold text-orange-600 mb-2">
        🍽️ {name} Menu
      </h2>
      <p className="text-gray-600 text-lg">
        Discover all delicious dishes in the <span className="font-semibold">{name}</span> category
      </p>
    </motion.div>
  );
}
