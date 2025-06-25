import express from 'express';
import {
  placeOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus
} from '../controllers/orderController.js';
import {
  verifyUser,
  protectUser,
  protectAdmin
} from '../middlewares/authMiddleware.js';
import Order from '../models/Order.js';

const router = express.Router();

// 🛒 User Routes
router.post('/', protectUser, placeOrder);
router.get('/me', protectUser, getUserOrders);

// 🧑‍💼 Admin Routes
router.get('/admin', protectAdmin, getAllOrders);
router.patch('/:id', protectAdmin, updateOrderStatus);

// ✅ Admin: Get order by ID
router.get('/admin/orders/:id', protectAdmin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (err) {
    console.error("❌ Error fetching order by ID:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
