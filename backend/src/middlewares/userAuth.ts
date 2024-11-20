import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User";

export async function userAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
  const token = req.headers.token as string;

  try {
    if (!token) {
      res.status(401).json({ message: "Unauthorized as user" });
      return; 
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    // console.log(decoded)
    
    const { id } = decoded;

    const user = await User.findById(id);
    if (!user) {
      res.status(401).json({ message: "Invalid user, please log in again" });
      return; 
    }

    req.user = user;
    next(); 
  } catch (err) {
    res.status(401).json({ message: "Error authenticating the user" });
  }
}
