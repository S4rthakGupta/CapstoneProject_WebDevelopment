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
