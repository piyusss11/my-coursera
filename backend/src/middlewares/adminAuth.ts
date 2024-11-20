import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import Admin from "../models/Admin";

export async function adminAuth(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.token as string;
  try {
    if (!token) {
      res.status(401).json({ message: "Unauthorized as admin" });
      return;
    }
    const decoded = jwt.verify(
      token,
      process.env.JWT_ADMIN_SECRET as string
    ) as JwtPayload;
    const { id } = decoded;
    const admin = await Admin.findById(id);
    if (!admin) {
      res.status(401).json({ message: "Invalid admin, please log in again" });
      return;
    }
    req.user = admin;
    next()
  } catch (err) {
    res.status(401).json({ message: "Error authenticating the admin" });
  }
}
