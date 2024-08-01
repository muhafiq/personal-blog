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
    const posts = await prismaClient.post.findMany({
      select: { draft: true },
    });

    console.log(req.session.user);

    res.render("pages/dashboard/index", {
      layout: "layouts/dashboard",
      title: "Dashboard",
      postCount: posts.length,
      postDraft: posts.filter((p) => p.draft).length,
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
    res.render("pages/dashboard/compose", {
      layout: "layouts/dashboard",
      title: "Compose",
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
    res.render("pages/dashboard/editPost", { layout: "layouts/dashboard" });
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
    const posts = await prismaClient.post.findMany({
      orderBy: { createdAt: "desc" },
    });

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
    res.render("pages/dashboard/media", {
      layout: "layouts/dashboard",
      title: "Media & Files",
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
