import ResponseError from "../error/response-error.js";

/**
 * An error middleware that catch next function with arguments.
 *
 * @param {ResponseError | Error} error - An error occured in application
 * @param {import("express").Request} req - Express request object.
 * @param {import("express").Response} res - Express response object.
 * @param {import("express").NextFunction} next - Express next middleware function.
 */

export default (error, req, res, next) => {
  console.error(error);

  if (error instanceof ResponseError) {
    if (error.type === "api") {
      res.status(error.code).json({
        message: error.message,
        data: null,
      });
    } else if (error.type === "web") {
      res.status(error.code).send(error.message);
    } else {
      res.send("server error!");
    }
  } else {
    res.send(error);
  }
};
