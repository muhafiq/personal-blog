import { PrismaClient } from "@prisma/client";

/**
 * Instance of PrismaClient that represent the model of this app.
 */

const prismaClient = new PrismaClient();

export default prismaClient;
