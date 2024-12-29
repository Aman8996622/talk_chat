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
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
      email: string;
      phone: string;
    };

    (req as any).user = {
      id: decoded.id, // Add user id from the token
      email: decoded.email,
      phone: decoded.phone,
    };

    next();
  } else {
    res.send({
      message: "invalid token",
    });
  }
}
