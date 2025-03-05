import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream({}, (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          reject(NextResponse.json({ error: "Upload failed" }, { status: 500 }));
        } else {
          resolve(NextResponse.json({ url: result?.secure_url }, { status: 200 }));
        }
      });

      uploadStream.end(buffer);
    });
  } catch (err) {
    console.error("Unexpected Upload Error:", err);
    return NextResponse.json({ error: "Unexpected error occurred" }, { status: 500 });
  }
}
