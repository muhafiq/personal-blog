import ResponseError from "../error/response-error.js";

/**
 * An error middleware that catch next function with arguments.
 */

export default (error, req, res, next) => {
  console.error(error);

  if (error instanceof ResponseError) {
    if (error.type === "api") {
      res.send("api error!");
    } else if (error.type === "web") {
      res.status(error.code).send(error.message);
    } else {
      res.send("server error!");
    }
  } else {
    res.send(error);
  }
};
