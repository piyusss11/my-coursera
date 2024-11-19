import { Request, Response, Router } from "express";
const adminRouter = Router();
adminRouter.post("/login", (req: Request, res: Response) => {});
adminRouter.post("/register", (req: Request, res: Response) => {});
adminRouter.post("/course", (req: Request, res: Response) => {});
adminRouter.put("/course", (req: Request, res: Response) => {});
adminRouter.delete("/course", (req: Request, res: Response) => {});

export default adminRouter;
