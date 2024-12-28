"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUploadPath = void 0;
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Define the storage engine
const storage = multer_1.default.diskStorage({
    destination: (req, file, callback) => {
        const destPath = req.uploadPath;
        if (!destPath) {
            return callback(new Error("Upload path not set"), "");
        }
        // Create the directory if it doesn't exist
        if (!fs_1.default.existsSync(destPath)) {
            fs_1.default.mkdirSync(destPath, { recursive: true });
        }
        callback(null, destPath);
    },
    filename: (req, file, callback) => {
        const extension = path_1.default.extname(file.originalname);
        const baseName = path_1.default.basename(file.originalname, extension);
        const timestamp = Date.now();
        // Only allow certain extensions for the filename
        const allowedExtensions = [".png", ".jpeg", ".jpg"];
        const finalFileName = allowedExtensions.includes(extension.toLowerCase())
            ? `${baseName}-${timestamp}${extension}`
            : `${baseName}-${timestamp}`;
        console.log("uploading the image name");
        callback(null, finalFileName);
    },
});
// Initialize multer with the defined storage engine
const upload = (0, multer_1.default)({ storage });
// Middleware to set uploadPath dynamically based on request
const setUploadPath = (uploadPath) => {
    return (req, res, next) => {
        req.uploadPath = uploadPath;
        next();
    };
};
exports.setUploadPath = setUploadPath;
exports.default = upload;
//# sourceMappingURL=upload.js.map