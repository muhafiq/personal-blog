import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "static",
    allowedFormats: ["jpeg", "png", "jpg"],
  },
});

/**
 * Middleware to handle upload file to cloudinary.
 * @type {CloudinaryStorage}
 */

export const upload = multer({ storage, limits: 1024 * 1024 * 10 });
