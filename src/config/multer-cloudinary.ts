import multer, { Multer } from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage: CloudinaryStorage = new CloudinaryStorage({
  cloudinary,
});

export const upload: Multer = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 10, // Maximum file size in bytes (10MB)
  },
});
