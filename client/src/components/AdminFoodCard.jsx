import React from "react";

export default function AdminFoodCard({ name, price, category, image }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img
        src={image}
        alt={name}
        className="w-full h-40 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{name}</h3>
        <p className="text-sm text-gray-500 capitalize">{category}</p>
        <p className="text-green-600 font-bold mt-2">₹{price}</p>
      </div>
    </div>
  );
}
