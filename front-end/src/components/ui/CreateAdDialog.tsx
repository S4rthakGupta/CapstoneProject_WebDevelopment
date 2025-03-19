"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";

export default function CreateAdDialog({
  onAdCreated,
}: {
  onAdCreated: () => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useUser();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImageFile(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      alert("Please login to post an ad!");
      return;
    }

    setIsLoading(true);
    let uploadedImageUrl = "";

    // Step 1: Upload image if available
    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        alert("Image upload failed.");
        setIsLoading(false);
        return;
      }

      const uploadData = await uploadRes.json();
      uploadedImageUrl = uploadData.url;
    }

    const newAd = { name, description, price, image: uploadedImageUrl, category, condition, location };
    // Step 2: Post the ad to MongoDB
    const newAd = {
      title, // corrected name to title
      description,
      price,
      image: uploadedImageUrl,
      username: user.fullName,
    };

    const response = await fetch("/api/ads", {
      method: "POST",
      body: JSON.stringify(newAd),
      headers: { "Content-Type": "application/json" },
    });

    setIsLoading(false);

    if (response.ok) {
      alert("Ad posted successfully!");
      onAdCreated(); // Refresh or re-fetch ads
      // Reset form
      setTitle("");
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

        <Input
          placeholder="Product Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isLoading}
        />
        <Textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isLoading}
        />
        <Input
          placeholder="Price ($)"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          disabled={isLoading}
        />
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          disabled={isLoading}
          className="mt-2"
        />

        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className="bg-green-600 text-white"
        >
          {isLoading ? "Posting..." : "Post Ad"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}