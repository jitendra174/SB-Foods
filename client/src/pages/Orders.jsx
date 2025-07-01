import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const { isAdmin, token } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) {
        toast.error("Please login to view your orders");
        return navigate("/login");
      }

      if (isAdmin) {
        toast.error("Admins cannot access user orders");
        return navigate("/admin/orders");
      }

      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/orders/me`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setOrders(data.orders || data); 
        } else {
          toast.error(data.message || "Failed to load orders");
        }
      } catch (err) {
        toast.error("Server error while loading orders");
      }
    };

    fetchOrders();
  }, [navigate, isAdmin, token]);

  return (
    <div className="min-h-screen bg-white px-4 py-10 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-center text-primary mb-8">
        🧾 Your Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="border rounded-xl p-6 shadow"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg text-gray-800">
                  Order #{order._id.slice(-6).toUpperCase()}
                </h3>
                <span
                  className={`px-3 py-1 text-sm rounded-full font-medium ${order.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : order.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                    }`}
                >
                  {order.status}
                </span>
              </div>

              <p className="text-gray-500 text-sm mb-3">
                Placed on: {new Date(order.createdAt).toLocaleString()}
              </p>

              <ul className="space-y-1 text-sm text-gray-700 mb-3">
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    🍽 {item.name} × {item.quantity}
                  </li>
                ))}
              </ul>

              <p className="text-right text-lg font-bold text-primary">
                ₹{order.totalAmount.toFixed(2)}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
