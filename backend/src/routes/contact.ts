import { Router, Request, Response } from "express";
import verifyToken from "../utils/verify_token";
import { getContactsList } from "../controller/contact_controller";

import { Request as ExpressRequest } from "express-serve-static-core";

const routes = Router();

routes.post(
  "/getContactList",
  verifyToken,
  
  async (req: ExpressRequest ,res: Response) => {
    await getContactsList(req as any, res as any);
  }
);

export { routes as contactRoutes };
