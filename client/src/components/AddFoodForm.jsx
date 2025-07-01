import { useState } from "react";

export default function AddFoodForm({ onAdd }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
  });
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
    if (successMsg) setSuccessMsg("");
  };

  const isImageURL = (url) =>
    /\.(jpg|jpeg|png|webp|gif)$/.test(url.toLowerCase());

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.category || !form.image) {
      setError("Please fill in all fields.");
      return;
    }

    if (!isImageURL(form.image)) {
      setError("Image URL must end with .jpg, .png, .webp or .gif");
      return;
    }

    try {
      setIsSubmitting(true);
      await onAdd(form); // Assumes onAdd is an async function
      setSuccessMsg("✅ Food item added successfully!");
      setForm({ name: "", price: "", category: "", image: "" });
    } catch (err) {
      setError("Failed to add food item. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-xl p-6 space-y-4 max-w-xl mx-auto border border-gray-200"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Add New Food Item
      </h2>

      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Food Name"
        className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
      />

      <input
        type="number"
        name="price"
        value={form.price}
        onChange={handleChange}
        placeholder="Price (₹)"
        className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
      />

      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
      >
        <option value="">Select Category</option>
        <option value="Biryani">Biryani</option>
        <option value="Snacks">Snacks</option>
        <option value="Burger">Burger</option>
        <option value="Pizza">Pizza</option>
        <option value="Juice">Juice</option>
        <option value="Milkshake">Milkshake</option>
        <option value="Sweets">Sweets</option>
        <option value="Ice Cream">Ice Cream</option>
      </select>

      <input
        type="url"
        name="image"
        value={form.image}
        onChange={handleChange}
        placeholder="Image URL"
        className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
      />

      {error && <p className="text-red-600 text-sm font-medium">{error}</p>}
      {successMsg && <p className="text-green-600 text-sm font-medium">{successMsg}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition disabled:opacity-50"
      >
        {isSubmitting ? "Adding..." : "Add Food"}
      </button>
    </form>
  );
}
