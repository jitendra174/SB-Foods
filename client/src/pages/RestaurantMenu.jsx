import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';

const RestaurantMenu = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [clickedItemId, setClickedItemId] = useState(null); 
  const { addToCart } = useCart();


  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/restaurants/${id}`);
        const data = await res.json();
        setRestaurant(data);
        setMenuItems(data.menu || []);
        setFilteredItems(data.menu || []);
      } catch (err) {
        console.error('Error loading menu:', err);
      }
    };

    fetchRestaurant();
  }, [id]);


  useEffect(() => {
    let filtered = [...menuItems];

    if (selectedCategory) {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  }, [selectedCategory, searchTerm, menuItems]);


  const handleOrderNow = (item) => {
    if (clickedItemId === item._id) return; 

    setClickedItemId(item._id);
    addToCart(item); 
    toast.success(`${item.name} added to cart`);

    setTimeout(() => setClickedItemId(null), 800); 
  };

  return (
    <div className="min-h-screen bg-white px-4 sm:px-8 py-10">
      <div className="max-w-6xl mx-auto">
        {restaurant && (
          <>
            <h2 className="text-4xl font-bold text-center text-primary mb-2">
              {restaurant.name} Menu
            </h2>
            <p className="text-center text-gray-600 mb-8">{restaurant.location}</p>
          </>
        )}

        {/* 🔍 Search */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search menu items..."
            className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredItems.length === 0 ? (
            <p className="text-center col-span-full text-gray-500">
              No menu items found.
            </p>
          ) : (
            filteredItems.map((item, i) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="bg-white rounded-2xl shadow-card hover:shadow-xl transition-all overflow-hidden"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-44 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-darkText">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.category}</p>
                  <p className="text-primary font-bold mt-1 text-sm">₹{item.price}</p>
                  <button
                    disabled={clickedItemId === item._id}
                    onClick={() => handleOrderNow(item)}
                    className={`mt-3 w-full bg-primary text-white py-2 px-4 rounded-lg transition-all ${
                      clickedItemId === item._id
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-orange-600'
                    }`}
                  >
                    {clickedItemId === item._id ? 'Adding...' : 'Order Now'}
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
