import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },  // 'name' field should be the title
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  category: { type: String, required: true },
  condition: { type: String, required: true },
  location: { type: String, required: true },  // Ensure location is included
});


export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
