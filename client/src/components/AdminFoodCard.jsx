import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function AdminFoodCard({ id, name, price, category, image, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 relative">
      <img
        src={image}
        alt={name}
        className="w-full h-40 object-cover rounded-t-xl"
      />

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{name}</h3>
        <p className="text-sm text-gray-500 capitalize">{category}</p>
        <p className="text-green-600 font-bold mt-2">₹{price}</p>
      </div>

      {/* Edit/Delete Icons */}
      <div className="absolute top-2 right-2 flex gap-2">
        <button
          onClick={() => onEdit(id)}
          className="text-blue-600 hover:text-blue-800"
          title="Edit"
        >
          <FaEdit />
        </button>
        <button
          onClick={() => onDelete(id)}
          className="text-red-600 hover:text-red-800"
          title="Delete"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}
