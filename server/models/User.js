import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String },                           // Optional
  email: { type: String, required: true, unique: true }, // Required + Unique
  password: { type: String, required: true },       // Required (not yet hashed)
});

const User = mongoose.model('User', userSchema);    // Create model
export default User;                                // Export it
