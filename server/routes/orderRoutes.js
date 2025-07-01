import express from 'express';
import mongoose from 'mongoose';
import {
  placeOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus
} from '../controllers/orderController.js';
import {
  protectUser,
  protectAdmin
} from '../middlewares/authMiddleware.js';
import Order from '../models/Order.js';

const router = express.Router();

router.post('/', protectUser, placeOrder);
router.get('/', protectAdmin, getAllOrders);
router.get('/me', protectUser, getUserOrders);
router.get('/admin', protectAdmin, getAllOrders);
router.patch('/:id', protectAdmin, updateOrderStatus);

router.get('/admin/orders/:id', protectAdmin, async (req, res) => {
  const id = req.params.id;
  console.log("➡️ Fetching order with ID:", id);

  try {
    // Safely handle both ObjectId and string
    const order = mongoose.Types.ObjectId.isValid(id)
      ? await Order.findById(id)
      : await Order.findOne({ _id: id });

    console.log("📦 Found order:", order);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    console.error("❌ Error fetching order by ID:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
