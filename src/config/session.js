import session from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import prismaClient from "./database.js";

/**
 * Session store with prisma.
 * @type {PrismaSessionStore}
 */

const sessionStore = new PrismaSessionStore(prismaClient, {
  checkPeriod: 5 * 60 * 1000,
  dbRecordIdIsSessionId: true,
  dbRecordIdFunction: undefined,
});

/**
 * Session to store user authentication.
 */

const authSession = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 5,
  },
});

export default authSession;
