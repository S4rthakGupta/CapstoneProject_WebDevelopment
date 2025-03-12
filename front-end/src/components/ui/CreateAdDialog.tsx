"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


export default function CreateAdDialog({ onAdCreated }: { onAdCreated: () => void }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [location, setLocation] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImageFile(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    let uploadedImageUrl = imageUrl;

    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        alert("Image upload failed.");
        return;
      }

      const uploadData = await uploadRes.json();
      uploadedImageUrl = uploadData.url;
    }

    const newAd = { name, description, price, image: uploadedImageUrl, category, condition, location };

    const response = await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify(newAd),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      onAdCreated();
      setName("");
      setDescription("");
      setPrice("");
      setImageFile(null);
      setImageUrl("");
      setCategory("");
      setCondition("");
      setLocation("");
    } else {
      alert("Failed to create ad.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 text-white">Create an Ad</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Listing</DialogTitle>
        </DialogHeader>
        <Input placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <Input placeholder="Price ($)" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Electronics">Electronics</SelectItem>
            <SelectItem value="Clothing">Clothing</SelectItem>
            <SelectItem value="Furniture">Furniture</SelectItem>
            <SelectItem value="Books">Books</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>

        <Select value={condition} onValueChange={setCondition}>
          <SelectTrigger>
            <SelectValue placeholder="Select Condition" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="New">New</SelectItem>
            <SelectItem value="Used - Like New">Used - Like New</SelectItem>
            <SelectItem value="Used - Good">Used - Good</SelectItem>
            <SelectItem value="Used - Fair">Used - Fair</SelectItem>
          </SelectContent>
        </Select>

        <Input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />

        <input type="file" onChange={handleFileChange} accept="image/*" />

        <Button onClick={handleSubmit} className="bg-green-600 text-white">Post Ad</Button>
      </DialogContent>
    </Dialog>
  );
}