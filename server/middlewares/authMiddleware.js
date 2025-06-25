import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const SECRET = process.env.JWT_SECRET;
console.log("🧪 JWT_SECRET from ENV:", SECRET);


// Middleware to protect user routes
export const protectUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  console.log("🔐 Incoming Token:", token);

  if (!token) {
    console.log("⛔ Token Missing");
    return res.status(401).json({ message: "User not authorized, token missing" });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    console.log("✅ Decoded Token:", decoded);

    if (decoded.role === 'admin') {
      return res.status(403).json({ message: "Admins are not allowed to access user routes" });
    }

    const user = await User.findById(decoded.userId);

    if (!user) {
      console.log("❌ User not found in DB");
      return res.status(401).json({ message: "User not found" });
    }

    console.log("✅ User found:", user.email || user._id);
    req.user = { id: user._id };
    next();
  } catch (err) {
    console.error("❌ Token verify failed:", err.message);
    res.status(401).json({ message: "Invalid or expired user token" });
  }
};

// Middleware to protect admin routes
export const protectAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Admin not authorized, token missing" });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    console.log("🔐 Admin Token Decoded:", decoded);

    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    req.admin = { role: 'admin', id: decoded.userId }; // optionally add admin ID
    next();
  } catch (err) {
    console.error("❌ Admin token verify failed:", err.message);
    res.status(401).json({ message: "Invalid or expired admin token" });
  }
};

// Optional general token verification middleware
export const verifyUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("❌ Token verify failed:", err.message);
    res.status(401).json({ message: "Token invalid" });
  }
};
