import { PrismaClient } from "@prisma/client";

/**
 * Instance of PrismaClient that represent the model of this app.
 */

const prismaClient: PrismaClient = new PrismaClient();

export default prismaClient;
