import { Router } from "express";
import { upload } from "../config/multer-cloudinary";
import isAuthenticated from "../middleware/is-authenticated";
import { uploadBlogImages, addNewCategory } from "../controller/api-controller";

const router = Router();

router.post("/upload", upload.single("images"), uploadBlogImages);

router.post("/category", isAuthenticated, addNewCategory);

export default router;
