// server/routes/authRoutes.js
import express from 'express';
import {
  adminLogin,
  signupUser,
  loginUser,
  getMe
} from '../controllers/authController.js';


const router = express.Router();

router.post('/admin/login', adminLogin);
router.post('/signup', signupUser);
router.post('/login', loginUser);

// 🔐 Add this route to get user info from token
router.get('/me', getMe);

export default router;
