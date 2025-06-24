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
router.post('/', protectUser, placeOrder);              
router.get('/me', protectUser, getUserOrders);          

// 🧑‍💼 Admin routes
router.get('/', protectAdmin, getAllOrders);            
router.patch('/:id', protectAdmin, updateOrderStatus); 

export default router;
