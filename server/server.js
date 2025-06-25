import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import restaurantRoutes from './routes/restaurantRoutes.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors()); 

app.get('/', (req, res) => {
  res.send('🟢 SB Foods API is running...');
});

app.use('/api/restaurants', restaurantRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/orders', orderRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'API route not found' });
});

mongoose.set("strictQuery", false);
mongoose
  .connect(MONGO_URI, {})
  .then(() => {
    console.log('✅ Connected to MongoDB successfully');
    app.listen(PORT, () => {
      console.log(`🚀 Server running at: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });
