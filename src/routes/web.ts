import { Router } from "express";
import setLocals from "../middleware/set-locals";
import {
  getAboutPage,
  getBlogPage,
  getIndexPage,
  getSinglePost,
  getLoginPage,
  processLogin,
} from "../controller/web-public-controller";
import {
  getComposePage,
  getDashboardPage,
  getEditPostPage,
  getManagePage,
  getProfilePage,
  getEmailerPage,
  getMediaPage,
  processLogout,
  deletePost,
  createPost,
  updatePost,
} from "../controller/web-private-controller";
import { upload } from "../config/multer-cloudinary";
import isAuthenticated from "../middleware/is-authenticated";

/**
 * Express router to handle web routes.
 */

const router: Router = Router();

router.use(setLocals);

/**
 * Login and logout routes.
 */
router.get("/login", isAuthenticated, getLoginPage);
router.post("/login", processLogin);

router.post("/logout", isAuthenticated, processLogout);

/**
 * Public routes.
 */

router.get("/", getIndexPage);
router.get("/about", getAboutPage);
router.get("/blog", getBlogPage);

/**
 * Private routes.
 */

router.get("/dashboard", isAuthenticated, getDashboardPage);
router.get("/compose", isAuthenticated, getComposePage);
router.get("/edit/:id", isAuthenticated, getEditPostPage);
router.get("/manage", isAuthenticated, getManagePage);
router.get("/profile", isAuthenticated, getProfilePage);
router.get("/emailer", isAuthenticated, getEmailerPage);
router.get("/media", isAuthenticated, getMediaPage);

/**
 * View single post or article, place bottom to prevent catch all routes.
 */
router.get("/:slug", getSinglePost);

/**
 * All routes except GET method.
 */

router.post(
  "/compose",
  [isAuthenticated, upload.single("thumbnail")],
  createPost
);
router.patch(
  "/edit/:id",
  isAuthenticated,
  upload.single("thumbnail"),
  updatePost
);
router.delete("/delete/:id", isAuthenticated, deletePost);

/**
 * Route media and file
 */
// router.delete("/media/delete/:postId", isAuthenticated, deletePostImage)

export default router;
