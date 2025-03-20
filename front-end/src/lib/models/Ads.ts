import mongoose from 'mongoose';

const AdSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  category: { type: String, required: true }, // Ensure category is included
  condition: { type: String, required: true }, // Ensure condition is included
  location: { type: String, required: true },  // Ensure location is included
  userId: { type: String, required: true },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Ad = mongoose.models.Ad || mongoose.model('Ad', AdSchema);
