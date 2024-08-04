import { Router } from "express";
import { upload } from "../config/multer-cloudinary.js";
import isAuthenticated from "../middleware/is-authenticated.js";
import {
  uploadBlogImages,
  addNewCategory,
} from "../controller/api-controller.js";

const router = Router();

router.post(
  "/upload",
  [isAuthenticated, upload.single("images")],
  uploadBlogImages
);

router.post("/category", isAuthenticated, addNewCategory);

export default router;
