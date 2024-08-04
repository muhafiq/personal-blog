import prismaClient from "../config/database.js";
import asyncHandler from "../error/async-handler.js";
import bcrypt from "bcrypt";
import ResponseError from "../error/response-error.js";

/**
 * Controller for rendering the index page with the latest blog posts.
 */

export const getIndexPage = asyncHandler(
  /**
   * @function
   * @param {import("express").Request} req - Express request object.
   * @param {import("express").Response} res - Express response object.
   * @param {import("express").NextFunction} next - Express next middleware function.
   */
  async (req, res, next) => {
    const posts =
      (await prismaClient.post.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: { title: true, content: true, slug: true, thumbnail: true },
        where: { draft: false },
      })) || [];

    res.render("pages/index", { posts });
  }
);

/**
 * Controller for rendering the about page.
 */

export const getAboutPage = asyncHandler(
  /**
   * @function
   * @param {import("express").Request} req - Express request object.
   * @param {import("express").Response} res - Express response object.
   * @param {import("express").NextFunction} next - Express next middleware function.
   */
  async (req, res, next) => {
    res.render("pages/about");
  }
);

/**
 * Controller for rendering the blog page with all articles.
 */

export const getBlogPage = asyncHandler(
  /**
   * @function
   * @param {import("express").Request} req - Express request object.
   * @param {import("express").Response} res - Express response object.
   * @param {import("express").NextFunction} next - Express next middleware function.
   */
  async (req, res, next) => {
    const { category } = req.query;

    let posts = [];

    if (category) {
      posts =
        (await prismaClient.post.findMany({
          where: {
            category: {
              name: category,
            },
            draft: false,
          },
          take: 30,
          orderBy: { createdAt: "desc" },
          include: { category: true },
        })) || [];
    } else {
      posts =
        (await prismaClient.post.findMany({
          take: 30,
          orderBy: { createdAt: "desc" },
          where: { draft: false },
          include: { category: true },
        })) || [];
    }

    res.render("pages/blog", { posts });
  }
);

/**
 * Controller for rendering a single post page with an article.
 */

export const getSinglePost = asyncHandler(
  /**
   * @function
   * @param {import("express").Request} req - Express request object.
   * @param {import("express").Response} res - Express response object.
   * @param {import("express").NextFunction} next - Express next middleware function.
   */
  async (req, res, next) => {
    const post =
      (await prismaClient.post.findUnique({
        where: { slug: req.params.slug },
        include: {
          postImages: true,
        },
      })) || {};

    res.render("pages/singlePost", { post, layout: "layouts/post" });
  }
);

/**
 * Controller for rendering the login page.
 */

export const getLoginPage = asyncHandler(
  /**
   * @function
   * @param {import("express").Request} req - Express request object.
   * @param {import("express").Response} res - Express response object.
   * @param {import("express").NextFunction} next - Express next middleware function.
   */
  async (req, res, next) => {
    res.render("pages/login", { layout: false });
  }
);

/**
 * Controller for handle process login.
 */

export const processLogin = asyncHandler(
  /**
   * @function
   * @param {import("express").Request} req - Express request object.
   * @param {import("express").Response} res - Express response object.
   * @param {import("express").NextFunction} next - Express next middleware function.
   */
  async (req, res, next) => {
    const { email, password } = req.body;

    const match = await bcrypt.compare(password, process.env.USER_PASSWORD);

    if (email !== process.env.USER_EMAIL || !match) {
      req.flash("error", "Wrong credentials, go away!");
      return res.redirect("/login");
    }

    req.session.user = email;

    req.flash("success", "Welcome. Have a nice day!");
    res.redirect("/dashboard");
  }
);
