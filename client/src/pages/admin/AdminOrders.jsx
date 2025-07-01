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
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/orders`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      if (res.ok) {
        setOrders(data);
      } else {
        toast.error(data.message || "Failed to fetch orders");
      }
    } catch (err) {
      toast.error("Error fetching orders");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
  if (!window.confirm(`Are you sure you want to mark this as "${newStatus}"?`)) return;
  setUpdatingOrderId(orderId);
  try {
    const token = sessionStorage.getItem("token");
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/orders/${orderId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      }
    );
    const data = await res.json();
    if (res.ok) {
      toast.success("Order status updated");
      await fetchOrders();
    } else {
      toast.error(data.message || "Failed to update status");
    }
  } catch (err) {
    toast.error("Server error");
  } finally {
    setUpdatingOrderId(null);
  }
};

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-white px-4 py-10 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-red-600 text-center">
        📦 All User Orders
      </h2>
      {loading ? (
        <p className="text-gray-500 text-center">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500 text-center">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="border p-5 rounded-lg shadow-sm bg-white">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-gray-800 text-sm md:text-base">
                  Order ID: <span className="font-mono">{order._id.slice(-6).toUpperCase()}</span>
                </h4>
                <span
                  className={`px-3 py-1 text-xs rounded-full font-semibold ${
                    order.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.status === "Preparing"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                🧍 {order.userId?.name || "Unknown User"} ({order.userId?.email || "N/A"})
              </p>
              <p className="text-sm text-gray-500">
                📅 {order.createdAt ? new Date(order.createdAt).toLocaleString() : "Date Unavailable"}
              </p>
              <ul className="mt-3 text-sm list-disc list-inside text-gray-700">
                {(order.items || []).map((item) => (
                  <li key={item._id || item.name}>
                    🍽 {item.name} × {item.quantity}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex justify-between items-center">
                <p className="text-lg font-semibold text-red-600">
                  ₹{order.totalAmount?.toFixed(2) || "0.00"}
                </p>
                {order.status !== "Delivered" && (
                  <div className="flex gap-2">
                    {order.status !== "Preparing" && (
                      <button
                        onClick={() => handleStatusUpdate(order._id, "Preparing")}
                        disabled={updatingOrderId === order._id}
                        className={`px-4 py-1 text-sm rounded transition ${
                          updatingOrderId === order._id
                            ? "bg-blue-200 text-blue-500"
                            : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                        }`}
                      >
                        Preparing
                      </button>
                    )}
                    <button
                      onClick={() => handleStatusUpdate(order._id, "Delivered")}
                      disabled={updatingOrderId === order._id}
                      className={`px-4 py-1 text-sm rounded transition ${
                        updatingOrderId === order._id
                          ? "bg-green-200 text-green-500"
                          : "bg-green-100 text-green-700 hover:bg-green-200"
                      }`}
                    >
                      Mark Delivered
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
