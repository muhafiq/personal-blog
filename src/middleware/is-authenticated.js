/**
 * Middleware to handle user is authenticated or not.
 *
 * @function
 * @param {import("express").Request} req - Express request object.
 * @param {import("express").Response} res - Express response object.
 * @param {import("express").NextFunction} next - Express next middleware function.
 */

export default (req, res, next) => {
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
