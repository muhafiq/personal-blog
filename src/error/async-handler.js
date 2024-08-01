/**
 * A wrapper to handle asynchronous errors in Express middleware.
 *
 * @param {function} func - The asynchronous Express middleware to be wrapped.
 * @returns {function} Express middleware with asynchronous error handling.
 */

export default (func) => {
  /**
   * Universal placeholder function to handle asynchronous errors in Express controllers.
   *
   * @function
   * @param {import("express").Request} req - Express request object.
   * @param {import("express").Response} res - Express response object.
   * @param {import("express").NextFunction} next - Express next middleware function.
   */
  return (req, res, next) => {
    func(req, res, next).catch((err) => next(err));
  };
};
