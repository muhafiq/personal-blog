import { Request, Response, NextFunction } from "express";
import ResponseError from "./response-error";

/**
 * A wrapper to handle asynchronous errors in Express middleware.
 */

export default (func: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next).catch((err: Error | ResponseError) => next(err));
  };
};
