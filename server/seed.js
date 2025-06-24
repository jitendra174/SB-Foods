import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import Restaurant from './models/restaurantModel.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error('❌ DB Connection Error:', err.message);
    process.exit(1);
  }
};

const seedRestaurants = async () => {
  try {
    const filePath = path.resolve('./restaurant_data.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const restaurants = JSON.parse(jsonData);

    await Restaurant.deleteMany(); 
    await Restaurant.insertMany(restaurants); 

    console.log('✅ Database seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

const run = async () => {
  await connectDB();
  await seedRestaurants();
};

run();
