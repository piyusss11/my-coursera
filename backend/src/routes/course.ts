import { Request, Response, Router } from "express";
import { userAuth } from "../middlewares/userAuth";
import Purchase from "../models/Purchase";

const courseRouter = Router();
// purchase course by user
courseRouter.post(
  "/purchase/:id",
  userAuth,
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const { id: courseId } = req.params;
    try {
      const alreadyBought = await Purchase.find({
        courseId,
        userId,
      });
      if (alreadyBought) {
        res
          .status(500)
          .json({ message: "You already have bought this course" });
        return;
      }
      const myCourse = await Purchase.create({
        courseId,
        userId,
      });
      if (!myCourse) {
        res.status(500).json({ message: "Cant make your purchase try again" });
        return;
      }
      res.status(200).json({ message: "purchase succesfully" });
    } catch (err) {
      res.status(500).json({ message: "error purchasing the course" });
    }
  }
);
// get all the courses by the user
courseRouter.get(
  "/boughtCourses",
  userAuth,
  async (req: Request, res: Response) => {
    const userId = req.user?._id;
    try {
      const myCourses = await Purchase.find({
        userId: userId,
      });
      if (!myCourses) {
        res.status(500).json({ message: "you have not bought any course" });
      }
      res
        .status(200)
        .json({ message: "here are your purchased courses", myCourses });
    } catch (err) {
      res.status(500).json({ message: "error getting your bought courses" });
    }
  }
);

export default courseRouter;
