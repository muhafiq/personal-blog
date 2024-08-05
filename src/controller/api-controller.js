import asyncHandler from "../error/async-handler.js";
import prismaClient from "../config/database.js";
import ResponseError from "../error/response-error.js";

/**
 * Controller to handle upload image in blog content.
 *
 * In one compose request, this api will be hit
 * as many times as the number of images in the content
 */

export const uploadBlogImages = asyncHandler(
  /**
   * @function
   * @param {import("express").Request} req - Express request object.
   * @param {import("express").Response} res - Express response object.
   * @param {import("express").NextFunction} next - Express next middleware function.
   */
  async (req, res, next) => {
    res.status(201).json({
      message: "Success upload image!",
      file: req.file.path,
    });
  }
);

/**
 * Controller to handle add new category.
 */

export const addNewCategory = asyncHandler(
  /**
   * @function
   * @param {import("express").Request} req - Express request object.
   * @param {import("express").Response} res - Express response object.
   * @param {import("express").NextFunction} next - Express next middleware function.
   */
  async (req, res, next) => {
    const { category } = req.body;

    if (!category)
      throw new ResponseError("api", 400, "Category name required!");

    const newCategory = await prismaClient.category.create({
      data: { name: category },
    });

    res.status(201).json({
      message: "Success add new category.",
      data: newCategory,
    });
  }
);
