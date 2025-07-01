import mongoose from 'mongoose';

const foodItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, default: 'General' },
});

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  location: { type: String, required: true },
  category: { type: String, default: 'Mixed' },
  menu: [foodItemSchema],
}, { timestamps: true });

export default mongoose.model('Restaurant', restaurantSchema);
