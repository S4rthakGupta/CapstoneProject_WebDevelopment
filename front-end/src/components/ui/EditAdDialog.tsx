"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

interface EditAdDialogProps {
  isOpen: boolean;
  onClose: () => void;
  ad: any;
  onAdUpdated?: () => void;
}

export default function EditAdDialog({
  isOpen,
  onClose,
  ad,
  onAdUpdated,
}: EditAdDialogProps) {
  const { user } = useUser();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [location, setLocation] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (ad) {
      setTitle(ad.title || "");
      setDescription(ad.description || "");
      setPrice(ad.price || "");
      setCategory(ad.category || "");
      setCondition(ad.condition || "");
      setLocation(ad.location || "");
      setImagePreview(ad.image || null);
    }
  }, [ad]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!user || !ad?._id) {
      alert("User not logged in or invalid ad.");
      return;
    }

    setIsLoading(true);
    let uploadedImageUrl = imagePreview || "";

    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);

      try {
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadRes.ok) throw new Error("Image upload failed.");
        const uploadData = await uploadRes.json();
        uploadedImageUrl = uploadData.url;
      } catch (err) {
        alert("Failed to upload image");
        setIsLoading(false);
        return;
      }
    }

    try {
      const response = await fetch("/api/ads", {
        method: "POST",
        body: JSON.stringify({
          _id: ad._id,
          title,
          description,
          price,
          image: uploadedImageUrl,
          category,
          condition,
          location,
          username: user.fullName,
          userId: user.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to update ad.");
      }

      alert("Ad updated successfully!");
      onAdUpdated?.();
      onClose();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 max-w-lg w-full mx-auto p-6 rounded-lg h-auto max-h-[90vh] overflow-y-auto sm:px-6 px-4">
        <DialogHeader>
          <DialogTitle className="text-gray-800 dark:text-gray-200 text-lg md:text-xl font-bold">
            Edit Listing
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Product Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 w-full"
          />
          <Textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 w-full"
          />
          <Input
            placeholder="Price ($)"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 w-full"
          />

          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg">
              <SelectItem value="Electronics">Electronics</SelectItem>
              <SelectItem value="Clothing">Clothing</SelectItem>
              <SelectItem value="Furniture">Furniture</SelectItem>
              <SelectItem value="Books">Books</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>

          <Select value={condition} onValueChange={setCondition}>
            <SelectTrigger className="w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400">
              <SelectValue placeholder="Select Condition" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg">
              <SelectItem value="New">New</SelectItem>
              <SelectItem value="Used - Like New">Used - Like New</SelectItem>
              <SelectItem value="Used - Good">Used - Good</SelectItem>
              <SelectItem value="Used - Fair">Used - Fair</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 w-full"
          />

          <div>
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              disabled={isLoading}
              className="mt-2 text-gray-800 dark:text-gray-200 w-full"
            />
            {imagePreview && (
              <div className="mt-4 w-32 h-32 relative mx-auto md:mx-0">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  fill
                  className="object-cover rounded-md border border-gray-300 dark:border-gray-600"
                />
              </div>
            )}
          </div>

          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-[#18206F] text-white hover:bg-[#15205a] dark:bg-[#18206F] dark:hover:bg-[#15205a] w-full mt-4"
          >
            {isLoading ? "Updating..." : "Update Listing"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
