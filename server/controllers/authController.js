import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const ADMIN_EMAIL = 'admin@sbfoods.com';
const ADMIN_PASSWORD = 'admin123';
const SECRET = process.env.JWT_SECRET; 


export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ role: 'admin' }, SECRET, { expiresIn: '3h' });

    return res.json({
      success: true,
      token,
      isAdmin: true,
      message: 'Admin login successful',
    });
  }

  return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
};


export const signupUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const existing = await User.findOne({ email  });
    if (existing) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Server error during signup' });
  }
};


export const loginUser = async (req, res) => {
  const { email, password } = req.body;


  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ role: 'admin' }, SECRET, { expiresIn: '3h' });

    return res.json({
      success: true,
      token,
      isAdmin: true,
      message: 'Admin login successful',
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: 'Incorrect password' });

    const token = jwt.sign({ userId: user._id }, SECRET, { expiresIn: '3h' });

    res.json({
      success: true,
      token,
      isAdmin: false,
      message: 'User login successful',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Login failed. Try again later.' });
  }
};


export const getMe = async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: 'Token missing' });

  try {
    const decoded = jwt.verify(token, SECRET);

  
    if (decoded.role === 'admin') {
      return res.json({
        isAdmin: true,
        user: {
          name: 'Admin',
          email: ADMIN_EMAIL,
        },
      });
    }

  
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
      isAdmin: false,
      user: {
        name: user.name || user.email,
        email: user.email,
      },
    });
  } catch (err) {
    console.error('❌ JWT verify error:', err.message);
    res.status(401).json({ message: 'Invalid token' });
  }
};
