import Order from "../models/Order.js";

// User places order
export const placeOrder = async (req, res) => {
  try {
    const { items, totalAmount } = req.body;
    const newOrder = new Order({
      userId: req.user.id,
      items,
      totalAmount,
    });
    await newOrder.save();
    res.status(201).json({ success: true, order: newOrder });
  } catch (err) {
    res.status(500).json({ error: "Failed to place order" });
  }
};

// User views their orders
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to get orders" });
  }
};

// Admin views all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("userId", "name email").sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

// Admin updates order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: "Failed to update order status" });
  }
};
