import React, { createContext, useContext, useReducer, useEffect } from "react";

// 🔄 Load cart from sessionStorage
const getInitialCart = () => {
  const storedCart = sessionStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

// 🔧 Initial State
const initialState = {
  cart: getInitialCart(),
};

// 🧠 Reducer Logic (🔥 Pure logic only - no toasts!)
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      const existing = state.cart.find((item) => item._id === action.payload._id);
      const updatedCart = existing
        ? state.cart.map((item) =>
            item._id === action.payload._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...state.cart, { ...action.payload, quantity: 1 }];
      return { ...state, cart: updatedCart };
    }

    case "REMOVE":
      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== action.payload),
      };

    case "INCREASE":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item._id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };

    case "DECREASE":
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item._id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0),
      };

    case "CLEAR":
      return {
        ...state,
        cart: [],
      };

    default:
      return state;
  }
};

// 📦 Create Context
const CartContext = createContext();

// 📤 Provider
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // 💾 Save to sessionStorage on cart change
  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  // ✅ Cart Actions (with toast logic here only)
  const addToCart = (item) => {
    dispatch({ type: "ADD", payload: item });
  };

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE", payload: id });
  };

  const increaseQty = (id) => {
    dispatch({ type: "INCREASE", payload: id });
  };

  const decreaseQty = (id) => {
    dispatch({ type: "DECREASE", payload: id });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR" });
  };

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ✅ Hook for easy access
export const useCart = () => useContext(CartContext);
