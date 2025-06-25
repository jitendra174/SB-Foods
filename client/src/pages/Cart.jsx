import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Cart = () => {
  const { cart, removeFromCart, increaseQty, decreaseQty, clearCart } = useCart();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [placingOrder, setPlacingOrder] = useState(false);

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    if (placingOrder) return;

    console.log("TOKEN:", token);

    if (!token) {
      toast.error("You must be logged in to place an order");
      return navigate("/login");
    }

    setPlacingOrder(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cart,
          totalAmount: totalPrice,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setTimeout(() => {
          toast.success("Order placed successfully!");
        }, 200);

        clearCart();
        navigate("/orders");
      } else {
        toast.error(data.message || "Failed to place order");
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error("Order error:", err);
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 sm:px-10 py-10">
      <h2 className="text-4xl font-bold text-center text-primary mb-10">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <div className="text-center text-gray-500">
          <p className="text-lg mb-4">Your cart is empty.</p>
          <button
            onClick={() => navigate("/restaurants")}
            className="bg-primary text-white px-6 py-3 rounded-full font-medium shadow-button"
          >
            Browse Restaurants
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {cart.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex bg-white border rounded-xl shadow p-4 gap-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-xl"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500 capitalize">{item.category}</p>
                  <p className="text-primary font-bold">₹{item.price}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => decreaseQty(item._id)}
                      className="px-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      −
                    </button>
                    <span className="font-medium">{item.quantity}</span>
                    <button
                      onClick={() => increaseQty(item._id)}
                      className="px-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                    <button
                      onClick={() => {
                        removeFromCart(item._id);
                        toast.success("Item removed from cart");
                      }}
                      className="ml-auto text-red-500 hover:text-red-600 text-sm"
                    >
                      ❌ Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Total + Place Order */}
          <div className="max-w-5xl mx-auto mt-10 border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xl font-semibold">
              Total: <span className="text-primary">₹{totalPrice.toFixed(2)}</span>
            </p>
            <button
              onClick={handlePlaceOrder}
              disabled={placingOrder}
              className={`bg-green-500 text-white px-6 py-3 rounded-full font-medium transition ${placingOrder ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"
                }`}
            >
              ✅ {placingOrder ? "Placing..." : "Place Order"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
