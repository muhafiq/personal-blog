/**
 * Imported node modules.
 */
import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import compression from "compression";
import helmet from "helmet";
import morgan from "morgan";
import flash from "connect-flash";
import session from "./config/session.js";
import methodOverride from "method-override";

/**
 * Custom modules.
 */
import apiRouter from "./routes/api.js";
import webRouter from "./routes/web.js";
import ResponseError from "./error/response-error.js";
import errorMiddleware from "./middleware/error-middleware.js";

/**
 * Initialize express application.
 */
const app = express();

/**
 * Set view engine and layout.
 */
app.set("view engine", "ejs");
app.set("layout", "layouts/default");

/**
 * Express middleware.
 */
app.use(compression());
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", "*"],
      scriptSrc: ["'self'", "*"],
      imgSrc: ["'self'", "data:", "https:", "*"],
    },
  })
);
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json({ limit: "10mb" }));
app.use(express.static("public"));
app.use(expressEjsLayouts);
app.use(morgan("common"));
app.use(flash());
app.use(methodOverride("_method"));

/**
 * Session
 */

app.use(session);

/**
 * Register routes here.
 */
app.use(webRouter);
app.use("/api/v1", apiRouter);

/**
 * Catch 404 not found.
 */
app.all("*", (req, res, next) => {
  next(new ResponseError("web", 404, "Nothing here!"));
});

/**
 * Catch all error with error middleware.
 */
app.use(errorMiddleware);

export default app;
