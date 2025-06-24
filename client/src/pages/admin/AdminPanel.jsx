import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [newRestaurant, setNewRestaurant] = useState({
    name: '',
    image: '',
    location: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/restaurants')
      .then(res => res.json())
      .then(data => setRestaurants(data))
      .catch(err => console.error('Error fetching restaurants', err));
  }, []);

  const handleAddRestaurant = async () => {
    const res = await fetch('http://localhost:5000/api/restaurants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRestaurant)
    });

    const data = await res.json();
    if (res.ok) {
      setRestaurants([...restaurants, data]);
      setNewRestaurant({ name: '', image: '', location: '' });
    } else {
      alert(data.message || 'Failed to add restaurant');
    }
  };

  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:5000/api/restaurants/${id}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      setRestaurants(restaurants.filter(r => r._id !== id));
    } else {
      alert('Error deleting restaurant');
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-red-600 mb-6">🍴 All Restaurants</h2>

      {/* Add Restaurant Section */}
      <div className="bg-white p-6 rounded-lg shadow mb-10">
        <h3 className="text-xl font-semibold mb-4">➕ Add New Restaurant</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
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

      {/* Restaurant List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map(res => (
          <div key={res._id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              src={res.image}
              alt={res.name}
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
    </div>
  );
};

export default AdminPanel;
