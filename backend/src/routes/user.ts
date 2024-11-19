import { Request, Response, Router } from "express";
const userRouter = Router();

userRouter.post("/login", (req: Request, res: Response) => {});
userRouter.post("/register", (req: Request, res: Response) => {});
userRouter.get("/purchases", (req: Request, res: Response) => {});

export default userRouter;
