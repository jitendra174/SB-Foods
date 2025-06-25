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

const router = express.Router();

// 🛒 User Routes
router.post('/', protectUser, placeOrder);              
router.get('/me', protectUser, getUserOrders);

// 🧑‍💼 Admin Routes
router.get('/admin', protectAdmin, getAllOrders);           
router.patch('/:id', protectAdmin, updateOrderStatus); 

export default router;
