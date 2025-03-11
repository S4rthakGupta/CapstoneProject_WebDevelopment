import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function CreateAdDialog({ onAdCreated }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("Electronics"); // Default category
  const [error, setError] = useState(""); // Error state
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async () => {
    setError(""); // Reset errors

    // 🛑 Validation: Ensure all fields are filled
    if (!name || !description || !price || !image || !category) {
      setError("🚨 All fields are required.");
      return;
    }

    // 🛑 Validation: Ensure price is a valid number
    if (isNaN(price) || price <= 0) {
      setError("🚨 Price must be a positive number.");
      return;
    }

    setLoading(true); // Show loading state

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, price, image, category }),
      });

      const result = await res.json();

      if (res.ok) {
        alert("✅ Ad posted successfully!");
        setName("");
        setDescription("");
        setPrice("");
        setImage("");
        setCategory("Electronics"); // Reset fields
        onAdCreated();
      } else {
        setError(`🚨 Error: ${result.error || "Something went wrong"}`);
      }
    } catch (err) {
      setError("🚨 Failed to connect to server. Please try again.");
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  return (
    <div className="p-6 border rounded shadow-md bg-white">
      <h2 className="text-xl font-bold mb-4">Create an Ad</h2>

      {/* 🔴 Show error message if validation fails */}
      {error && <p className="text-red-600 mb-3">{error}</p>}

      <input
        type="text"
        placeholder="Product Name"
        className="border p-2 w-full mb-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="Description (Max 200 characters)"
        className="border p-2 w-full mb-2"
        maxLength={200}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price (in USD)"
        className="border p-2 w-full mb-2"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="text"
        placeholder="Image URL (Must be a valid link)"
        className="border p-2 w-full mb-2"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      {/* Category Selection */}
      <select
        className="border p-2 w-full mb-4"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="Electronics">Electronics</option>
        <option value="Cars">Cars</option>
        <option value="Furniture">Furniture</option>
        <option value="Books">Books</option>
      </select>

      {/* Post Ad Button (Disabled While Loading) */}
      <Button onClick={handleSubmit} className="bg-blue-600 text-white w-full" disabled={loading}>
        {loading ? "Posting..." : "Post Ad"}
      </Button>
    </div>
  );
}
