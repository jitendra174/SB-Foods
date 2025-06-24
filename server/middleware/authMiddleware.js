import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const SECRET = 'secretkey123'; // ⚠️ Use the same secret as in authController

// 🔐 Protect User Routes
export const protectUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "User not authorized, token missing" });
  }

  try {
    const decoded = jwt.verify(token, SECRET);

    // If the token belongs to admin (e.g. trying to view user orders with admin token)
    if (decoded.role === 'admin') {
      return res.status(403).json({ message: "Admins are not allowed to access user routes" });
    }

    const user = await User.findById(decoded.userId); // ✅ match with loginUser token payload

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = { id: user._id }; // ✅ set usable user data
    next();
  } catch (err) {
    console.error('❌ User token error:', err.message);
    res.status(401).json({ message: "Invalid or expired user token" });
  }
};

// 🔐 Protect Admin Routes
export const protectAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Admin not authorized, token missing" });
  }

  try {
    const decoded = jwt.verify(token, SECRET); // same secret

    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    req.admin = { role: 'admin' }; // ✅ mark admin session
    next();
  } catch (err) {
    console.error('❌ Admin token error:', err.message);
    res.status(401).json({ message: "Invalid or expired admin token" });
  }
};
