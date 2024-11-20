import { IUser } from "../models/User"; // Adjust the path to your User model

declare global {
  namespace Express {
    interface Request {
      user?: IUser; // Replace IUser with the actual type of your User model
    }
  }
}