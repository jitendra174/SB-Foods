import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FaMoon, FaSun } from "react-icons/fa";
import { motion } from "framer-motion";

const Settings = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    password: "",
  });
  const [theme, setTheme] = useState("light");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.body.className =
      savedTheme === "dark"
        ? "bg-gray-900 text-white"
        : "bg-white text-black";
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.className =
      newTheme === "dark"
        ? "bg-gray-900 text-white"
        : "bg-white text-black";
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage("");
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("✅ (Demo) Settings updated successfully!");
  };

  const handleDeactivate = () => {
    if (window.confirm("Are you sure you want to deactivate your account?")) {
      alert("Account deactivated (demo only)");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start px-4 py-12 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-primary">⚙️ Settings</h1>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
            title="Toggle Theme"
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>
        </div>

        {user ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email (readonly) */}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={user.email}
                readOnly
                className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-gray-500 cursor-not-allowed"
              />
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Update your name"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1">
                New Password
              </label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="bg-primary hover:bg-red-600 text-white font-semibold w-full py-2 rounded-lg transition"
            >
              Save Changes
            </button>

            {message && (
              <p className="text-green-600 text-sm mt-1">{message}</p>
            )}
            {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
          </form>
        ) : (
          <p className="text-red-600 text-center font-medium">
            User not logged in.
          </p>
        )}

        {/* Deactivate Section */}
        <div className="mt-8 border-t pt-4 text-right">
          <button
            onClick={handleDeactivate}
            className="text-red-600 hover:underline text-sm"
          >
            🚫 Deactivate Account
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;
