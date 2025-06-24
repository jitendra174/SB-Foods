import React from "react";
import categories from "../data/categories";

export default function CategoryBar({ selectedCategory, onSelect }) {
  return (
    <div className="overflow-x-auto scrollbar-hide mt-4">
      <div className="flex justify-center gap-4 py-3 px-3 md:px-6">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => onSelect(category.name)}
            className={`flex items-center gap-2 rounded-full py-2 px-5 shadow-sm transition-transform duration-300 ${
              selectedCategory === category.name
                ? "bg-yellow-400 text-black scale-105 shadow-lg"
                : "bg-white hover:bg-yellow-100 text-gray-800"
            }`}
          >
            <span className="text-lg">{category.icon}</span>
            <span className="font-medium whitespace-nowrap">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
