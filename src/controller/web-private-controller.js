import prismaClient from "../config/database.js";
import asyncHandler from "../error/async-handler.js";
import ResponseError from "../error/response-error.js";

/**
 * Controller for rendering the dashboard page.
 */

export const getDashboardPage = asyncHandler(
  /**
   * @function
   * @param {import("express").Request} req - Express request object.
   * @param {import("express").Response} res - Express response object.
   * @param {import("express").NextFunction} next - Express next middleware function.
   */
  async (req, res, next) => {
    const postCount = await prismaClient.post.count();

    // const draftPosts = posts.filter((post) => post.draft);
    const draftPosts = await prismaClient.post.findMany({
      where: { draft: true },
    });

    res.render("pages/dashboard/index", {
      layout: "layouts/dashboard",
      title: "Dashboard",
      postCount,
      draftPosts,
    });
  }
);

/**
 * Controller for rendering the compose page.
 */

export const getComposePage = asyncHandler(
  /**
   * @function
   * @param {import("express").Request} req - Express request object.
   * @param {import("express").Response} res - Express response object.
   * @param {import("express").NextFunction} next - Express next middleware function.
   */
  async (req, res, next) => {
    const categories = (await prismaClient.category.findMany()) || [];

    res.render("pages/dashboard/compose", {
      layout: "layouts/dashboard",
      title: "Compose",
      categories,
    });
  }
);

/**
 * Controller for rendering the edit post page.
 */

export const getEditPostPage = asyncHandler(
  /**
   * @function
   * @param {import("express").Request} req - Express request object.
   * @param {import("express").Response} res - Express response object.
   * @param {import("express").NextFunction} next - Express next middleware function.
   */
  async (req, res, next) => {
    const { id: postId } = req.params;

    const post =
      (await prismaClient.post.findUnique({ where: { postId } })) || {};

    const categories = (await prismaClient.category.findMany()) || [];

    res.render("pages/dashboard/editPost", {
      layout: "layouts/dashboard",
      post,
      categories,
    });
  }
);

/**
 * Controller for rendering the manage page.
 */

export const getManagePage = asyncHandler(
  /**
   * @function
   * @param {import("express").Request} req - Express request object.
   * @param {import("express").Response} res - Express response object.
   * @param {import("express").NextFunction} next - Express next middleware function.
   */
  async (req, res, next) => {
    const posts =
      (await prismaClient.post.findMany({
        orderBy: { createdAt: "desc" },
        include: { category: true },
      })) || [];

    posts.sort((a, b) => b.draft - a.draft);

    res.render("pages/dashboard/manage", {
      layout: "layouts/dashboard",
      title: "Manage Posts",
      posts,
    });
  }
);

/**
 * Controller for rendering the profile page.
 */

export const getProfilePage = asyncHandler(
  /**
   * @function
   * @param {import("express").Request} req - Express request object.
   * @param {import("express").Response} res - Express response object.
   * @param {import("express").NextFunction} next - Express next middleware function.
   */
  async (req, res, next) => {
    res.render("pages/dashboard/profile", {
      layout: "layouts/dashboard",
      title: "Profile",
    });
  }
);

/**
 * Controller for rendering the emailer page.
 */

export const getEmailerPage = asyncHandler(
  /**
   * @function
   * @param {import("express").Request} req - Express request object.
   * @param {import("express").Response} res - Express response object.
   * @param {import("express").NextFunction} next - Express next middleware function.
   */
  async (req, res, next) => {
    res.render("pages/dashboard/emailer", {
      layout: "layouts/dashboard",
      title: "Emailer",
    });
  }
);

/**
 * Controller for rendering the media page.
 */

export const getMediaPage = asyncHandler(
  /**
   * @function
   * @param {import("express").Request} req - Express request object.
   * @param {import("express").Response} res - Express response object.
   * @param {import("express").NextFunction} next - Express next middleware function.
   */
  async (req, res, next) => {
    const thumbnails =
      (await prismaClient.post.findMany({
        select: { thumbnail: true, title: true, createdAt: true },
      })) || [];

    const images = (await prismaClient.postImage.findMany()) || [];

    res.render("pages/dashboard/media", {
      layout: "layouts/dashboard",
      title: "Media & Files",
      thumbnails,
      images,
    });
  }
);

/**
 * Controller for handle logout.
 */

export const processLogout = asyncHandler(
  /**
   * @function
   * @param {import("express").Request} req - Express request object.
   * @param {import("express").Response} res - Express response object.
   * @param {import("express").NextFunction} next - Express next middleware function.
   */
  async (req, res, next) => {
    req.session.destroy((err) => {
      if (err) {
        req.flash("error", "Failed to logout!");
        return res.redirect("back");
      }

      res.redirect("/login");
    });
  }
);

/**
 * Controller for handle create a new post.
 */

export const createPost = asyncHandler(
  /**
   * @function
   * @param {import("express").Request} req - Express request object.
   * @param {import("express").Response} res - Express response object.
   * @param {import("express").NextFunction} next - Express next middleware function.
   */
  async (req, res, next) => {
    const { title, category, content } = req.body;

    const draft = req.body.draft === "on" ? true : false;

    // create slug from title
    const slug = title.toLowerCase().split(" ").join("-");

    await prismaClient.post.create({
      data: {
        title,
        catId: category,
        draft,
        slug,
        thumbnail: req.file.path,
        content,
      },
    });

    req.flash("success", "New post created successfully!");
    res.redirect("/manage");
  }
);

/**
 * Controller for handle update post.
 */

export const updatePost = asyncHandler(
  /**
   * @function
   * @param {import("express").Request} req - Express request object.
   * @param {import("express").Response} res - Express response object.
   * @param {import("express").NextFunction} next - Express next middleware function.
   */
  async (req, res, next) => {
    const { id: postId } = req.params;

    if (!postId) {
      req.flash("error", "Failed to update post, not provide an id!");
      res.redirect(`/edit/${postId}`);
    }

    console.log(req.body);

    const { title, category, content, thumbnailUrl } = req.body;
    const draft = req.body.draft === "on" ? true : false;
    const slug = title.toLowerCase().split(" ").join("-");

    await prismaClient.post.update({
      where: { postId },
      data: {
        title,
        catId: category,
        draft,
        slug,
        thumbnail: req.file ? req.file.path : thumbnailUrl,
        content,
      },
    });

    req.flash("success", "Post updated successfully!");
    res.redirect(`/edit/${postId}`);
  }
);

/**
 * Controller for handle delete post.
 */

export const deletePost = asyncHandler(
  /**
   * @function
   * @param {import("express").Request} req - Express request object.
   * @param {import("express").Response} res - Express response object.
   * @param {import("express").NextFunction} next - Express next middleware function.
   */
  async (req, res, next) => {
    const { id: postId } = req.params;

    if (!postId) {
      req.flash("error", "Failed to delete post, not provide an id!");
      res.redirect("/manage");
    }

    await prismaClient.$transaction(async (prismaClient) => {
      await prismaClient.postImage.deleteMany({ where: { postId } });

      await prismaClient.post.delete({ where: { postId } });
    });

    req.flash("success", "Post deleted successfully!");
    res.redirect("/manage");
  }
);
