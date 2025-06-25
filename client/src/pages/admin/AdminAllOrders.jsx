import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AdminAllOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("Unauthorized access");
      return navigate("/admin/login");
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/orders/admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cart,
          totalAmount: totalPrice,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setOrders(data);
      } else {
        toast.error(data.message || "Failed to fetch orders");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  const updateStatus = async (id, newStatus) => {
    const token = sessionStorage.getItem("token");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/orders/admin/${id}/status`, {

        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: Cart,
          totalAmount: totalPrice,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Status updated");
        fetchOrders();
      } else {
        toast.error(data.message || "Failed to update");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen p-6 max-w-6xl mx-auto bg-white">
      <h2 className="text-3xl font-bold text-primary text-center mb-6">📋 All Orders</h2>

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

              <p className="text-gray-500 text-sm mb-1">
                Placed by: {order.userId?.name || "Unknown"} ({order.userId?.email})
              </p>
              <p className="text-gray-500 text-sm mb-3">
                Date: {new Date(order.createdAt).toLocaleString()}
              </p>

              <ul className="text-sm text-gray-700 mb-3 list-disc pl-5">
                {order.items.map((item) => (
                  <li key={item._id}>
                    {item.name} × {item.quantity}
                  </li>
                ))}
              </ul>

              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold text-primary">
                  ₹{order.totalAmount.toFixed(2)}
                </p>
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                  className="border rounded px-3 py-1 text-sm focus:outline-none"
                >
                  <option value="Pending">Pending</option>
                  <option value="Preparing">Preparing</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminAllOrders;
