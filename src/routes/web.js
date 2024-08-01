import { Router } from "express";
import setLocals from "../middleware/set-locals.js";
import {
  getAboutPage,
  getBlogPage,
  getIndexPage,
  getSinglePost,
  getLoginPage,
  processLogin,
} from "../controller/web-public-controller.js";
import {
  getComposePage,
  getDashboardPage,
  getEditPostPage,
  getManagePage,
  getProfilePage,
  getEmailerPage,
  getMediaPage,
  processLogout,
} from "../controller/web-private-controller.js";
import { upload } from "../config/multer-cloudinary.js";
import isAuthenticated from "../middleware/is-authenticated.js";

/**
 * Express router to handle web routes.
 *
 * @type {Router}
 */

const router = Router();

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
  (req, res) => {
    console.log(req.body);
    console.log(req.file);

    res.redirect("/manage");
  }
);
router.patch("/edit/:id", isAuthenticated);
router.delete("/delete/:id", isAuthenticated);

export default router;
