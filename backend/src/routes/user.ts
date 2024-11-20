import { Request, Response, Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { userAuth } from "../middlewares/userAuth";
import { validateUserRegistration, validateUserLogin } from "../utils/zod";
import { z } from "zod";
import Course from "../models/Course";

const userRouter = Router();
userRouter.post(
  "/register",
  async (req: Request, res: Response): Promise<void> => {
    try {
      //zod validation
      const validateData = validateUserRegistration(req.body);
      const { firstName, lastName, userName, email, password } = validateData;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(400).json({ message: "User already exists" });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 8);
      const user = await User.create({
        firstName,
        lastName,
        userName,
        email,
        password: hashedPassword,
      });
      res.status(200).json({ message: "User created", user });
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: err.errors });
      } else {
        res.status(500).json({ message: "error creating user" });
      }
    }
  }
);
userRouter.post(
  "/login",
  async (req: Request, res: Response): Promise<void> => {
    try {
      // zod validation
      const result = validateUserLogin.safeParse(req.body);
      if (!result.success) {
        res.status(400).json({ message: result.error.errors });
        return;
      }
      const { email, password } = result.data;
      const getUser = await User.findOne({ email });
      if (!getUser) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }
      const isPassCorrect = await bcrypt.compare(password, getUser.password);
      if (!isPassCorrect) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }
      const token = jwt.sign(
        { id: getUser?._id },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "1d",
        }
      );
      res.status(200).json({ message: "user loggin successful", token });
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: err.errors });
      } else {
        res.status(500).json({ message: "error loggin in" });
      }
    }
  }
);

userRouter.get("/courses", async (req: Request, res: Response) => {
  try {
    const courses = await Course.find();
    if (!courses) {
      res.status(500).json({ message: "no courses available for you to view" });
      return;
    }
    res.status(200).json({ message: "Courses available for you", courses });
  } catch (err) {
    res.status(500).json({ message: "error getting the courses" });
  }
});
userRouter.get("/purchases", userAuth, (req: Request, res: Response) => {
  res.status(200).json({ message: "user profile", user: req.user });
});

export default userRouter;
