import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAdmin, logout } = useAuth();
  const { cart } = useCart();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setOpen(false); // Close dropdown when route changes
  }, [location.pathname]);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-white border-b border-orange-300 shadow px-6 py-3 flex justify-between items-center sticky top-0 z-50 font-sans">
      {/* Logo */}
      <Link
        to="/"
        className="text-3xl font-extrabold text-orange-600 hover:text-orange-700 transition-colors duration-200"
        aria-label="SB Foods Home"
      >
        🍽️ SB Foods
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center space-x-10 font-semibold text-gray-700">
        {["/", "/restaurants", "/about", "/contact"].map((path) => {
          const name = path === "/" ? "Home" : path.slice(1).charAt(0).toUpperCase() + path.slice(2);
          return (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                isActive
                  ? "text-orange-600 border-b-2 border-orange-600 pb-1"
                  : "hover:text-orange-600 transition"
              }
            >
              {name}
            </NavLink>
          );
        })}
      </div>

      {/* Cart + User Avatar */}
      <div className="flex items-center space-x-8 relative">
        {/* Cart Icon */}
        <div
          className="relative cursor-pointer"
          onClick={() => navigate("/cart")}
          aria-label={`Cart with ${cartItemCount} items`}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && navigate("/cart")}
        >
          <FaShoppingCart className="text-2xl text-gray-700 hover:text-orange-600 transition" />
          <AnimatePresence>
            {cartItemCount > 0 && (
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full select-none"
              >
                {cartItemCount}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Avatar Menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="flex items-center focus:outline-none"
            aria-haspopup="true"
            aria-expanded={open}
            aria-label="User menu"
          >
            <FaUserCircle className="text-3xl text-gray-700 hover:text-orange-600 transition" />
            {user && (
              <span className="ml-2 hidden md:inline-block text-gray-700 font-medium select-none">
                {user.name || user.email?.split("@")[0]}
              </span>
            )}
          </button>

          {/* Dropdown */}
          <AnimatePresence>
            {open && (
              <motion.div
                key="dropdown"
                initial={{ opacity: 0, scale: 0.85, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-lg border border-orange-300 text-sm z-50"
              >
                {!user ? (
                  <Link
                    to="/login"
                    className="block px-4 py-3 hover:bg-orange-50 transition"
                    onClick={() => setOpen(false)}
                  >
                    Login
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/profile"
                      className="block px-4 py-3 hover:bg-orange-50 transition"
                      onClick={() => setOpen(false)}
                    >
                      👤 Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-3 hover:bg-orange-50 transition"
                      onClick={() => setOpen(false)}
                    >
                      🧾 Orders
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-3 hover:bg-orange-50 transition"
                      onClick={() => setOpen(false)}
                    >
                      ⚙️ Settings
                    </Link>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        className="block px-4 py-3 hover:bg-orange-50 transition"
                        onClick={() => setOpen(false)}
                      >
                        📊 Dashboard
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        handleLogout();
                        setOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-orange-50 text-red-600 font-semibold transition"
                    >
                      Logout
                    </button>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
