import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const AdminManageRestaurant = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [editingRes, setEditingRes] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    image: "",
    price: "",
    category: "",
  });

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/restaurants/${id}`);
        const data = await res.json();
        setRestaurant(data);
        setMenuItems(data.menu || []);
      } catch (err) {
        toast.error("Failed to load restaurant data");
      }
    };

    fetchRestaurant();
  }, [id]);

  const handleResUpdate = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/restaurants/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(restaurant),
      });
      toast.success("Restaurant updated");
      setEditingRes(false);
    } catch (err) {
      toast.error("Failed to update restaurant");
    }
  };

  const handleMenuUpdate = (index, field, value) => {
    const updated = [...menuItems];
    updated[index][field] = field === "price" ? parseFloat(value) || "" : value;
    setMenuItems(updated);
  };

  const handleSaveMenuItem = async (item) => {
    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/restaurants/${id}/menu/${item._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(item),
      });
      toast.success("Menu item updated");
    } catch (err) {
      toast.error("Failed to update menu item");
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/restaurants/${id}/menu/${itemId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setMenuItems((prev) => prev.filter((item) => item._id !== itemId));
      toast.success("Item deleted");
    } catch (err) {
      toast.error("Failed to delete item");
    }
  };

  const handleAddMenuItem = async () => {
    const { name, image, price, category } = newItem;

    if (!name || !image || !price || !category) {
      return toast.error("All fields are required.");
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/restaurants/${id}/menu`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...newItem, price: parseFloat(price) }),
      });

      const created = await res.json();
      setMenuItems([...menuItems, created]);
      setNewItem({ name: "", image: "", price: "", category: "" });
      toast.success("Item added");
    } catch (err) {
      toast.error("Failed to add item");
    }
  };

  if (!restaurant) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-10">
      <h2 className="text-3xl font-bold text-red-600">
        Manage: {restaurant.name}
      </h2>

      {/* 🔧 Restaurant Info */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Restaurant Details</h3>
          {!editingRes && (
            <button
              onClick={() => setEditingRes(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Edit
            </button>
          )}
        </div>

        {editingRes ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              value={restaurant.name}
              onChange={(e) => setRestaurant({ ...restaurant, name: e.target.value })}
              placeholder="Name"
              className="border p-2 rounded"
            />
            <input
              value={restaurant.image}
              onChange={(e) => setRestaurant({ ...restaurant, image: e.target.value })}
              placeholder="Image URL"
              className="border p-2 rounded"
            />
            <input
              value={restaurant.location}
              onChange={(e) => setRestaurant({ ...restaurant, location: e.target.value })}
              placeholder="Location"
              className="border p-2 rounded"
            />
            <button
              onClick={handleResUpdate}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 col-span-full"
            >
              Save Restaurant
            </button>
          </div>
        ) : (
          <div className="space-y-1 text-gray-700">
            <p><strong>Name:</strong> {restaurant.name}</p>
            <p><strong>Location:</strong> {restaurant.location}</p>
            <p>
              <strong>Image:</strong>{" "}
              <a href={restaurant.image} target="_blank" rel="noreferrer" className="text-blue-500 underline">
                View
              </a>
            </p>
          </div>
        )}
      </div>

      {/* 🍔 Menu Items */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Menu Items</h3>
        {menuItems.map((item, index) => (
          <div key={item._id || index} className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-3 items-center">
            <input
              value={item.name}
              onChange={(e) => handleMenuUpdate(index, "name", e.target.value)}
              className="border p-2 rounded"
              placeholder="Item Name"
            />
            <input
              value={item.image}
              onChange={(e) => handleMenuUpdate(index, "image", e.target.value)}
              className="border p-2 rounded"
              placeholder="Image URL"
            />
            <input
              value={item.category}
              onChange={(e) => handleMenuUpdate(index, "category", e.target.value)}
              className="border p-2 rounded"
              placeholder="Category"
            />
            <input
              value={item.price}
              type="number"
              onChange={(e) => handleMenuUpdate(index, "price", e.target.value)}
              className="border p-2 rounded"
              placeholder="Price"
            />
            <div className="flex gap-2">
              <button
                onClick={() => handleSaveMenuItem(item)}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                Save
              </button>
              <button
                onClick={() => handleDeleteItem(item._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ➕ Add New Item */}
      <div className="bg-white p-6 rounded-lg shadow space-y-3">
        <h3 className="text-xl font-semibold mb-2">Add New Menu Item</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            placeholder="Item Name"
            className="border p-2 rounded"
          />
          <input
            value={newItem.image}
            onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
            placeholder="Image URL"
            className="border p-2 rounded"
          />
          <input
            value={newItem.category}
            onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
            placeholder="Category"
            className="border p-2 rounded"
          />
          <input
            value={newItem.price}
            type="number"
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
            placeholder="Price"
            className="border p-2 rounded"
          />
        </div>
        <button
          onClick={handleAddMenuItem}
          className="mt-3 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Add Menu Item
        </button>
      </div>
    </div>
  );
};

export default AdminManageRestaurant;
