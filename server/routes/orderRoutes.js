import express from 'express';
import {
  placeOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus
} from '../controllers/orderController.js';

import {
  protectUser,
  protectAdmin
} from '../middleware/authMiddleware.js';

const router = express.Router();

// 🛒 User routes
router.post('/', protectUser, placeOrder);              // POST /api/orders
router.get('/me', protectUser, getUserOrders);          // GET /api/orders/me

// 🧑‍💼 Admin routes
router.get('/', protectAdmin, getAllOrders);            // GET /api/orders
router.patch('/:id', protectAdmin, updateOrderStatus);  // PATCH /api/orders/:id

export default router;
