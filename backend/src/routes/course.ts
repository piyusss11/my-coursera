import { Request, Response, Router } from "express";

const courseRouter = Router();
// purchase course by user
courseRouter.post("/purchase", (req: Request, res: Response) => {});
// get all the courses by the user
courseRouter.get("/courses", (req: Request, res: Response) => {});

export default courseRouter;
