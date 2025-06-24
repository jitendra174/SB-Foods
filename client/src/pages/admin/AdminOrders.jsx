import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setOrders(data);
      else toast.error(data.message || "Failed to fetch orders");
    } catch (err) {
      toast.error("Error fetching orders");
    }
    setLoading(false);
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    if (!window.confirm(`Are you sure you want to mark this as "${newStatus}"?`)) return;

    setUpdatingOrderId(orderId);
    try {
      const token = sessionStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Order status updated");
        fetchOrders(); 
      } else {
        toast.error(data.message || "Failed to update status");
      }
    } catch (err) {
      toast.error("Server error");
    }
    setUpdatingOrderId(null);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">📦 All User Orders</h2>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <div key={order._id} className="border p-5 rounded-lg shadow-sm bg-white">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-gray-800">
                  Order #{order._id.slice(-6).toUpperCase()}
                </h4>
                <span
                  className={`px-2 py-1 text-sm rounded-full ${
                    order.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <p className="text-sm text-gray-600">
                🧍 {order.userId?.name || "User"} ({order.userId?.email})
              </p>
              <p className="text-sm text-gray-500">
                📅 {new Date(order.createdAt).toLocaleString()}
              </p>

              <ul className="mt-3 text-sm list-disc list-inside text-gray-700">
                {order.items.map((item) => (
                  <li key={item._id}>
                    🍽 {item.name} × {item.quantity}
                  </li>
                ))}
              </ul>

              <div className="mt-3 flex justify-between items-center">
                <p className="text-primary font-semibold text-lg">
                  ₹{order.totalAmount}
                </p>
                <div className="flex gap-2">
                  {order.status !== "Delivered" && (
                    <>
                      <button
                        onClick={() => handleStatusUpdate(order._id, "Preparing")}
                        disabled={updatingOrderId === order._id}
                        className="px-4 py-1 text-sm bg-blue-100 text-blue-700 rounded"
                      >
                        Preparing
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(order._id, "Delivered")}
                        disabled={updatingOrderId === order._id}
                        className="px-4 py-1 text-sm bg-green-100 text-green-700 rounded"
                      >
                        Mark Delivered
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
