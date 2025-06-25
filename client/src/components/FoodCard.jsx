import React from "react";
import { FaShoppingCart } from "react-icons/fa";

export default function FoodCard({
  name,
  image,
  price,
  isVeg = true,
  onClick,
  onAddToCart,
}) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-transform duration-300 hover:scale-[1.03] cursor-pointer relative"
    >
      {/* Food Image */}
      <img
        src={image}
        alt={name}
        loading="lazy"
        className="h-40 w-full object-cover rounded-t-xl"
      />

      {/* Veg/Non-Veg Indicator */}
      <div className="absolute top-3 left-3 w-4 h-4 rounded-full border border-gray-700"
        style={{ backgroundColor: isVeg ? "#16a34a" : "#b91c1c" }}
        title={isVeg ? "Vegetarian" : "Non-Vegetarian"}
      />

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 truncate">{name}</h3>
        <div className="flex items-center justify-between mt-2">
          <p className="text-green-600 font-bold text-base">₹{price}</p>

          {/* Add to Cart */}
          {onAddToCart && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart();
              }}
              className="text-orange-600 hover:text-orange-800 transition"
              title="Add to Cart"
            >
              <FaShoppingCart size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
