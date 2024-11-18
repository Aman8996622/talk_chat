import jwt from "jsonwebtoken";

import { Request, Response, NextFunction } from "express";

export default function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (req.headers.hasOwnProperty("authorization")) {
    let token: string = req.headers.authorization?.split(" ")[1] ?? "";
    //  console.log(token);
    const isCheck = jwt.verify(token, "shhh");
    if (isCheck) {
      next();
    }
  } else {
    res.send({
      message: "invalid token",
    });
  }
}

