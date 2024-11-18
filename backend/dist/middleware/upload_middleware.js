"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUploadPath = void 0;
const setUploadPath = (uploadPath) => {
    return (req, res, next) => {
        req.uploadPath = uploadPath;
        next();
    };
};
exports.setUploadPath = setUploadPath;
//# sourceMappingURL=upload_middleware.js.map