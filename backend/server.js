import express from "express";
import dotenv from "dotenv";
import { router as authRouter } from "./src/routes/authRoutes.js";
import taskRouter from "./src/routes/taskRoutes.js";
import cors from "cors";
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: "https://3c5w7y-3001.csb.app",
    credentials: true,
  })
);

app.use(express.json());
app.use("/auth", authRouter);
app.use("/", taskRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
