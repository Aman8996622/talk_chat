"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const upload_1 = __importDefault(require("../core/upload"));
const upload_middleware_1 = require("../middleware/upload_middleware");
const auth_controller_1 = require("../controller/auth_controller");
const routes = (0, express_1.Router)();
exports.authRoutes = routes;
// Separate the function for better parsing by Babel
routes.post("/signUp", (0, upload_middleware_1.setUploadPath)("./public/images/user_profile"), upload_1.default.single("profile_image"), auth_controller_1.signUp
// async (req: Request, res: Response) => {
//   await signUp(req as any, res as any);
// }
);
// const handleLogin = async (request: Request, response: Response) => {
//   await login(request, response);
// };
routes.post("/login", auth_controller_1.login);
//# sourceMappingURL=auth.js.map