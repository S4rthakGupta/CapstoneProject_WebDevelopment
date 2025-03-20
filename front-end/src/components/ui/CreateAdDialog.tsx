import { useState } from "react";
import { useUser } from "@clerk/nextjs";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreateAdDialog({ onAdCreated }: { onAdCreated: () => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [location, setLocation] = useState("");  // Ensure location is set
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

    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);

      try {
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadRes.ok) {
          throw new Error("Image upload failed.");
        }

        const uploadData = await uploadRes.json();
        uploadedImageUrl = uploadData.url;
      } catch (error) {
        alert(error.message);
        setIsLoading(false);
        return;
      }
    }

    const newAd = {
      title,
      description,
      price,
      image: uploadedImageUrl,
      category,
      condition,
      location,  // Include location in the ad object
      username: user.fullName,
    };

    try {
      const response = await fetch("/api/ads", {
        method: "POST",
        body: JSON.stringify(newAd),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to create ad.");
      }

      alert("Ad posted successfully!");
      onAdCreated();

      setTitle("");
      setDescription("");
      setPrice("");
      setImageFile(null);
      setCategory("");
      setCondition("");
      setLocation("");  // Reset location after form submission
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
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
        />
        <Textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          placeholder="Price ($)"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

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

        <Input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}  // Ensure location is captured
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
