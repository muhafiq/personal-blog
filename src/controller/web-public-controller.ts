import { Request, Response, NextFunction } from "express";
import prismaClient from "../config/database";
import asyncHandler from "../error/async-handler";
import bcrypt from "bcrypt";
import ResponseError from "../error/response-error";
import { Post } from "@prisma/client";

/**
 * Controller for rendering the index page with the latest blog posts.
 */

export const getIndexPage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
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
  async (req: Request, res: Response, next: NextFunction) => {
    res.render("pages/about", { title: "About - Muhafiq's Blog" });
  }
);

/**
 * Controller for rendering the blog page with all articles.
 */

export const getBlogPage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { category } = req.query;

    let posts: Array<Post> = [];

    const categoryString = typeof category === "string" ? category : undefined;

    if (category) {
      posts =
        (await prismaClient.post.findMany({
          where: {
            category: {
              name: categoryString,
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

    res.render("pages/blog", { posts, title: "All Article - Muhafiq's Blog" });
  }
);

/**
 * Controller for rendering a single post page with an article.
 */

export const getSinglePost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const post: Post | boolean =
      (await prismaClient.post.findUnique({
        where: { slug: req.params.slug },
      })) || false;

    if (!post) throw new ResponseError("web", 404, "Page not found!");

    if (post.draft && !req.session.user)
      throw new ResponseError("web", 401, "Unathorized Resource!");

    res.render("pages/singlePost", { post, layout: "layouts/post" });
  }
);

/**
 * Controller for rendering the login page.
 */

export const getLoginPage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.render("pages/login", { layout: false });
  }
);

/**
 * Controller for handle process login.
 */

export const processLogin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const storedEmail: string | undefined = process.env.USER_EMAIL;
    const storedPassword: string | undefined = process.env.USER_PASSWORD;

    if (!storedPassword || !storedEmail) {
      throw new Error(
        "Environment variables for user credentials are not set."
      );
    }

    const match = await bcrypt.compare(password, storedPassword);

    if (email !== storedEmail || !match) {
      req.flash("error", "Wrong credentials, go away!");
      return res.redirect("/login");
    }

    req.session.user = email;

    req.flash("success", "Welcome. Have a nice day!");
    res.redirect("/dashboard");
  }
);
