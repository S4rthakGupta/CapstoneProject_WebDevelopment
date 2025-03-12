import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  category: { type: String, required: true },  // Add category
  condition: { type: String, required: true }, // Add condition
  location: { type: String, required: true },  // Add location
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
