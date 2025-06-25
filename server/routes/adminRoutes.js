// routes/adminRoutes.js
import express from 'express';
import { adminLogin } from '../controllers/adminController.js';
import { getAllOrders } from '../controllers/orderController.js';
//import { protectAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/login', adminLogin);
router.get('/orders', getAllOrders);

export default router;
