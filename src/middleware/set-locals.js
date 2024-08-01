/**
 *
 * @param {string} dateString - Format datetime from database.
 * @returns return string like 29 July 2024
 */

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

/**
 *
 * @param {string} text - A text want to limit.
 * @param {number} lim - Max length of character.
 * @returns return a text with limit.
 */

const limit = (text, lim) => {
  return text.length > lim ? text.slice(0, lim) + "..." : text;
};

/**
 * Function to take the first paragraph tag in content blog.
 *
 * @param {string} text - a blog content with html tag.
 * @returns the first paragraph [<p>...</p>]
 */

const takeFirstParagraph = (text) => {
  const regex = /<p>(.*?)<\/p>/s;
  const match = text.match(regex);
  if (!match) return "<p>Tag p not found</p>";

  return match[0];
};

/**
 * @function
 * @param {import("express").Request} req - Express request object.
 * @param {import("express").Response} res - Express response object.
 * @param {import("express").NextFunction} next - Express next middleware function.
 */

export default (req, res, next) => {
  // pass function helper
  res.locals.formatDate = formatDate;
  res.locals.lim = limit;
  res.locals.takeFirstParagraph = takeFirstParagraph;

  // pass error and success message from req.flash
  res.locals.error = req.flash("error")[0];
  res.locals.success = req.flash("success")[0];

  next();
};
