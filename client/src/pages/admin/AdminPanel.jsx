import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminPanel = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [newRestaurant, setNewRestaurant] = useState({
    name: '',
    image: '',
    location: '',
  });
  const [loading, setLoading] = useState(false);
  const nameInputRef = useRef(null);
  const navigate = useNavigate();

  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/api/restaurants`);
        const data = await res.json();
        if (res.ok) {
          const sorted = data.sort((a, b) => a.name.localeCompare(b.name));
          setRestaurants(sorted);
        } else {
          toast.error("Failed to load restaurants");
        }
      } catch (err) {
        console.error('Error fetching restaurants', err);
        toast.error("Error loading data");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const handleAddRestaurant = async () => {
    if (!newRestaurant.name || !newRestaurant.image || !newRestaurant.location) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/restaurants`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRestaurant),
      });

      const data = await res.json();
      if (res.ok) {
        const updated = [...restaurants, data].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setRestaurants(updated);
        setNewRestaurant({ name: '', image: '', location: '' });
        nameInputRef.current?.focus();
        toast.success("Restaurant added");
      } else {
        toast.error(data.message || 'Failed to add restaurant');
      }
    } catch (err) {
      toast.error("Error adding restaurant");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this restaurant?")) return;

    try {
      const res = await fetch(`${API_BASE}/api/restaurants/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setRestaurants(restaurants.filter((r) => r._id !== id));
        toast.success("Deleted successfully");
      } else {
        toast.error('Error deleting restaurant');
      }
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-red-600 mb-6">🍴 All Restaurants</h2>

      {/* ➕ Add Restaurant Section */}
      <div className="bg-white p-6 rounded-lg shadow mb-10">
        <h3 className="text-xl font-semibold mb-4">➕ Add New Restaurant</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            ref={nameInputRef}
            placeholder="Name"
            value={newRestaurant.name}
            onChange={(e) => setNewRestaurant({ ...newRestaurant, name: e.target.value })}
            className="border px-3 py-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newRestaurant.image}
            onChange={(e) => setNewRestaurant({ ...newRestaurant, image: e.target.value })}
            className="border px-3 py-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Location"
            value={newRestaurant.location}
            onChange={(e) => setNewRestaurant({ ...newRestaurant, location: e.target.value })}
            className="border px-3 py-2 rounded w-full"
          />
        </div>
        <button
          onClick={handleAddRestaurant}
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
        >
          Add Restaurant
        </button>
      </div>

      {/* 🏬 Restaurant List */}
      {loading ? (
        <p className="text-center text-gray-500">Loading restaurants...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((res) => (
            <div key={res._id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src={res.image}
                alt={res.name}
                onError={(e) =>
                  (e.currentTarget.src = "https://via.placeholder.com/300x200?text=No+Image")
                }
                className="h-40 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">{res.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{res.location}</p>
                <div className="flex justify-between">
                  <button
                    onClick={() => navigate(`/admin/manage/${res._id}`)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                  >
                    Manage Menu
                  </button>
                  <button
                    onClick={() => handleDelete(res._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
