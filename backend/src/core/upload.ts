import multer, { StorageEngine } from "multer";
import fs from "fs";
import path from "path";
import { Request, Response, NextFunction } from "express";

// Extend the Request interface to include the custom property
interface MulterRequest extends Request {
  uploadPath?: string; // Make uploadPath optional
}

// Define the storage engine
const storage: StorageEngine = multer.diskStorage({

  destination: (req: Request, file: Express.Multer.File, callback) => {
    const destPath = (req as MulterRequest).uploadPath;
    
    if (!destPath) {
      return callback(new Error("Upload path not set"), "");
    }
    // Create the directory if it doesn't exist
    if (!fs.existsSync(destPath)) {
      fs.mkdirSync(destPath, { recursive: true });
    }

    callback(null, destPath);
  },
  filename: (req: Request, file: Express.Multer.File, callback) => {
    const extension = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, extension);
    const timestamp = Date.now();

    // Only allow certain extensions for the filename
    const allowedExtensions = [".png", ".jpeg", ".jpg"];
    const finalFileName = allowedExtensions.includes(extension.toLowerCase())
      ? `${baseName}-${timestamp}${extension}`
      : `${baseName}-${timestamp}`;

    callback(null, finalFileName);
  },
});

// Initialize multer with the defined storage engine
const upload = multer({ storage });

// Middleware to set uploadPath dynamically based on request
export const setUploadPath = (uploadPath: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    (req as MulterRequest).uploadPath = uploadPath;
    next();
  };
};

export default upload;
