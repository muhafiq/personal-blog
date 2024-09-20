import { Request } from "express";

export interface MulterRequest extends Request {
  file: Express.Multer.File; // Add the file type from multer
}
