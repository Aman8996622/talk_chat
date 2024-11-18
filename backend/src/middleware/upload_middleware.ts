import { NextFunction, Request, Response } from "express";
import upload from "../core/upload";

export const setUploadPath = (uploadPath: string) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        (req as any).uploadPath = uploadPath;
        next();
    };
};