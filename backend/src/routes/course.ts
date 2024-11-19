import { Request, Response, Router } from "express";

const courseRouter = Router();
courseRouter.post("/purchase", (req: Request, res: Response) => {});
courseRouter.get("/courses", (req: Request, res: Response) => {});

export default courseRouter;
