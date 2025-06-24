import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const categories = [
  'Biryani', 'Pizza', 'Burger', 'Snacks', 'Juices',
  'Milkshakes', 'Sweets', 'Fast Food', 'Tiffins', 'Ice Cream'
];

const AllRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const initialCategory = params.get('category');
    if (initialCategory) {
      setSelectedCategories([initialCategory.toLowerCase()]);
    }
  }, [location.search]);


  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/restaurants`)
      .then((res) => res.json())
      .then((data) => {
        const withRatings = data.map((r) => ({
          ...r,
          rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
          category: r.category?.toLowerCase() || '',
        }));
        setRestaurants(withRatings);
        setFiltered(withRatings);
      })
      .catch((err) => console.error('Failed to fetch restaurants:', err));
  }, []);

  useEffect(() => {
    let results = [...restaurants];

    if (selectedCategories.length > 0) {
      results = results.filter((r) =>
        selectedCategories.includes(r.category.toLowerCase())
      );
    }

    if (searchTerm) {
      results = results.filter(
        (r) =>
          r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOption === 'rating') {
      results.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === 'price-asc') {
      results.sort((a, b) => (a.averagePrice || 0) - (b.averagePrice || 0));
    } else if (sortOption === 'price-desc') {
      results.sort((a, b) => (b.averagePrice || 0) - (a.averagePrice || 0));
    }

    setFiltered(results);
    setCurrentPage(1);
  }, [searchTerm, selectedCategories, sortOption, restaurants]);

  const toggleCategory = (category) => {
    const catLower = category.toLowerCase();
    setSelectedCategories((prev) =>
      prev.includes(catLower)
        ? prev.filter((c) => c !== catLower)
        : [...prev, catLower]
    );
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSearchTerm('');
    setSortOption('');
    setCurrentPage(1);
    navigate('/restaurants'); 
  };

  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-white px-4 sm:px-8 py-10">
      <h2 className="text-4xl font-bold text-center text-primary mb-10">
        🍴 All Restaurants
      </h2>

      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
        {/* Sidebar Filters */}
        <div className="lg:w-1/4 space-y-6">
          <div>
            <label className="font-semibold text-darkText">Filter by Category</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={`px-3 py-1 rounded-full text-sm border transition-all ${
                    selectedCategories.includes(cat.toLowerCase())
                      ? 'bg-primary text-white shadow'
                      : 'text-darkText hover:bg-orange-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="font-semibold text-darkText">Sort by</label>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full mt-2 p-2 border rounded-lg shadow-sm focus:ring-primary focus:outline-none"
            >
              <option value="">None</option>
              <option value="rating">Rating (High to Low)</option>
              <option value="price-asc">Price (Low to High)</option>
              <option value="price-desc">Price (High to Low)</option>
            </select>
          </div>

          <button
            onClick={handleClearFilters}
            className="w-full mt-4 bg-red-100 text-red-700 py-2 rounded-lg hover:bg-red-200 transition"
          >
            Clear Filters
          </button>
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4 w-full space-y-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or location..."
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {paginated.length > 0 ? (
              paginated.map((res, i) => (
                <motion.div
                  key={res._id}
                  onClick={() => navigate(`/restaurant/${res._id}`)}
                  whileHover={{ scale: 1.03 }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="cursor-pointer bg-white rounded-2xl shadow-card border border-gray-100 p-4 hover:shadow-xl transition-all"
                >
                  <img
                    src={res.image}
                    alt={res.name}
                    className="h-40 w-full object-cover rounded-xl mb-3"
                  />
                  <h3 className="text-lg font-semibold text-darkText">{res.name}</h3>
                  <p className="text-sm text-primary capitalize">{res.category}</p>
                  <p className="text-sm text-gray-500">{res.location}</p>
                  <p className="text-yellow-500 font-semibold text-sm mt-1">
                    ⭐ {res.rating} {res.averagePrice && `₹${res.averagePrice} Avg.`}
                  </p>
                </motion.div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No restaurants found.
              </p>
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-6 flex-wrap">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPage(num)}
                className={`px-4 py-2 rounded-full border text-sm ${
                  currentPage === num
                    ? 'bg-primary text-white shadow-md'
                    : 'hover:bg-gray-100'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRestaurants;
