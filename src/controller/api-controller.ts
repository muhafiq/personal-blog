import asyncHandler from "../error/async-handler";
import prismaClient from "../config/database";
import ResponseError from "../error/response-error";
import { Request, Response, NextFunction } from "express";
import { MulterRequest } from "../types";

/**
 * Controller to handle upload image in blog content.
 *
 * In one compose request, this api will be hit
 * as many times as the number of images in the content
 */

export const uploadBlogImages = asyncHandler(
  async (req: MulterRequest, res: Response, next: NextFunction) => {
    await prismaClient.postImage.create({
      data: {
        fileName: req.file.path,
        postId: req.body.postId,
      },
    });

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
  async (req: Request, res: Response, next: NextFunction) => {
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
