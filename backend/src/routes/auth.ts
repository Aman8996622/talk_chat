import { Router, Request, Response } from "express";
import verifyToken from "../utils/verify_token";
import upload from "../core/upload";
import { setUploadPath } from "../middleware/upload_middleware";
// import signUp from "../controller/auth_controller";
import { Request as ExpressRequest } from "express-serve-static-core";
import { login, signUp } from "../controller/auth_controller";

const routes = Router();

routes.post(
  "/signUp",
  setUploadPath("./public/images/user_profile"),
  upload.single("profile_image"),
  async (req: ExpressRequest, res: Response) => {
    await signUp(req as any, res as any);

  }
);



routes.post("/login", async (resquest: ExpressRequest, response: Response) => {
  await login(resquest, response);
});

export { routes as authRoutes };
