import ResponseError from "../error/response-error";
import { Request, Response, NextFunction } from "express";

/**
 * An error middleware that catch next function with arguments.
 */

export default (
  error: Error | ResponseError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ResponseError) {
    if (error.type === "api") {
      res.status(error.code).json({
        message: error.message,
        data: null,
      });
    } else if (error.type === "web") {
      res.status(error.code).render("pages/error", {
        message: error.message,
        code: error.code,
        layout: false,
      });
    } else {
      res.send("Internal Server Error!");
    }
  } else {
    // res.send(error);
    res.send("Internal Server Error!");
  }
};
