import { Request, Response, Router } from "express";
import { validateUserLogin, validateUserRegistration } from "../utils/zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin";
import { z } from "zod";
import { adminAuth } from "../middlewares/adminAuth";
import Course from "../models/Course";
const adminRouter = Router();
adminRouter.post("/register", async (req: Request, res: Response) => {
  try {
    //zod validation
    const validateData = validateUserRegistration(req.body);
    const { firstName, lastName, userName, email, password } = validateData;
    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const user = await Admin.create({
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
});
adminRouter.post("/login", async (req: Request, res: Response) => {
  try {
    // zod validation
    const result = validateUserLogin.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ message: result.error.errors });
      return;
    }
    const { email, password } = result.data;
    const getUser = await Admin.findOne({ email });
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
      process.env.JWT_ADMIN_SECRET as string,
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
});
// create course
adminRouter.post(
  "/createCourse",
  adminAuth,
  async (req: Request, res: Response) => {
    const adminId = req.user?._id;
    const { title, description, price, imageUrl } = req.body;
    try {
      const course = await Course.create({
        title,
        description,
        price,
        imageUrl,
        creatorId: adminId,
      });

      if (!course) {
        res.status(500).json({ message: "unable to create course" });
        return;
      }
      res.status(200).json({ message: "course created succesfully", course });
    } catch (err) {
      res.status(500).json({ message: "error creating the course" });
    }
  }
);
// edit course
adminRouter.put("/editCourse", (req: Request, res: Response) => {});
//delete course
adminRouter.delete(
  "/deleteCourse/:id",
  adminAuth,
  async (req: Request, res: Response) => {
    const adminId = req.user?._id;
    const { id: courseId } = req.params;
    try {
      const deletedCourse = await Course.findOneAndDelete({
        _id: courseId,
        creatorId: adminId,
      });
      if (!deletedCourse) {
        res
          .status(500)
          .json({ message: "Course not found or unauthorized to delete" });
        return;
      }
      res
        .status(200)
        .json({
          message: "Course deleted successfully",
          course: deletedCourse,
        });
    } catch (err) {
      res.status(500).json({ message: "error finding the course to delete" });
    }
  }
);

export default adminRouter;
