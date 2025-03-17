import mongoose, { Schema, model, models } from 'mongoose';

const AdSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  userId: { type: String, required: true },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Ad = models.Ad || model('Ad', AdSchema);
