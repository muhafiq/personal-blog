import { Request, Response, NextFunction } from "express";

/**
 * Middleware to handle user is authenticated or not.
 */

export default (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user) {
    if (req.path === "/login") {
      return res.redirect("/dashboard");
    }
    return next();
  } else {
    if (req.path !== "/login" && req.path !== "/logout") {
      return res.redirect("/login");
    }
    return next();
  }
};
