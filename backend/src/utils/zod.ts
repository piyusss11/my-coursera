import { z } from "zod";
import { IUser } from "../models/User";
const registerSchema = z.object({
  firstName: z
    .string()
    .min(4, "First name must be at least 4 characters long")
    .max(50, "First name must be at most 50 characters long"),
  lastName: z.string().max(50, "First name must be at most 50 characters long"),
  userName: z
    .string()
    .min(4, "User name must be at least 4 characters long")
    .max(50, "User name must be at most 50 characters long"),
  email: z.string().email("invalid Email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const validateUserRegistration = (userData: IUser) => {
  return registerSchema.parse(userData);
};

export const validateUserLogin = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});
