import { Router, Request, Response, NextFunction } from "express";
import verifyToken from "../utils/verify_token";
import upload from "../core/upload";
import { setUploadPath } from "../middleware/upload_middleware";
import { login, signUp } from "../controller/auth_controller";

const routes = Router();

// Separate the function for better parsing by Babel

routes.post(
  "/signUp",
  setUploadPath("./public/images/user_profile"),

  upload.single("profile_image"),

  signUp
);

// const handleLogin = async (request: Request, response: Response) => {
//   await login(request, response);
// };

routes.post("/login", login);

export { routes as authRoutes };
