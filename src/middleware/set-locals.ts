import { Request, Response, NextFunction } from "express";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

const limit = (text: string, lim: number) => {
  return text.length > lim ? text.slice(0, lim) + "..." : text;
};

const takeFirstParagraph = (text: string) => {
  const regex = /<p\b[^>]*>(.*?)<\/p>/s;
  const match = text.match(regex);
  if (!match) return "<p>Tag p not found</p>";

  if (/<span\b[^>]*>/i.test(match[0])) {
    const regexSpan = /<span\b[^>]*>(.*?)<\/span>/is;
    const matchSpan = match[0].match(regexSpan);
    if (!matchSpan) return "<p>Tag span not found</p>";

    const spanContent = matchSpan[1];
    return `<p>${spanContent}</p>`;
  }

  return match[0];
};

export default (req: Request, res: Response, next: NextFunction) => {
  // pass function helper
  res.locals.formatDate = formatDate;
  res.locals.lim = limit;
  res.locals.takeFirstParagraph = takeFirstParagraph;

  // pass error and success message from req.flash
  res.locals.error = req.flash("error")[0];
  res.locals.success = req.flash("success")[0];

  next();
};
