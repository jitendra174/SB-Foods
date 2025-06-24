import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const SECRET = 'secretkey123'; 


export const protectUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "User not authorized, token missing" });
  }

  try {
    const decoded = jwt.verify(token, SECRET);


    if (decoded.role === 'admin') {
      return res.status(403).json({ message: "Admins are not allowed to access user routes" });
    }

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = { id: user._id }; 
    next();
  } catch (err) {
    console.error('❌ User token error:', err.message);
    res.status(401).json({ message: "Invalid or expired user token" });
  }
};

export const protectAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Admin not authorized, token missing" });
  }

  try {
    const decoded = jwt.verify(token, SECRET); 

    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    req.admin = { role: 'admin' }; 
    next();
  } catch (err) {
    console.error('❌ Admin token error:', err.message);
    res.status(401).json({ message: "Invalid or expired admin token" });
  }
};
