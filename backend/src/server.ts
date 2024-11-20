import express, { Request, Response } from "express";
import { dbConnection } from "./config/db";
import userRouter from "./routes/user";
import adminRouter from "./routes/admin";
import courseRouter from "./routes/course";
import dotenv from "dotenv"

dotenv.config()


const app = express();


const port = process.env.PORT
app.use(express.json())
app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);


dbConnection()
.then(() => {
    app.listen(port, () => {
      console.log(`The backend is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
